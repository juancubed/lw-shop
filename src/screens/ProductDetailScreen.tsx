import React, { useEffect, useState } from "react";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  ScrollView,
  Select,
  Skeleton,
  Stack,
  Text,
} from "native-base";
import { useRoute } from "@react-navigation/native";
import {
  IChosenVariationObj,
  IProduct,
  IVariation,
  IVariationObj,
} from "../types";
import { fetchProductDetail } from "../api";
import { useAppContext } from "../providers/app-context";
import { Alert, View } from "react-native";
import { SkeletonProductDetail } from "../components/SkeletonProductDetail";
import { VariationsList } from "../components/VariantionsList";

export const ProductDetailScreen: React.FC = ({ navigation, ...rest }: any) => {
  const route = useRoute<any>();
  const { addToCart, clearCart, updateCart, cart, products } = useAppContext();
  const { productId, variant } = route.params;
  const [product, setProduct] = useState<IProduct>();
  const [chosenVariant, setChosenVariant] = useState<IVariation>();
  const [chosenVariationObject, setChosenVariationObject] =
    useState<IChosenVariationObj>();
  const [variationTypes, setVariationTypes] = useState<{
    [key: string]: IVariation[];
  }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  const handleAddToCart = () => {
    if (!product || !chosenVariant || isSubmitting) return;
    setIsSubmitting(true);

    setTimeout(() => {
      updateCart(product, chosenVariant, 1).then((res) => {
        if (res.success) {
          showAlert();
        }
      });
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    if (productId) {
      setTimeout(() => {
        let prod = products?.find((p) => p.id === productId);
        setProduct(prod);
        let variationGroups: {
          [key: string]: IVariation[];
        } = {};

        if (prod?.variants && prod.variants.length > 0) {
          // setChosenVariant(prod.variants[0]);
          prod.variants.forEach((v) => {
            if (v.group in variationGroups === false) {
              variationGroups[v.group] = [];
            }
            variationGroups[v.group].push(v);
          });
          setVariationTypes(variationGroups);
        }
        setIsLoaded(true);
      }, 400);
    }
  }, [productId]);

  if (!isLoaded) return <SkeletonProductDetail />;

  return (
    <ScrollView
      style={[
        { flex: 1, paddingHorizontal: 10 },
        { flexDirection: "column", backgroundColor: "white" },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={20 / 18}>
            <Image
              source={{
                uri: product?.images[0],
              }}
              alt="image"
            />
          </AspectRatio>
          <Flex
            bg="lightBlue.600"
            _dark={{
              bg: "violet.400",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            <Text
              color={"white"}
              fontSize="md"
              fontWeight="500"
              ml="-0.5"
              mt="-1"
              textAlign={"right"}
            >
              {product?.category.name}
            </Text>
          </Flex>
        </Box>

        <Flex
          p={4}
          pb={0}
          flexDir={"row"}
          justifyContent={"space-between"}
          overflowX={"hidden"}
        >
          <Heading size="lg" color={"gray.600"} ml="-1">
            {product?.title}
          </Heading>
        </Flex>
        <Divider mb={3} />
        <Flex px={3}>
          <Text fontWeight="400">{product?.description}</Text>
        </Flex>
      </View>

      <Box>
        {/* Main Variation */}
        {product?.variants && variationTypes && (
          <Flex>
            {Object.keys(variationTypes).map((k) => {
              return (
                <Box key={k}>
                  <Text>{k}</Text>
                  <Select
                    h={"10"}
                    onValueChange={(value) => {
                      let v = variationTypes[k].find((t) => t.id === value);
                      setChosenVariant(
                        variationTypes[k].find((t) => t.id === value)
                      );
                      let c: IChosenVariationObj = {};
                      if (v) {
                        c[v.group] = v.value;
                        setChosenVariationObject(c);
                      }
                    }}
                  >
                    {variationTypes[k].map((v, i) => {
                      return (
                        <Select.Item label={v.value} value={v.id} key={i} />
                      );
                    })}
                  </Select>
                  {/* Sub Variations */}
                  {chosenVariant && chosenVariant.variation.length > 0 && (
                    <VariationsList
                      onSelect={(chosenObj: IVariationObj | undefined) => {
                        if (chosenObj && chosenVariationObject) {
                          let c = chosenVariationObject;
                          c[chosenObj.group] = chosenObj.value;
                          setChosenVariationObject(c);
                        }
                      }}
                      variant={chosenVariant}
                    />
                  )}
                </Box>
              );
            })}
          </Flex>
        )}
      </Box>
      {/* <Text>{JSON.stringify(product)}</Text> */}
      {/* <Text>{JSON.stringify(chosenVariant)}</Text> */}
      <Text>{JSON.stringify(chosenVariationObject)}</Text>
      <Button
        colorScheme={"lightBlue"}
        _text={{ fontSize: "lg" }}
        m="4"
        onPress={handleAddToCart}
      >
        Add to Cart
      </Button>
    </ScrollView>
  );
};
