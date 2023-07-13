// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//

import * as constants from "./constants";
import * as microsoftTeams from "@microsoft/teams-js";

import { appRoot, cardTemplates } from "./dialogs/CardTemplates";

import { taskModuleLink } from "./utils/DeepLinks";

declare var appId: any; // Injected at template render time

// Helper function for generating an adaptive card attachment
function acAttachment(ac: any): any {
    return {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: ac,
    };
}

// Set the desired theme
function setTheme(theme: string): void {
    if (theme) {
        // Possible values for theme: 'default', 'light', 'dark' and 'contrast'
        document.body.className = "theme-" + (theme === "default" ? "light" : theme);
    }
}

// Create the URL that Microsoft Teams will load in the tab. You can compose any URL even with query strings.
function createTabUrl(): string {
    let tabChoice = document.getElementById("tabChoice");
    let selectedTab = tabChoice[(tabChoice as HTMLSelectElement).selectedIndex].value;

    return window.location.protocol + "//" + window.location.host + "/" + selectedTab;
}

// Call the initialize API first
microsoftTeams.app.initialize().then(() => {

    // Check the initial theme user chose and respect it
    microsoftTeams.app.getContext().then((context) => {
        console.log(context);
        if (context && context.app.theme) {
            setTheme(context.app.theme);
        }
    });

    // Save configuration changes
    microsoftTeams.pages.config.registerOnSaveHandler(function (saveEvent: microsoftTeams.settings.SaveEvent): void {
        // Let the Microsoft Teams platform know what you want to load based on
        // what the user configured on this page
        microsoftTeams.pages.config.setConfig({
            contentUrl: createTabUrl(), // Mandatory parameter
            entityId: createTabUrl(), // Mandatory parameter
        });

        // Tells Microsoft Teams platform that we are done saving our settings. Microsoft Teams waits
        // for the app to call this API before it dismisses the dialog. If the wait times out, you will
        // see an error indicating that the configuration settings could not be saved.
        saveEvent.notifySuccess();
    });
});

// Handle theme changes
microsoftTeams.app.registerOnThemeChangeHandler(function (theme: string): void {
    setTheme(theme);
});

// Logic to let the user configure what they want to see in the tab being loaded
document.addEventListener("DOMContentLoaded", function (): void {
    // This module runs on multiple pages, so we need to isolate page-specific logic.

    // If we are on the tab configuration page, wire up the save button initialization state
    let tabChoice = document.getElementById("tabChoice");
    if (tabChoice) {
        tabChoice.onchange = function (): void {
            let selectedTab = this[(this as HTMLSelectElement).selectedIndex].value;

            // This API tells Microsoft Teams to enable the 'Save' button. Since Microsoft Teams always assumes
            // an initial invalid state, without this call the 'Save' button will never be enabled.
            microsoftTeams.pages.config.setValidityState(selectedTab === "first" || selectedTab === "second" || selectedTab === "taskmodule");
        };
    }

    // If we are on the Task Module page, initialize the buttons and deep links
    let taskModuleButtons = document.getElementsByClassName("taskModuleButton");
    if (taskModuleButtons.length > 0) {
        // Initialize deep links
        let taskInfo = {
            size: {
                height: null,
                width: null,
            },
            title: null,
            url: null,
            fallbackUrl: null,
            card: null,
            completionBotId: null,
        };
        let deepLink = document.getElementById("dlYouTube") as HTMLAnchorElement;
        deepLink.href = taskModuleLink(appId, constants.TaskModuleStrings.YouTubeTitle, constants.TaskModuleSizes.youtube.height, constants.TaskModuleSizes.youtube.width, `${appRoot()}/${constants.TaskModuleIds.YouTube}`, null, `${appRoot()}/${constants.TaskModuleIds.YouTube}`);
        deepLink = document.getElementById("dlPowerApps") as HTMLAnchorElement;
        deepLink.href = taskModuleLink(appId, constants.TaskModuleStrings.PowerAppTitle, constants.TaskModuleSizes.powerapp.height, constants.TaskModuleSizes.powerapp.width, `${appRoot()}/${constants.TaskModuleIds.PowerApp}`, null, `${appRoot()}/${constants.TaskModuleIds.PowerApp}`);
        deepLink = document.getElementById("dlCustomForm") as HTMLAnchorElement;
        deepLink.href = taskModuleLink(appId, constants.TaskModuleStrings.CustomFormTitle, constants.TaskModuleSizes.customform.height, constants.TaskModuleSizes.customform.width, `${appRoot()}/${constants.TaskModuleIds.CustomForm}`, null, `${appRoot()}/${constants.TaskModuleIds.CustomForm}`);
        deepLink = document.getElementById("dlAdaptiveCard1") as HTMLAnchorElement;
        deepLink.href = taskModuleLink(appId, constants.TaskModuleStrings.AdaptiveCardTitle, constants.TaskModuleSizes.adaptivecard.height, constants.TaskModuleSizes.adaptivecard.width, null, cardTemplates.adaptiveCard);
        deepLink = document.getElementById("dlAdaptiveCard2") as HTMLAnchorElement;
        deepLink.href = taskModuleLink(appId, constants.TaskModuleStrings.AdaptiveCardTitle, constants.TaskModuleSizes.adaptivecard.height, constants.TaskModuleSizes.adaptivecard.width, null, cardTemplates.adaptiveCard, null, appId);

        for (let btn of taskModuleButtons) {
            btn.addEventListener("click",
                function (): void {
                    // Hide customFormResults, adaptiveResults
                    document.getElementById("customFormResults").style.display = "none";
                    document.getElementById("adaptiveResults").style.display = "none";
                    taskInfo.url = `${appRoot()}/${this.id.toLowerCase()}?theme={theme}`;
                    // Define default submitHandler()
                    let submitHandler = (res: any): void => { console.log(`Err: ${res.err}; Result:  + ${res.result}`); };
                    switch (this.id.toLowerCase()) {
                        case constants.TaskModuleIds.YouTube:
                            taskInfo.title = constants.TaskModuleStrings.YouTubeTitle;
                            taskInfo.size.height = constants.TaskModuleSizes.youtube.height;
                            taskInfo.size.width = constants.TaskModuleSizes.youtube.width;
                            microsoftTeams.dialog.url.open(taskInfo, submitHandler);
                            break;
                        case constants.TaskModuleIds.PowerApp:
                            taskInfo.title = constants.TaskModuleStrings.PowerAppTitle;
                            taskInfo.size.height = constants.TaskModuleSizes.powerapp.height;
                            taskInfo.size.width = constants.TaskModuleSizes.powerapp.width;
                            microsoftTeams.dialog.url.open(taskInfo, submitHandler);
                            break;
                        case constants.TaskModuleIds.CustomForm:
                            taskInfo.title = constants.TaskModuleStrings.CustomFormTitle;
                            taskInfo.size.height = constants.TaskModuleSizes.customform.height;
                            taskInfo.size.width = constants.TaskModuleSizes.customform.width;
                            submitHandler = (res: any): void => {
                                // Unhide and populate customFormResults
                                let resultsElement = document.getElementById("customFormResults");
                                resultsElement.style.display = "block";
                                if (res.err) {
                                    resultsElement.innerHTML = `Error/Cancel: ${res.err}`;
                                }
                                if (res.result) {
                                    resultsElement.innerHTML = `Result: Name: "${res.result.name}"; Email: "${res.result.email}"; Favorite book: "${res.result.favoriteBook}"`;
                                }
                            };
                            microsoftTeams.dialog.url.open(taskInfo, submitHandler);
                            break;
                        case constants.TaskModuleIds.AdaptiveCard1:
                            taskInfo.title = constants.TaskModuleStrings.AdaptiveCardTitle;
                            taskInfo.url = null;
                            taskInfo.size.height = constants.TaskModuleSizes.adaptivecard.height;
                            taskInfo.size.width = constants.TaskModuleSizes.adaptivecard.width;
                            taskInfo.card = JSON.stringify(cardTemplates.adaptiveCard);
                            submitHandler = (res: any): void => {
                                // Unhide and populate adaptiveResults
                                let resultsElement = document.getElementById("adaptiveResults");
                                resultsElement.style.display = "block";
                                if (res.err) {
                                    resultsElement.innerHTML = `Error/Cancel: ${res.err}`;
                                }
                                if (res.result) {
                                    resultsElement.innerHTML = `Result: ${JSON.stringify(res.result)}`;
                                }
                            };

                            microsoftTeams.dialog.adaptiveCard.open(taskInfo.card, submitHandler);
                            break;
                        case constants.TaskModuleIds.AdaptiveCard2:
                            taskInfo.title = constants.TaskModuleStrings.AdaptiveCardTitle;
                            taskInfo.url = null;
                            taskInfo.size.height = constants.TaskModuleSizes.adaptivecard.height;
                            taskInfo.size.width = constants.TaskModuleSizes.adaptivecard.width;
                            taskInfo.card = JSON.stringify(cardTemplates.adaptiveCard);
                            // Send the Adaptive Card as filled in by the user to the bot in this app
                            taskInfo.completionBotId = appId;
                            microsoftTeams.dialog.adaptiveCard.bot.open(taskInfo.completionBotId);
                            break;
                        default:
                            console.log("Unexpected button ID: " + this.id.toLowerCase());
                            return;
                    }
                    console.log("URL: " + taskInfo.url);
                });
        }
    }
});
