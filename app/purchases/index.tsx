import TabsFooter from "@/components/TabsFooter";
import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import { formatPrice } from "@/utils/formatPrice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Purchases() {
  const { theme, purchases } = useAppContext();
  const router = useRouter();

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.price, 0);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  };

  const renderPurchase = ({ item }: { item: typeof purchases[0] }) => {
    // Usa "food" como categoria padrão
    const categoryId = item.categoryId || "food";
    const route = `/market/${categoryId}/${item.id}`;
    
    return (
      <TouchableOpacity
        style={[styles.purchaseCard, { backgroundColor: theme.cardBackground }]}
        onPress={() => router.push(route as any)}
        activeOpacity={0.7}
      >
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.purchaseImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.purchaseInfo}>
        <Text
          style={[styles.purchaseName, { color: theme.text }]}
          numberOfLines={2}
        >
          {item.productName}
        </Text>
        <View style={styles.purchaseMeta}>
          <View style={styles.purchaseDateContainer}>
            <MaterialIcons
              name="schedule"
              size={14}
              color={theme.inputPlaceholder}
              style={styles.dateIcon}
            />
            <Text style={[styles.purchaseDate, { color: theme.inputPlaceholder }]}>
              {formatDate(item.date)}
            </Text>
          </View>
        </View>
        <Text style={[styles.purchasePrice, { color: theme.priceText }]}>
          R$ {formatPrice(item.price)}
        </Text>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color={theme.inputPlaceholder}
      />
    </TouchableOpacity>
    );
  };

  if (purchases.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.emptyContainer}>
          <View
            style={[
              styles.emptyIconContainer,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <MaterialIcons
              name="shopping-bag"
              size={64}
              color={theme.inputPlaceholder}
            />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            Nenhuma compra realizada
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.inputPlaceholder }]}>
            Suas compras aparecerão aqui quando você comprar produtos no mercado
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/market/food")}
            style={[
              styles.emptyButton,
              { backgroundColor: theme.buttonBackground },
            ]}
          >
            <Text style={[styles.emptyButtonText, { color: theme.buttonText }]}>
              Ver receitas
            </Text>
          </TouchableOpacity>
        </View>
        <TabsFooter />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header Stats */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.cardBackground, borderBottomColor: theme.inputBorder },
        ]}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.inputPlaceholder }]}>
              Total de compras
            </Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {purchases.length}
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.inputBorder }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.inputPlaceholder }]}>
              Total gasto
            </Text>
            <Text style={[styles.statValue, { color: theme.priceText }]}>
              R$ {formatPrice(totalSpent)}
            </Text>
          </View>
        </View>
      </View>

      {/* Purchases List */}
      <FlatList
        data={purchases}
        renderItem={renderPurchase}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.listTitle, { color: theme.text }]}>
            Histórico de compras
          </Text>
        }
      />

      <TabsFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: stylesRoot.spacing.m,
    borderBottomWidth: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    gap: stylesRoot.spacing.xs,
  },
  statLabel: {
    fontSize: stylesRoot.fontSize.s,
    fontWeight: "500",
  },
  statValue: {
    fontSize: stylesRoot.fontSize.xl,
    fontWeight: "bold",
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  listContent: {
    padding: stylesRoot.spacing.m,
    gap: stylesRoot.spacing.m,
  },
  listTitle: {
    fontSize: stylesRoot.fontSize.l,
    fontWeight: "bold",
    marginBottom: stylesRoot.spacing.xs,
  },
  purchaseCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: stylesRoot.spacing.m,
    borderRadius: stylesRoot.radius.m,
    gap: stylesRoot.spacing.m,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  purchaseImage: {
    width: 60,
    height: 60,
    borderRadius: stylesRoot.radius.m,
  },
  purchaseInfo: {
    flex: 1,
    gap: stylesRoot.spacing.xs,
  },
  purchaseName: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "600",
  },
  purchaseMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: stylesRoot.spacing.s,
  },
  purchaseDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateIcon: {
    marginRight: stylesRoot.spacing.xs,
  },
  purchaseDate: {
    fontSize: stylesRoot.fontSize.s,
  },
  purchasePrice: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "bold",
    marginTop: stylesRoot.spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: stylesRoot.spacing.xl,
    gap: stylesRoot.spacing.l,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: stylesRoot.radius.l,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: stylesRoot.fontSize.xl,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: stylesRoot.fontSize.m,
    textAlign: "center",
    lineHeight: 22,
  },
  emptyButton: {
    paddingHorizontal: stylesRoot.spacing.xl,
    paddingVertical: stylesRoot.spacing.m,
    borderRadius: stylesRoot.radius.m,
    marginTop: stylesRoot.spacing.m,
  },
  emptyButtonText: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

