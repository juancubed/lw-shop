import { StatusBar } from "expo-status-bar";
import { LogBox, StyleSheet, View } from "react-native";
import { AppProviders } from "./src/navigation/AppProviders";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./src/screens/HomeScreen";
import { CartScreen } from "./src/screens/CartScreen";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ProductDetailScreen } from "./src/screens/ProductDetailScreen";
import { Text } from "native-base";
import type { CompositeNavigationProp } from "@react-navigation/native";
import { CheckoutScreen } from "./src/screens/checkout/CheckoutScreen";
import { PurchaseConfirmationScreen } from "./src/screens/checkout/PurchaseConfirmationScreen";

LogBox.ignoreAllLogs();
const AppTabNavigator: React.FC = ({ navigation }: any) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const StackNavigator = createNativeStackNavigator();

  return (
    <AppProviders>
      <StackNavigator.Navigator>
        <StackNavigator.Screen
          options={{ headerShown: false }}
          name="Main"
          component={AppTabNavigator}
        />
        <StackNavigator.Screen
          options={{ title: "Product Details" }}
          name="Product"
          component={ProductDetailScreen}
        />
        <StackNavigator.Screen
          options={{ animation: "slide_from_bottom" }}
          name="Checkout"
          component={CheckoutScreen}
        />
        <StackNavigator.Screen
          name="PurchaseConfirmation"
          component={PurchaseConfirmationScreen}
        />
      </StackNavigator.Navigator>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
