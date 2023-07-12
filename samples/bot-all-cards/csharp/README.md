---
page_type: sample
description: Sample which demonstrates sending different types cards supported in teams using bot.
products:
- office-teams
- office
- office-teams
languages:
- csharp
extensions:
 contentType: samples
 createdDate: "21/10/2022 07:54:21 PM"
urlFragment: officedev-microsoft-teams-samples-bot-all-cards-csharp

---

# Types of Cards

This sample shows the feature where user can send different types of cards using bot.

## Included Features
* Bots
* Adaptive Cards
* Hero Cards
* List Cards
* O365 Connector Cards
* List Cards
* Thumbnail Cards
* Collections Cards

## Interaction with app

![all-cards-sample ](BotAllCards/Images/allBotCardsGif.gif)

## Try it yourself - experience the App in your Microsoft Teams client
Please find below demo manifest which is deployed on Microsoft Azure and you can try it yourself by uploading the app package (.zip file link below) to your teams and/or as a personal app. (Sideloading must be enabled for your tenant, [see steps here](https://docs.microsoft.com/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading)).

**Different types of cards:** [Manifest](/samples/bot-all-cards/csharp/demo-manifest/bot-all-cards.zip)

## Prerequisites

- Microsoft Teams is installed and you have an account (not a guest account).

- [.NET Core SDK](https://dotnet.microsoft.com/download) version 6.0

  ```bash
  # determine dotnet version
  dotnet --version
  ```
- Publicly addressable https url or tunnel such as [ngrok](https://ngrok.com/) or [Tunnel Relay](https://github.com/OfficeDev/microsoft-teams-tunnelrelay)

## Setup

 - Register a new application in the [Azure Active Directory – App Registrations](https://go.microsoft.com/fwlink/?linkid=2083908) portal.

    1) Select **New Registration** and on the *register an application page*, set following values:
        * Set **name** to your app name.
        * Choose the **supported account types** (any account type will work)
        * Leave **Redirect URI** empty.
        * Choose **Register**.
    2) On the overview page, copy and save the **Application (client) ID, Directory (tenant) ID**. You’ll need those later when updating your Teams application manifest and in the appsettings.json.
    3) Navigate to **Authentication**
        If an app hasn't been granted IT admin consent, users will have to provide consent the first time they use an app.
        
        - Set another redirect URI:
        * Select **Add a platform**.
        * Select **web**.
        * Enter the **redirect URI** for the app in the following format: 
          1) https://token.botframework.com/.auth/web/redirect

    ![Authentication](BotAllCards/Images/Authentication.png)
        
    4) Navigate to the **Certificates & secrets**. In the Client secrets section, click on "+ New client secret". Add a description      (Name of the secret) for the secret and select “Never” for Expires. Click "Add". Once the client secret is created, copy its value, it need to be placed in the appsettings.json.

2. Setup for Bot
- In Azure portal, create a [Azure Bot resource](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&tabs=csharp%2Caadv2).
- Ensure that you've [enabled the Teams Channel](https://docs.microsoft.com/en-us/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0)
- While registering the bot, use `https://<your_ngrok_url>/api/messages` as the messaging endpoint.

3. Setup NGROK 
1) Run ngrok - point to port 3978

    ```bash
    # ngrok http 3978 --host-header="localhost:3978"
    ```
4. Setup for code 
- Clone the repository

    ```bash
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```
  Run the bot from a terminal or from Visual Studio:

  A) From a terminal, navigate to `samples/bot-all-cards/csharp/BotAllCards`

  ```bash
  # run the bot
  dotnet run
  ```

  B) Or from Visual Studio

  - Launch Visual Studio
  - File -> Open -> Project/Solution
  - Navigate to `samples/bot-all-cards/csharp/BotAllCards` folder
  - Select `BotAllCards.csproj` file
  - Press `F5` to run the project   

- **This step is specific to Teams.**

1) Modify the `manifest.json` in the `/Manifest` folder and replace the following details:
  - `{{Microsoft-App-Id}}` with Application id generated from Step 1
  - `{{domain-name}}` with base Url domain. E.g. if you are using ngrok it would be `1234.ngrok-free.app`

2) Zip the contents of `Manifest` folder into a `manifest.zip`.

3) Modify the `/appsettings.json` and fill in the following details:
  - `{{Microsoft-App-Id}}` - Generated from Step 1 is the application app id
  - `{{ Microsoft-App-Password}}` - Generated from Step 1, also referred to as Client secret
  - `{{ Microsoft-App-TenantId }}` - Generated from Step 1 is the tenantId id
  - `{{ ConnectionName }}` - ConnectionName (OAuth Connection Name) 

  **Bot OAuth Connection:**

  ![Installapp](BotAllCards/Images/OauthConnection.png)

**Note:**
-   If you are facing any issue in your app,  [please uncomment this line](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/7336b195da6ea77299d220612817943551065adb/samples/bot-all-cards/csharp/BotAllCards/AdapterWithErrorHandler.cs#L27) and put your debugger for local debug.

5) Upload the manifest.zip to Teams (in the Apps view click "Upload a custom app")
   - Go to Microsoft Teams. From the lower left corner, select Apps
   - From the lower left corner, choose Upload a custom App
   - Go to your project directory, the ./Manifest folder, select the zip folder, and choose Open.
   - Select Add in the pop-up dialog box. Your app is uploaded to Teams.

## Running the sample

**Install App:**

![Installapp](BotAllCards/Images/Installapp.png)

**Welcome Cards:**

![WelcomeCards](BotAllCards/Images/WelcomeCards.png)

**All Cards:**

![AllCards](BotAllCards/Images/AllCards.png)

**Adaptive Card:**

![AdaptiveCard](BotAllCards/Images/AdaptiveCard.png)

Add media url from sharepoint or onedrive to the text input to get media loaded to the adaptive card. For more information refer [media elements in card.](https://review.learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/media-elements-in-adaptive-cards?branch=pr-en-us-8333&tabs=desktop) 

![AdaptiveCardMedia](BotAllCards/Images/AdaptiveCardMedia.png)

![AdaptiveCardMedia2](BotAllCards/Images/AdaptiveCardMedia2.png)

**Hero Card:**

![HeroCard](BotAllCards/Images/HeroCard.png)

**OAuth Card:**

![OAuthCard](BotAllCards/Images/OAuthCard.png)

**Signin Card:**

![SigninCard](BotAllCards/Images/SigninCard.png)

**Thumbnail Card:**

![ThumbnailCard](BotAllCards/Images/ThumbnailCard.png)

**List Card:**

![ListCards](BotAllCards/Images/ListCards.png)

**Collections Card:**

![CollectionsCards](BotAllCards/Images/CollectionsCards.png)

**Connector Card:**

![ConnectorCards](BotAllCards/Images/ConnectorCards.png)

## Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

## Further reading

- [Types of cards](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#receipt-card)
- [Create bot connection](https://learn.microsoft.com/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&tabs=userassigned%2Caadv2%2Ccsharp)

<img src="https://pnptelemetry.azurewebsites.net/microsoft-teams-samples/samples/bot-all-cards-csharp" />