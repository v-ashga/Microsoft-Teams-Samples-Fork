// <copyright file="context-provider.tsx" company="Microsoft Corporation">
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// </copyright>

import * as microsoftTeams from "@microsoft/teams-js";

import React, { Component } from 'react';

export interface IWithContext {
    teamsContext: microsoftTeams.app.Context | null,
    microsoftTeams: typeof microsoftTeams
}

export default function withContext(WrappedComponent: any) {
    return class extends Component<any, IWithContext> {
        constructor(props: any) {
            super(props);
            this.state = {
                teamsContext: null,
                microsoftTeams: microsoftTeams
            };
        }

        componentDidMount() {
            microsoftTeams.app.initialize();
            microsoftTeams.app.getContext().then((context: microsoftTeams.app.Context) => {
                this.setState({ teamsContext: context });
            });
        }

        /** 
         * Renders component 
         */
        render() {
            return (
                <WrappedComponent {...this.props} teamsContext={this.state.teamsContext} microsoftTeams={this.state.microsoftTeams} />
            );
        }
    }
}