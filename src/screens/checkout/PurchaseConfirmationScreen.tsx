import {
  Button,
  Card,
  Divider,
  Heading,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React from "react";
import { View } from "react-native";
import { IProductPurchase } from "../../types";
import { useNavigation } from "@react-navigation/native";

export const PurchaseConfirmationScreen: React.FC = ({
  route,
  ...rest
}: any) => {
  const { orderNumber, items, total } = route.params;
  let products = items as Array<IProductPurchase>;
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
      <Heading m={6}>Order Confirmation</Heading>
      <Divider mb={2} />
      <Card>
        <Text fontSize={"lg"}>Order Number: {orderNumber}</Text>
        <Text fontSize={"lg"}>Items:</Text>
        <Stack direction={"column"} space={1} divider={<Divider />}>
          {products.map((item, i) => {
            return (
              <Text>{`${item.quantity} - ${item.product.title} - $${item.price}`}</Text>
            );
          })}
        </Stack>
        <Text fontSize={"lg"}>Total: ${total}</Text>

        <Button
          colorScheme={"lightBlue"}
          size={"lg"}
          onPress={() => navigation.navigate("Main")}
        >
          Close
        </Button>
      </Card>
    </View>
  );
};
