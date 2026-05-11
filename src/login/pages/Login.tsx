import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

type LoginProps = {
    kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
    i18n: I18n;
};

export const Login = (props: LoginProps) => {
    const { kcContext, i18n } = props;
    const { auth, enableWebAuthnConditionalUI, login, properties, message, messagesPerField, realm, url, usernameHidden } = kcContext;
    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const hasFieldError = messagesPerField.existsError("username", "password");

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
            <div className="mb-8 flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                    <WalletIcon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{msg("login.brand")}</h1>
                <p className="text-muted-foreground">{msg("login.tagline")}</p>
            </div>

            <div className="w-full max-w-sm rounded-lg border border-border/50 bg-card text-card-foreground shadow-lg">
                <div className="flex flex-col space-y-1.5 p-6 pb-4">
                    <h3 className="text-xl font-semibold leading-none tracking-tight">{msg("login.form.title")}</h3>
                    <p className="text-sm text-muted-foreground">{msg("login.form.description")}</p>
                </div>

                <div className="p-6 pt-0">
                    {message !== undefined && !hasFieldError && (
                        <div
                            className={[
                                "mb-4 rounded-md border px-3 py-2 text-sm",
                                message.type === "error"
                                    ? "border-red-200 bg-red-50 text-red-700"
                                    : message.type === "success"
                                      ? "border-green-200 bg-green-50 text-green-700"
                                      : message.type === "warning"
                                        ? "border-amber-200 bg-amber-50 text-amber-700"
                                        : "border-slate-200 bg-muted text-muted-foreground"
                            ].join(" ")}
                            dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                        />
                    )}

                    <div id="kc-form">
                        <div id="kc-form-wrapper">
                            {realm.password && (
                                <form
                                    id="kc-form-login"
                                    action={url.loginAction}
                                    method="post"
                                    className="space-y-4"
                                    onSubmit={() => {
                                        setIsLoginButtonDisabled(true);
                                        return true;
                                    }}
                                >
                                    {!usernameHidden && (
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="email"
                                            >
                                                {msg("login.email.label")}
                                            </label>
                                            <input
                                                tabIndex={2}
                                                id="email"
                                                name="username"
                                                type="email"
                                                placeholder={msgStr("login.email.placeholder")}
                                                required
                                                defaultValue={login.username ?? ""}
                                                autoFocus
                                                autoComplete={enableWebAuthnConditionalUI ? "username webauthn" : "username"}
                                                aria-invalid={hasFieldError}
                                                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                            />
                                            {hasFieldError && (
                                                <p
                                                    id="input-error"
                                                    className="text-sm font-medium text-red-600"
                                                    aria-live="polite"
                                                    dangerouslySetInnerHTML={{
                                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )}

                                    {usernameHidden && auth?.attemptedUsername !== undefined && (
                                        <div className="rounded-md border border-border bg-muted px-3 py-2">
                                            <p className="text-xs font-medium text-muted-foreground">{msg("login.email.label")}</p>
                                            <p className="mt-1 text-sm font-medium text-foreground">{auth.attemptedUsername}</p>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="password"
                                        >
                                            {msg("login.password.label")}
                                        </label>
                                        <div className="relative">
                                            <input
                                                tabIndex={3}
                                                id="password"
                                                name="password"
                                                type={isPasswordVisible ? "text" : "password"}
                                                placeholder={msgStr("login.password.placeholder")}
                                                required
                                                autoComplete="current-password"
                                                aria-invalid={hasFieldError}
                                                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pr-11 text-base text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center rounded-r-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                aria-label={msgStr(isPasswordVisible ? "hidePassword" : "showPassword")}
                                                aria-controls="password"
                                                onClick={() => setIsPasswordVisible(current => !current)}
                                            >
                                                {isPasswordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                    <button
                                        tabIndex={7}
                                        type="submit"
                                        name="login"
                                        id="kc-login"
                                        className="inline-flex h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 text-base font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                                        disabled={isLoginButtonDisabled}
                                    >
                                        {msg("login.submit")}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    <a
                        tabIndex={8}
                        href={properties.MY_APP_API_URL + "/register"}
                        className="mt-4 block w-full text-center text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        {msg("login.register")}
                    </a>
                </div>
            </div>
        </main>
    );
};

function WalletIcon(props: { className?: string }) {
    return (
        <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M4.75 7.75h14.5c1.1 0 2 .9 2 2v7.5c0 1.1-.9 2-2 2H4.75c-1.1 0-2-.9-2-2v-11c0-1.1.9-2 2-2h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.75 13.5h4.5v3h-4.5a1.5 1.5 0 0 1 0-3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EyeIcon(props: { className?: string }) {
    return (
        <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M2.75 12s3.5-6.25 9.25-6.25S21.25 12 21.25 12 17.75 18.25 12 18.25 2.75 12 2.75 12Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 14.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EyeOffIcon(props: { className?: string }) {
    return (
        <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m3.75 3.75 16.5 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M8.75 5.27A9.86 9.86 0 0 1 12 4.75c5.75 0 9.25 6.25 9.25 6.25a16.68 16.68 0 0 1-3.07 3.81"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.12 17.05a10.58 10.58 0 0 1-2.12.2C6.25 17.25 2.75 11 2.75 11a16.54 16.54 0 0 1 3.3-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
