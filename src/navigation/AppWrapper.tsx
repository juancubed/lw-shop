import React, { useCallback, useEffect } from "react";
import {
  Button,
  Center,
  extendTheme,
  Flex,
  IconButton,
  Image,
  Text,
  View,
} from "native-base";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { startRoutes } from "./routes";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { UserTabs } from "../layout/Tabs";
import { useAuth } from "../context/authContext";
import * as SplashScreen from "expo-splash-screen";
import {
  AuthenticatedParamList,
  InitialParamList,
  MainAppParamList,
} from "./navTypes";
import { ValidateInvitationTokenScreen } from "../screens/Auth/ValidateInvitationToken";
import { UserSettingsNavStack } from "../screens/User/UserSettings/UserSettingsNavStack";
import { BusinessTabs } from "../layout/BusinessTabs";
import { RegBusinessNavStack } from "./RegBusinessNavStack";
import { PasswordReset } from "../screens/Auth/PasswordReset";
import { AssistanceVideoView } from "../screens/AdminTeam/AssistanceVideoView";

import { AssistanceVideoListView } from "../screens/AdminTeam/AssistanceVideoListView";
import { DEFAULT_MAIN_COLOR } from "../types/constants";
import * as app_config from "../../config.json";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import { useWindowDimensions } from "react-native";
import logo from "../assets/logo.png";
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({ config });

SplashScreen.preventAutoHideAsync();
export default function AppWrapper() {
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  const { isAuthenticated, loading, organization, setLoading, logoutUser } =
    useAuth();
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;

  useEffect(() => {
    if (!loading || !fontsLoaded) {
      SplashScreen.hideAsync();
    } else {
      SplashScreen.preventAutoHideAsync();
    }
  }, [loading]);

  const Stack = createNativeStackNavigator<InitialParamList>();

  const LoginRoute = () => {
    const excluded_header = ["MainRegister"];
    return (
      <Stack.Navigator initialRouteName="MainRegister">
        <Stack.Group>
          {Object.entries(startRoutes).map(([key, route]) => {
            const { headerName } = route?.params ?? {};
            return (
              <Stack.Screen
                key={key}
                name={route.name}
                component={route.screen}
                initialParams={route.params}
                options={{
                  title: headerName ?? route.title,
                  headerShown:
                    !route.headerHidden &&
                    excluded_header.indexOf(route.title ?? "") < 0,
                  headerBackTitle: "Back",
                }}
              />
            );
          })}
        </Stack.Group>
      </Stack.Navigator>
    );
  };
  function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
      <DrawerContentScrollView {...props}>
        <Center my={5}>
          <Image alt="logo" source={logo} size={"lg"} mt={0} />
          <Text fontSize={"xs"} color="gray.300">
            v {app_config.APP_VERSION}
          </Text>
        </Center>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }
  const MainDrawer = ({ navigation }: any) => {
    const Drawer = createDrawerNavigator<AuthenticatedParamList>();
    return (
      <Drawer.Navigator
        initialRouteName="BusinessViews"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={UserTabs}
          options={{
            headerShown: true,
          }}
        />
        {organization && (
          <Drawer.Screen
            name="BusinessViews"
            component={BusinessTabs}
            options={{
              headerShown: true,
              title: "My Business",
              headerStyle: {
                backgroundColor: DEFAULT_MAIN_COLOR,
              },
              headerTintColor: "#fff",

              headerRight: () => (
                <Button
                  variant={"ghost"}
                  _text={{ color: "white" }}
                  _pressed={{ background: "lightBlue.600", shadow: "5" }}
                  onPress={() => {
                    navigation.navigate("AssistanceVideoListView");
                  }}
                >
                  Help
                </Button>
              ),
            }}
          />
        )}
        {isAuthenticated && !organization && (
          <Drawer.Screen
            name="RegisterBusiness"
            component={RegBusinessNavStack}
            options={{
              headerShown: true,
              title: "Register your Business",
            }}
          />
        )}
        <Drawer.Screen
          name="UserInfoMainScreen"
          component={UserSettingsNavStack}
          options={{
            headerShown: true,
            title: "User Profile",
          }}
        />
      </Drawer.Navigator>
    );
  };

  const AppModalStack = () => {
    if (loading) {
      return null;
    }
    const MainStackNav = createNativeStackNavigator<MainAppParamList>();

    const options: NativeStackNavigationOptions = {
      presentation: "modal",
      headerShown: true,
      headerStyle: {
        backgroundColor: DEFAULT_MAIN_COLOR,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerBackTitle: "Back",
      headerBackVisible: true,
    };

    return (
      <MainStackNav.Navigator
        screenOptions={{ presentation: "containedModal", headerShown: false }}
      >
        {!isAuthenticated ? (
          <MainStackNav.Screen name="Anon" component={LoginRoute} />
        ) : (
          <MainStackNav.Group>
            <MainStackNav.Screen name="Auth" component={MainDrawer} />
            <MainStackNav.Screen
              name="RegBusiness"
              component={RegBusinessNavStack}
            />
            <MainStackNav.Screen
              name="AssistanceVideoListView"
              component={AssistanceVideoListView}
              options={{
                title: "Video Assistance",
                ...{ options },
              }}
            />
            <MainStackNav.Screen
              name="AssistanceVideoViewPlayback"
              component={AssistanceVideoView}
              options={{
                title: "Video Assistance",
                ...{ options },
              }}
            />
          </MainStackNav.Group>
        )}

        <MainStackNav.Screen
          key={"ValidateInvitation"}
          name="ValidateInvitation"
          component={ValidateInvitationTokenScreen}
        />
        <MainStackNav.Screen name="PasswordReset" component={PasswordReset} />
      </MainStackNav.Navigator>
    );
  };

  return <AppModalStack />;
}
