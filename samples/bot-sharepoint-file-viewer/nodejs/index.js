// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// index.js is used to setup and configure your bot

// Import required packages
const path = require('path');
const express = require('express');
const cors = require('cors');
const { SimpleGraphClient } = require('./simpleGraphClient');

// Read botFilePath and botFileSecret from .env file.
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });
const PORT = process.env.PORT || 3978;
const server = express();
let multer = require('multer');
let upload = multer({ storage: multer.memoryStorage() });

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'ejs');
server.set('views', __dirname);

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const { BotFrameworkAdapter, ConversationState, MemoryStorage, UserState,TeamsSSOTokenExchangeMiddleware  } = require('botbuilder');
const { TeamsBot } = require('./bots/teamsBot');
const { MainDialog } = require('./dialogs/mainDialog');

const { tokenData } = require('./dialogs/mainDialog');

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

adapter.onTurnError = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights. See https://aka.ms/bottelemetry for telemetry 
    //       configuration instructions.
    console.error(`\n [onTurnError] unhandled error: ${error}`);

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${error}`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Uncomment below commented line for local debugging.
    // await context.sendActivity(`Sorry, it looks like something went wrong. Exception Caught: ${error}`);
    
    // Clear out state
    await conversationState.delete(context);
};

// Define the state store for your bot.
// See https://aka.ms/about-bot-state to learn more about using MemoryStorage.
// A bot requires a state storage system to persist the dialog and user state between messages.
const memoryStorage = new MemoryStorage();

const tokenExchangeMiddleware = new TeamsSSOTokenExchangeMiddleware(memoryStorage, process.env.connectionName);
adapter.use(tokenExchangeMiddleware);

// Create conversation and user state with in-memory storage provider.
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// Create the main dialog.
const dialog = new MainDialog();
// Create the bot that will handle incoming messages.
const bot = new TeamsBot(conversationState, userState, dialog);

// Create HTTP server.
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Endpoint to fetch upload page for uploading files.
server.get('/Upload', (req, res, next) => {
    res.render('./views/Upload')
});

// Endpoint to listen to multiport/form-data requests.
server.post('/Save', upload.single('file'), async(req, res) => {
    if(req.file == null) {
        return;
    }

    var token = tokenData["token"];
    var buffer = req.file.buffer;
    const client = new SimpleGraphClient(token);
    const site = await client.getSiteDetails(process.env.SharePointTenantName, process.env.SharePointSiteName);

    if (site != null) {
        var drive = await client.getDriveDetails(site.id);

        if (drive != null) {
            if (buffer != null) {
                var children = await client.uploadFile(site.id, drive.value[0].id, buffer, req.file.originalname);
            }
            res.send();
        }
    }
});

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});