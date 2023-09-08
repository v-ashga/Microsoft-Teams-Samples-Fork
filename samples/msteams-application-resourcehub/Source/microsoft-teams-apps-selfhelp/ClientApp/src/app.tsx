﻿// <copyright file="App.tsx" company="Microsoft Corporation">
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// </copyright>

import './App.css';

import * as microsoftTeams from "@microsoft/teams-js";

import { Provider, teamsDarkTheme, teamsHighContrastTheme, teamsTheme } from '@fluentui/react-northstar';
import React, { Suspense } from 'react';
import { TeamsThemeContext, ThemeStyle, getContext } from 'msteams-ui-components-react';

import { AppRoute } from './router/router';
import i18n from "./i18n";

export interface IAppState {
    theme: string;
    themeStyle: number;
}

class App extends React.Component<{}, IAppState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            theme: "",
            themeStyle: ThemeStyle.Light,
        }
    }

    public componentDidMount() {
        microsoftTeams.app.initialize();
        microsoftTeams.app.getContext().then((context) => {
            let theme = context.app.theme || "";
            this.updateTheme(theme);
            this.setState({
                theme: theme
            });
            i18n.changeLanguage(context.app.locale);
        });

        microsoftTeams.app.registerOnThemeChangeHandler((theme) => {
            this.updateTheme(theme);
            this.setState({
                theme: theme,
            }, () => {
                this.forceUpdate();
            });
        });
    }

    public setThemeComponent = () => {
        if (this.state.theme === "dark") {
            return (
                <Provider theme={teamsDarkTheme}>
                    <div className="dark-container">
                        {this.getAppDom()}
                    </div>
                </Provider>
            );
        }
        else if (this.state.theme === "contrast") {
            return (
                <Provider theme={teamsHighContrastTheme}>
                    <div className="high-contrast-container">
                        {this.getAppDom()}
                    </div>
                </Provider>
            );
        } else {
            return (
                <Provider theme={teamsTheme}>
                    <div className="default-container">
                        {this.getAppDom()}
                    </div>
                </Provider>
            );
        }
    }

    private updateTheme = (theme: string) => {
        if (theme === "dark") {
            this.setState({
                themeStyle: ThemeStyle.Dark
            });
        } else if (theme === "contrast") {
            this.setState({
                themeStyle: ThemeStyle.HighContrast
            });
        } else {
            this.setState({
                themeStyle: ThemeStyle.Light
            });
        }
    }

    public getAppDom = () => {
        const context = getContext({
            baseFontSize: 10,
            style: this.state.themeStyle
        });
        return (
            <TeamsThemeContext.Provider value={context}>
                <Suspense fallback={<div></div>}>
                    <div className="appContainer">
                        <AppRoute />
                    </div>
                </Suspense>
            </TeamsThemeContext.Provider>
        );
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.setThemeComponent()}
            </div>
        );
    }
}

export default App;