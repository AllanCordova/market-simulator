import ProductDetailsContent from "@/components/ProductDetails/ProductDetailsContent";
import ProductDetailsHeader from "@/components/ProductDetails/ProductDetailsHeader";
import PurchaseModal from "@/components/ProductDetails/PurchaseModal";
import TabsFooter from "@/components/TabsFooter";
import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import { ProductDetails, ProductService } from "@/services/productService";
import { formatPrice, parsePrice } from "@/utils/formatPrice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetailsScreen() {
  const { theme, amount, decrement, addPurchase, getProductPrice } =
    useAppContext();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    async function fetchProductDetails() {
      if (!id) return;
      setLoading(true);

      try {
        const productData = await ProductService.fetchProductDetails(id);

        if (productData) {
          setProduct({
            ...productData,
            price: getProductPrice(productData.id, "food"),
          });
        } else {
          Alert.alert("Erro", "Produto não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        Alert.alert("Erro", "Não foi possível carregar os detalhes do produto");
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id, getProductPrice]);

  const handleBuy = () => {
    if (!product) return;
    setShowConfirmModal(true);
  };

  const confirmPurchase = () => {
    if (!product || !product.price) return;
    const priceNumber = parsePrice(product.price);

    if (amount < priceNumber) {
      Alert.alert(
        "Saldo Insuficiente",
        `Você não tem saldo suficiente para comprar este produto.\n\nSaldo atual: R$ ${formatPrice(
          amount
        )}\nValor necessário: R$ ${product.price}`,
        [{ text: "OK" }]
      );
      setShowConfirmModal(false);
      return;
    }

    decrement(priceNumber);
    addPurchase({
      id: product.id,
      productName: product.name,
      price: priceNumber,
      image: product.image,
      categoryId: "food",
    });

    setShowConfirmModal(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
        <TabsFooter />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: theme.text }]}>
            Produto não encontrado
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[
              styles.backButton,
              { backgroundColor: theme.buttonBackground },
            ]}
          >
            <Text style={[styles.backButtonText, { color: theme.buttonText }]}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
        <TabsFooter />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {product && (
          <>
            <ProductDetailsHeader
              name={product.name}
              image={product.image}
              price={product.price || "0,00"}
              category={product.category}
            />
            <ProductDetailsContent
              category="food"
              description={product.description}
              ingredients={product.ingredients}
              instructions={product.instructions}
            />
          </>
        )}
      </ScrollView>

      <View
        style={[
          styles.buyContainer,
          {
            backgroundColor: theme.cardBackground,
            borderTopColor: theme.inputBorder,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBuy}
          activeOpacity={0.8}
          disabled={!product.price || amount < parsePrice(product.price)}
          style={[
            styles.buyButton,
            {
              backgroundColor:
                product.price && amount >= parsePrice(product.price)
                  ? theme.buttonBackground
                  : theme.inputBorder,
              borderRadius: stylesRoot.radius.m,
              opacity:
                product.price && amount >= parsePrice(product.price) ? 1 : 0.5,
            },
          ]}
        >
          <MaterialIcons
            name="shopping-cart"
            size={24}
            color={theme.buttonText}
            style={styles.buyIcon}
          />
          <Text style={[styles.buyButtonText, { color: theme.buttonText }]}>
            Comprar por R$ {product.price || "0,00"}
          </Text>
        </TouchableOpacity>
      </View>

      <PurchaseModal
        visible={showConfirmModal}
        product={
          product && product.price
            ? { name: product.name, image: product.image, price: product.price }
            : null
        }
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmPurchase}
      />

      <TabsFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  buyContainer: {
    padding: stylesRoot.spacing.m,
    borderTopWidth: 1,
  },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    gap: stylesRoot.spacing.s,
  },
  buyIcon: {
    marginRight: stylesRoot.spacing.xs,
  },
  buyButtonText: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  errorText: {
    fontSize: stylesRoot.fontSize.l,
    marginBottom: stylesRoot.spacing.m,
  },
  backButton: {
    paddingHorizontal: stylesRoot.spacing.l,
    paddingVertical: stylesRoot.spacing.m,
    borderRadius: stylesRoot.radius.m,
  },
  backButtonText: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
