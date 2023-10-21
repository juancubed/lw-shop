import { FlatList, ScrollView, Spinner, View } from "native-base";
import { IProduct } from "../types";
import { ProductListItem } from "./ProductListItem";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navTypes";

type ProductListProps = {
  products: IProduct[] | undefined;
};

type ProductListItemProps = {
  product: IProduct;
};

type Props = NativeStackScreenProps<RootStackParamList, "Main"> &
  ProductListItemProps;
export const ProductList = ({ products }: ProductListProps) => {
  if (!products) {
    return <Spinner />;
  }
  return (
    <View>
      {products && (
        <FlatList
          data={products}
          renderItem={({ item, index }: { item: IProduct; index: number }) => {
            return (
              <ProductListItem key={index} product={item}></ProductListItem>
            );
          }}
          horizontal={false}
          keyExtractor={(item, index) => index + ""}
        />
      )}
    </View>
  );
};
