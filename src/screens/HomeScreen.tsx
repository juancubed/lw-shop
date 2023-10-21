import { Heading, View } from "native-base";
import React from "react";
import { ProductList } from "../components/ProductsList";
import { useAppContext } from "../providers/app-context";

export const HomeScreen: React.FC = ({ navigation, ...rest }: any) => {
  const { products } = useAppContext();

  return (
    <View>
      <Heading p="4" pb="3" size="lg">
        LW Shopping
      </Heading>
      <ProductList products={products} />
    </View>
  );
};
