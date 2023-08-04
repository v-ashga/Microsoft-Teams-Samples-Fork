import './App.css';

import * as microsoftTeams from "@microsoft/teams-js";

import { Provider, teamsDarkTheme, teamsHighContrastTheme, teamsTheme } from '@fluentui/react-northstar'
import React, { Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { TeamsThemeContext, ThemeStyle, getContext } from 'msteams-ui-components-react';

import AddNotes from './components/recruiting-details/notes/add-notes';
import AddQuestions from './components/recruiting-details/questions/add-questions';
import Configuration from './components/configuration';
import EditQuestion from './components/recruiting-details/questions/edit-question';
import RecruitingDetails from './components/recruiting-details/recruiting-details';
import ShareAssets from './components/recruiting-details/share-assets/share-assets';

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
          <div className="darkContainer">
            {this.getAppDom()}
          </div>
        </Provider>
      );
    }
    else if (this.state.theme === "contrast") {
      return (
        <Provider theme={teamsHighContrastTheme}>
          <div className="highContrastContainer">
            {this.getAppDom()}
          </div>
        </Provider>
      );
    } else {
      return (
        <Provider theme={teamsTheme}>
          <div className="defaultContainer">
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
            <Router>
              <Switch>
                <Route exact path='/configure' component={Configuration}></Route>
                <Route exact path='/details' component={RecruitingDetails}></Route>
                <Route exact path='/questions' component={AddQuestions}></Route>
                <Route exact path='/edit' component={EditQuestion}></Route>
                <Route exact path='/addNote' component={AddNotes}></Route>
                <Route exact path='/shareAssets' component={ShareAssets}></Route>
              </Switch>
            </Router>
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