import * as microsoftTeams from "@microsoft/teams-js";

import React from 'react';

const Configuration = () => {
    const [tabId, setTabId] = React.useState('');

    React.useEffect(() => {
        //microsoftTeams.app.initialize();

        //microsoftTeams.app.getContext().then(async (context: microsoftTeams.app.Context) => {
        //    setTabId(context.page.id)
        //});

        //microsoftTeams.pages.config.registerOnSaveHandler(async (saveEvent: microsoftTeams.pages.config.SaveEvent) => {
        //    microsoftTeams.pages.config.setConfig({
        //        entityId: tabId,
        //        contentUrl: `${window.location.origin}/details`,
        //        suggestedDisplayName: 'Recruiting',
        //    });
        //    saveEvent.notifySuccess();
        //});
        //microsoftTeams.pages.config.setValidityState(true);

        microsoftTeams.app.initialize().then(() => {
            microsoftTeams.app.getContext().then((context: any) => {
                setTabId(context.page.id)
            })

            microsoftTeams.pages.config.registerOnSaveHandler(function (saveEvent) {
                microsoftTeams.pages.config.setConfig({
                    entityId: tabId,
                    suggestedDisplayName: "Recruiting",
                    contentUrl: `${window.location.origin}/details`,
                });
                saveEvent.notifySuccess();
            });
            microsoftTeams.pages.config.setValidityState(true);
        });

    }, []);

    return (
        <div className="config-container">
            Please click on Save to configure this tab
        </div>
    )
}

export default (Configuration);