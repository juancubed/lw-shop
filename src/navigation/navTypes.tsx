import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export interface IRouteObj<T> {
  [key: string]: {
    name: keyof T;
    screen: any;
    params?: any;
    title?: string;
    headerHidden?: boolean;
  };
}
export type AppParamList = {
  Home: undefined;
  ProductDetail: undefined;
  Checkouts: undefined;
};

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Main: undefined;
  Product: { productId: number };
  Cart: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Main">;
