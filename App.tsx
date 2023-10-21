import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
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
        <StackNavigator.Screen name="Main" component={AppTabNavigator} />
        <StackNavigator.Screen name="Product" component={ProductDetailScreen} />
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
