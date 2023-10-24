import {
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  Flex,
  HStack,
  Heading,
  List,
  Spacer,
  Text,
  View,
} from "native-base";
import React from "react";
import { useAppContext } from "../../providers/app-context";
import { CartProductListItem } from "../../components/CartProductListItem";

interface Props {
  // productId: Number
}

export const CheckoutScreen: React.FC = ({ navigation, ...rest }: any) => {
  const { cart, clearCart } = useAppContext();

  const handleConfirmation = () => {
    clearCart();
    navigation.navigate("PurchaseConfirmation", {
      orderNumber: 1234567,
      items: cart.products,
      total: cart.products.reduce((total, product) => {
        return total + product.price;
      }, 0),
    });
  };
  const handleCancellation = () => {
    navigation.navigate("Main", { screen: "Cart" });
  };
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
      <Heading m={6}>Purchase Confirmation</Heading>

      <Divider my={2} />

      <Heading size={"sm"}>Purchase Sumary</Heading>
      {cart.products.map((p, i) => (
        <CartProductListItem
          product={p}
          isCheckout={true}
          key={i}
          handleRemoveFromCart={() => {}}
        />
      ))}
      <Divider my={2} />
      <Button
        colorScheme={"lightBlue"}
        _text={{ color: "white" }}
        size={"lg"}
        onPress={handleConfirmation}
        my={1}
      >
        Confirm Purchase
      </Button>
      <Button
        colorScheme={"lightBlue"}
        variant={"outline"}
        size={"lg"}
        onPress={handleCancellation}
      >
        <Text>Cancel</Text>
      </Button>
    </View>
  );
};
