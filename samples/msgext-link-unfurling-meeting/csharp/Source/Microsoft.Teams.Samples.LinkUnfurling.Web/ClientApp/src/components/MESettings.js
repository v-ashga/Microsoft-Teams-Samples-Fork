﻿// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import "./App.css";

import * as microsoftTeams from "@microsoft/teams-js";

import React from "react";

/**
 * Message extension settings.
 */
class MESettings extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.onSignout = this.onSignout.bind(this);
  }

  componentDidMount() {
    // Initialize the Microsoft Teams SDK
    microsoftTeams.app.initialize();

    // Notify app initialization completion.
    microsoftTeams.app.notifySuccess();
  }

  onSignout() {
    microsoftTeams.authentication.notifySuccess("signout");
  }

  render() {
    return (
      <div>
        <h1>"Link Unfurling Sample"</h1>
        <button type="button" onClick={this.onSignout}>
          "Sign out"
        </button>
      </div>
    );
  }
}

export default MESettings;
