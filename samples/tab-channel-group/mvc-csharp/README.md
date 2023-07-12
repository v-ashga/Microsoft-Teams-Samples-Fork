---
page_type: sample
description: Sample app showing custom group and channel Tab with ASP. NET Core
products:
- office-teams
- office
- office-365
languages:
- csharp
extensions:
 contentType: samples
 createdDate: "07/07/2021 01:38:27 PM"
urlFragment: officedev-microsoft-teams-samples-tab-channel-group-mvc-csharp
---

# Channel and group tabs in ASP.NET Core with MVC

In this quickstart we'll walk-through creating a custom channel/group tab with ASP.Net Core and MVC. We'll also use App Studio for Microsoft Teams to finalize your app manifest and deploy your tab to Teams.

## Prerequisites

- [.NET Core SDK](https://dotnet.microsoft.com/download) version 6.0

  determine dotnet version
  ```bash
  dotnet --version
  ```
- [Ngrok](https://ngrok.com/download) (For local environment testing) Latest (any other tunneling software can also be used)
  
- [Teams](https://teams.microsoft.com) Microsoft Teams is installed and you have an account

## Included Features
* Tabs

## Interaction with app

![configureteams](Images/ChannelGroupTabModule.gif)

## Try it yourself - experience the App in your Microsoft Teams client
Please find below demo manifest which is deployed on Microsoft Azure and you can try it yourself by uploading the app package (.zip file link below) to your teams and/or as a personal app. (Sideloading must be enabled for your tenant, [see steps here](https://docs.microsoft.com/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading)).

**Channel and group tabs in ASP.NET Core with MVC:** [Manifest](/samples/tab-channel-group/mvc-csharp/demo-manifest/tab-channel-group.zip)

## Setup

1. Run ngrok - point to port 3978
   ```ngrok http 3978 --host-header="localhost:3978"```

2. Clone the repository
   ```bash
   git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
   ```

3. If you are using Visual Studio
 - Launch Visual Studio
 - File -> Open -> Project/Solution
 - Navigate to ```samples\tab-channel-group\mvc-csharp``` folder
 - Select ```ChannelGroupTabMVC.sln``` file and open the solution

4. Modify the `manifest.json` in the `/AppManifest` folder and replace the following details:
   - `<<Guid>>` with any random GUID.
   - `<<Base-url>>` with base Url domain. E.g. if you are using ngrok it would be `https://1234.ngrok-free.app` then your domain-name will be `1234.ngrok-free.app`.
   - `validDomains` with base Url domain. E.g. if you are using ngrok it would be `https://1234.ngrok-free.app` then your domain-name will be `1234.ngrok-free.app`.

5. Upload the manifest.zip to Teams (in the Apps view click "Upload a custom app")
   - Go to Microsoft Teams. From the lower left corner, select Apps
   - From the lower left corner, choose Upload a custom App
   - Go to your project directory, the ./AppManifest folder, select the zip folder, and choose Open.


## Running the sample

![configureteams](Images/configureteams.png)

![setuptab](Images/setuptab.png)

![Greyconfigure](Images/Greyconfigure.png)

![GreyTab](Images/GreyTab.png)

![Redconfigure](Images/Redconfigure.png)

![RedTab](Images/RedTab.png)

## Further Reading

[Tab-channel-group](https://learn.microsoft.coms/microsoftteams/platform/tabs/what-are-tabs)
[Create a Custom Channel and Group Tab with ASP.NET Core and MVC](https://docs.microsoft.com/microsoftteams/platform/tabs/how-to/create-channel-group-tab?pivots=mvc-csharp)

<img src="https://pnptelemetry.azurewebsites.net/microsoft-teams-samples/samples/tab-channel-group-mvc-csharp" />