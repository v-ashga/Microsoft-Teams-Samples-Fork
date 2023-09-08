// <copyright file="sign-in-start.tsx" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

import * as microsoftTeams from "@microsoft/teams-js";

import React, { useEffect } from "react";

import { getAuthenticationConsentMetadata } from '../../api/authentication-metadata';

/** Initiates sign in request with authentication metadata */
const SignInSimpleStart: React.FunctionComponent = () => {
    useEffect(() => {
        microsoftTeams.app.initialize();
        microsoftTeams.app.getContext().then((context: microsoftTeams.app.Context) => {
            const windowLocationOriginDomain = window.location.origin.replace("https://", "");
            const login_hint = context.user?.userPrincipalName ? context.user.userPrincipalName : "";

            getAuthenticationConsentMetadata(windowLocationOriginDomain, login_hint).then((result: any) => {
                window.location.assign(result.data);
            });
        });
    });

    return (
        <></>
    );
};

export default SignInSimpleStart;