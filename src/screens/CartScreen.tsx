import { Text, View } from "native-base";
import React from "react";

interface Props {
  // productId: Number
}

export const CartScreen: React.FC = ({ navigation, ...rest }: any) => {
  return (
    <View>
      <Text>Cart Screen</Text>
    </View>
  );
};
