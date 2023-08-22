// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import "./App.css";

import * as microsoftTeams from "@microsoft/teams-js";

import React from "react";

/**
 * This component is used to display tab configuration.
 */
class Config extends React.Component {
  componentDidMount() {
    // Initialize the Microsoft Teams SDK
    microsoftTeams.app.initialize();

    // Notify app initialization completion.
    microsoftTeams.app.notifySuccess();

    // No configuration supported, so set validity state to true.
    microsoftTeams.pages.config.setValidityState(true);

    // Save settings..
    microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
      microsoftTeams.pages.config.setConfig({
        websiteUrl: `${process.env.REACT_APP_BASE_URL}`,
        contentUrl: `${process.env.REACT_APP_BASE_URL}/SharedDashboard`,
        entityId: "",
        suggestedDisplayName: "Shared dashboard",
      });
      saveEvent.notifySuccess();
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Configuration</h1>
      </div>
    );
  }
}

export default Config;
