import "./sign-in.scss";

import * as React from "react";
import * as microsoftTeams from "@microsoft/teams-js";

import { Button, Flex, Text } from "@fluentui/react-northstar";

import { useTranslation } from 'react-i18next';

const SignInPage: React.FunctionComponent = props => {
    const localize = useTranslation().t;

    function onSignIn() {
        microsoftTeams.app.initialize();
        microsoftTeams.authentication.authenticate({
            url: window.location.origin + "/signin-simple-start",
            successCallback: () => {
                window.location.href = `${window.location.origin}/`;
            },
            failureCallback: (reason) => {
                window.location.href = `${window.location.origin}/errorpage`;
            }
        });
    }

    return (
        <div className="sign-in">
            <div className="sign-in-content-container">
                <Flex hAlign="center" vAlign="center">
                    <Text content={localize('signInMessage')} size="medium" />
                </Flex>
                <Flex hAlign="center" vAlign="center" className="margin-between">
                    <Button content={localize("signInText")} primary className="sign-in-button" onClick={onSignIn} />
                </Flex>
            </div>
        </div>
    );
};

export default SignInPage;