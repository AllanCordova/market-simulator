import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import { ProductService } from "@/services/productService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProductType {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  price: string;
}

const ITEMS_PER_PAGE = 8;

export default function MarketPlace() {
  const { theme, getProductPrice } = useAppContext();
  const router = useRouter();

  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [displayProducts, setDisplayProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      try {
        const products = await ProductService.fetchProducts();
        const productsWithPrice = products.map((product) => ({
          ...product,
          price: getProductPrice(product.id, "food"),
        }));

        setAllProducts(productsWithPrice);
        setDisplayProducts(productsWithPrice.slice(0, ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [getProductPrice]);

  const loadMoreItem = () => {
    if (displayProducts.length >= allProducts.length) return;

    const nextPage = page + 1;
    const nextItems = allProducts.slice(0, nextPage * ITEMS_PER_PAGE);

    setDisplayProducts(nextItems);
    setPage(nextPage);
  };

  const handleNavigateToDetails = (productId: string) => {
    router.push(`/market/food/${productId}` as any);
  };

  // Renderiza cada item (o Card)
  const renderItem = ({ item }: { item: ProductType }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
      onPress={() => handleNavigateToDetails(item.id)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardInfo}>
        <View style={styles.categoryBadge}>
          <Text style={[styles.categoryText, { color: theme.primary }]}>
            Comida
          </Text>
        </View>
        <Text
          style={[styles.cardTitle, { color: theme.text }]}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text style={[styles.cardPrice, { color: theme.priceText }]}>
          R$ {item.price}
        </Text>
        <TouchableOpacity
          style={[
            styles.buyButton,
            { backgroundColor: theme.buttonBackground },
          ]}
          onPress={(e) => {
            e.stopPropagation();
            handleNavigateToDetails(item.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.buyButtonText, { color: theme.buttonText }]}>
            Comprar
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text
        style={[
          styles.title,
          { color: theme.text, fontSize: stylesRoot.fontSize.xl },
        ]}
      >
        Receitas
      </Text>

      <FlatList
        data={displayProducts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `food-${item.id}-${index}`}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardInfo: {
    padding: 10,
    gap: 6,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 14,
    height: 36,
    marginBottom: 4,
  },
  cardPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  buyButton: {
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 4,
  },
  buyButtonText: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
