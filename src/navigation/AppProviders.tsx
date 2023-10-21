import { LinkingOptions, NavigationContainer } from "@react-navigation/native";

import React from "react";

import { SWRConfig } from "swr";

import { RootSiblingParent } from "react-native-root-siblings";
import { MainProvider } from "../providers/app-context";
import { request } from "../api";
import { AppState } from "react-native";
import { extendTheme, NativeBaseProvider } from "native-base";
import { LinearGradient } from "react-native-svg";

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};
const theme = extendTheme({ colors: newColorTheme });

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export const AppProviders: React.FC<any> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          request<any>(url, "GET").then((res) => res.data),
        provider: () => new Map(),
        isVisible: () => {
          return true;
        },
        initReconnect: (callback) => {},
        initFocus: (callback) => {
          let appState = AppState.currentState;

          const onAppStateChange = (nextAppState: any) => {
            /* If it's resuming from background or inactive mode to active one */
            if (
              appState.match(/inactive|background/) &&
              nextAppState === "active"
            ) {
              callback();
              // swrInitFocusCallback();
            }
            appState = nextAppState;
          };

          // Subscribe to the app state change events
          const subscription = AppState.addEventListener(
            "change",
            onAppStateChange
          );
        },
      }}
    >
      <NavigationContainer>
        <NativeBaseProvider config={config}>
          <MainProvider>
            <RootSiblingParent>{children}</RootSiblingParent>
          </MainProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SWRConfig>
  );
};
