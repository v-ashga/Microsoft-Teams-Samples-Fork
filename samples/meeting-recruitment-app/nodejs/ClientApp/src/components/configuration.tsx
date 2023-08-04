import * as microsoftTeams from "@microsoft/teams-js";

import React from 'react';

const Configuration = () => {
    const [tabId, setTabId] = React.useState('');

    React.useEffect(() => {
        microsoftTeams.app.initialize();

        microsoftTeams.app.getContext().then((context: microsoftTeams.app.Context) => {
            setTabId(context.page.id)
        });

        microsoftTeams.pages.config.registerOnSaveHandler(async (saveEvent: microsoftTeams.pages.config.SaveEvent) => {
            microsoftTeams.pages.config.setConfig({
                entityId: tabId,
                contentUrl: `${window.location.origin}/details`,
                suggestedDisplayName: 'Recruiting',
            });
            saveEvent.notifySuccess();
        });
        microsoftTeams.pages.config.setValidityState(true);
    }, [tabId]);

    return (
        <div className="config-container">
            Please click on save to configure this tab
        </div>
    )
}

export default (Configuration);