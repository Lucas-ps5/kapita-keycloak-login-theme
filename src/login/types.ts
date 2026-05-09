import { KcContext } from "./KcContext"
import { JSX } from "react"
import { I18n } from "./i18n"
import { TemplateProps } from "keycloakify/login/TemplateProps"

type CustomTemplateProps<T> = Omit<TemplateProps<Extract<KcContext, { pageId: T }>, I18n>, "doUseDefaultCss" | "headerNode">

type PageProps<T> = {
    Template: (props: CustomTemplateProps<T>) => JSX.Element,
    kcContext: Extract<KcContext, { pageId: T }>,
    i18n: I18n
}

interface IconProps<T> {
    icon?: keyof T extends string ? Lowercase<keyof T> : never;
}

export type { PageProps, CustomTemplateProps, IconProps }