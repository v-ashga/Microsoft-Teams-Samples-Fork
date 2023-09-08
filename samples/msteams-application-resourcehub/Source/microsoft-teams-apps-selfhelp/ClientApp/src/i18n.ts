// <copyright file="i18n.ts" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

import "moment/min/locales";

import * as microsoftTeams from "@microsoft/teams-js";

import Backend from 'i18next-xhr-backend';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import moment from "moment";

let locale = "en-US";
microsoftTeams.app.initialize();
microsoftTeams.app.getContext().then((context: microsoftTeams.app.Context) => {
    moment.locale(context.app.locale!);
    i18n.changeLanguage(context.app.locale!);
});

i18n
    .use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        lng: window.navigator.language,
        fallbackLng: locale,
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;