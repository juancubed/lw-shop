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
  ScrollView,
  Spacer,
  Text,
} from "native-base";
import React from "react";
import { useAppContext } from "../../providers/app-context";
import { CartProductListItem } from "../../components/CartProductListItem";
import { View } from "react-native";
import { IProductPurchase } from "../../types";

interface Props {
  // productId: Number
}

export const ConfirmationScreen: React.FC = ({ navigation, ...rest }: any) => {
  const { cart, clearCart } = useAppContext();

  const handleConfirmation = () => {
    clearCart();
    navigation.navigate("Home");
  };
  const handleCancellation = () => {
    navigation.navigate("Main", { screen: "Cart" });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView>
        <Heading p="4" pb="3" size="lg">
          Purchase Confirmation
        </Heading>

        <Heading size={"sm"}>Purchase Sumary</Heading>

        <FlatList
          data={cart.products}
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
                handleRemoveFromCart={() => {}}
              />
            );
          }}
          horizontal={false}
          keyExtractor={(item, index) => index + ""}
        />
      </ScrollView>
      <Divider my={2} />
      <Box p={2} pt={4} borderRadius="md" background={"white"} shadow={"2"}>
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
      </Box>
    </View>
  );
};
