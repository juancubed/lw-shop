import { Divider, Heading, View } from "native-base";
import React from "react";
import { ProductList } from "../components/ProductsList";
import { useAppContext } from "../providers/app-context";

export const HomeScreen: React.FC = ({ navigation, ...rest }: any) => {
  const { products } = useAppContext();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Heading m={2}>LW Shop</Heading>
      <Divider />
      <Heading size={"sm"} px={3} my={1}>
        Product List
      </Heading>
      <ProductList products={products} />
    </View>
  );
};
