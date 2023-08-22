﻿// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import "./App.css";

import * as microsoftTeams from "@microsoft/teams-js";

import React from "react";

/**
 * Displays shared dashboard
 */
class SharedDashboard extends React.Component {
  componentDidMount() {
    // Initialize the Microsoft Teams SDK and notify success.
    microsoftTeams.app.initialize(() =>
      microsoftTeams.app.notifySuccess()
    );
  }

  render() {
    return (
      <div className="container">
        <h1>Shared Dashboard</h1>
        <img
          className="image"
          src="images/power-bi-dashboard.png"
          alt="Sample dashboard image."
        />
      </div>
    );
  }
}

export default SharedDashboard;
