import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ThemeProvider from "../context/themeProvider";
import NotificationProvider from "../redux/features/notification/NotificationProvider";
import AuthProvider from "../redux/features/auth/AuthProvider";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <ConfirmProvider>
                    <AuthProvider>
                        <SnackbarProvider>
                            <NotificationProvider></NotificationProvider>
                            <Component {...pageProps} />
                        </SnackbarProvider>
                    </AuthProvider>
                </ConfirmProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
