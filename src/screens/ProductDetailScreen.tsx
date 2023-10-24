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
import { ProductVariationsSelection } from "../components/VariantionsList";
import {
  getPriceFromVariations,
  getVariationGroup,
  isValidChosenVariant,
  variationGroup,
} from "../utils/utils";

export const ProductDetailScreen: React.FC = ({ navigation, ...rest }: any) => {
  const route = useRoute<any>();
  const { updateCart, products } = useAppContext();
  const { productId } = route.params;
  const [product, setProduct] = useState<IProduct>();

  const [chosenVariationObject, setChosenVariationObject] =
    useState<IChosenVariationObj>({});
  const [price, setPrice] = useState<number>(product?.price ?? 0);
  const [variationTypes, setVariationTypes] = useState<variationGroup>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddToCart = () => {
    if (!product || !chosenVariationObject || isSubmitting) return;
    // Object.keys(variationTypes)
    Object.keys(chosenVariationObject);

    if (!isValidChosenVariant(product, chosenVariationObject)) {
      Alert.alert(
        "Incomplete information",
        "Please fill all the required fields"
      );
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      updateCart(product, chosenVariationObject, 1).then((res) => {
        if (res.success) {
          Alert.alert(res.message);
        } else {
          Alert.alert("Invalid", res.message);
        }
      });
      setIsSubmitting(false);
    }, 200);
  };

  useEffect(() => {
    if (productId) {
      setTimeout(() => {
        let prod = products?.find((p) => p.id === productId);
        setProduct(prod);

        if (prod) {
          let variationGroup = getVariationGroup(prod?.category.name);
          setVariationTypes(variationGroup);
          setPrice(prod.price);
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

        {product?.variants && product.variants.length > 0 && variationTypes && (
          <Flex>
            {product.variants != undefined && (
              <ProductVariationsSelection
                variants={product.variants}
                onSelect={(chosenObj: IVariationObj | undefined) => {
                  if (chosenObj && chosenVariationObject) {
                    let c = chosenVariationObject;
                    c[chosenObj.group] = chosenObj.value;
                    setChosenVariationObject(c);
                    let p = getPriceFromVariations(product, c);
                    if (p >= 0) setPrice(p);
                    // alert(isValidChosenVariant(product, chosenVariationObject));
                  }
                }}
                chosenVariationObject={chosenVariationObject}
              />
            )}
          </Flex>
        )}
      </Box>

      <HStack justifyContent={"flex-end"} my={2}>
        <Text my={3}>Price: </Text>
        <Text fontWeight={"bold"} fontSize={"3xl"}>
          ${price.toString()}
        </Text>
      </HStack>
      <Button
        colorScheme={"lightBlue"}
        _text={{ fontSize: "lg" }}
        isDisabled={!product || !chosenVariationObject || isSubmitting}
        isLoading={isSubmitting}
        isLoadingText="Adding to Cart"
        m="4"
        onPress={handleAddToCart}
      >
        Add to Cart
      </Button>
    </ScrollView>
  );
};
