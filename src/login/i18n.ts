/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            "login.brand": "KAPITA",
            "login.tagline": "Your money, simplified.",
            "login.form.title": "Sign in",
            "login.form.description": "Access your dashboard",
            "login.email.label": "Email",
            "login.email.placeholder": "Your email",
            "login.password.label": "Password",
            "login.password.placeholder": "••••••••",
            "login.submit": "Sign in",
            "login.register": "No account? Sign up"
        },
        fr: {
            "login.brand": "KAPITA",
            "login.tagline": "Ton argent, simplifié.",
            "login.form.title": "Se connecter",
            "login.form.description": "Accède à ton tableau de bord",
            "login.email.label": "Email",
            "login.email.placeholder": "Votre email",
            "login.password.label": "Mot de passe",
            "login.password.placeholder": "••••••••",
            "login.submit": "Se connecter",
            "login.register": "Pas de compte ? S'inscrire"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
