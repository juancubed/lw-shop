import {
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  View,
} from "native-base";
import React from "react";
import { useAppContext } from "../providers/app-context";
import { CartProductListItem } from "../components/CartProductListItem";
import { IProductPurchase } from "../types";
import { isVariationIncluded } from "../utils/utils";

export const CartScreen: React.FC = ({ navigation, ...rest }: any) => {
  const { cart, removeFromCart } = useAppContext();
  const { products } = cart;

  const handleStartCheckout = () => {
    navigation.navigate("Checkout");
  };

  const handleRemoveFromCart = (product: IProductPurchase) => {
    let index = cart.products.findIndex((p) => {
      {
        return (
          p.product.id === product.product.id &&
          isVariationIncluded(p.variant, product.variant) === true
        );
      }
    });
    if (index >= 0) removeFromCart(index);
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 4,
        backgroundColor: "white",
      }}
    >
      <Heading m={6}>Shopping Cart</Heading>
      <Divider />
      {products && products.length > 0 && (
        <FlatList
          data={products}
          renderItem={({
            item,
            index,
          }: {
            item: IProductPurchase;
            index: number;
          }) => {
            return (
              <CartProductListItem
                key={index}
                isCheckout={false}
                product={item}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            );
          }}
          horizontal={false}
          keyExtractor={(item, index) => index + ""}
        />
      )}
      {(!products || products.length === 0) && (
        <Center flex={1}>
          <Heading color={"gray.400"}>The Cart is Empty</Heading>
        </Center>
      )}

      {products.length > 0 && (
        <Box p={2} pt={4} borderRadius="md" background={"white"} shadow={"2"}>
          <Button
            colorScheme={"lightBlue"}
            _text={{ fontSize: "lg" }}
            onPress={handleStartCheckout}
          >
            Proceed to Checkout
          </Button>
          <Divider />
          <HStack>
            <Text>Items {products.length}</Text>
          </HStack>
          <Flex flexDir={"row"}>
            <Text fontSize={"lg"}>Total </Text>
            <Spacer />
            <Text fontWeight={"bold"} fontSize={"lg"}>
              $
              {products.reduce((total, product) => {
                return total + product.price;
              }, 0)}
            </Text>
          </Flex>
        </Box>
      )}
    </View>
  );
};
