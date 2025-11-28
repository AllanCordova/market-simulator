import Input from "@/components/Input";
import TabsFooter from "@/components/TabsFooter";
import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import { formatPrice } from "@/utils/formatPrice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Wallet() {
  const { theme, amount, purchases } = useAppContext();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={styles.balanceContainer}>
          <Text style={[styles.balanceLabel, { color: theme.text }]}>
            Saldo Atual
          </Text>
          <Text style={[styles.balanceValue, { color: theme.priceText }]}>
            R$ {formatPrice(amount)}
          </Text>
        </View>

        {/* Purchases Button */}
        <TouchableOpacity
          onPress={() => router.push("/purchases")}
          style={[
            styles.purchasesButton,
            { backgroundColor: theme.cardBackground },
          ]}
          activeOpacity={0.7}
        >
          <View style={styles.purchasesButtonContent}>
            <View style={styles.purchasesButtonLeft}>
              <MaterialIcons
                name="shopping-bag"
                size={24}
                color={theme.primary}
                style={styles.purchasesIcon}
              />
              <View>
                <Text style={[styles.purchasesButtonTitle, { color: theme.text }]}>
                  Minhas Compras
                </Text>
                <Text
                  style={[
                    styles.purchasesButtonSubtitle,
                    { color: theme.inputPlaceholder },
                  ]}
                >
                  {purchases.length} {purchases.length === 1 ? "compra" : "compras"}
                </Text>
              </View>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={theme.inputPlaceholder}
            />
          </View>
        </TouchableOpacity>

        <Input />
      </View>
      <TabsFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: stylesRoot.spacing.m,
    gap: stylesRoot.spacing.l,
  },
  balanceContainer: {
    alignItems: "center",
    paddingVertical: stylesRoot.spacing.xl,
    gap: stylesRoot.spacing.s,
  },
  balanceLabel: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "500",
  },
  balanceValue: {
    fontSize: stylesRoot.fontSize.xxl,
    fontWeight: "bold",
  },
  purchasesButton: {
    borderRadius: stylesRoot.radius.m,
    padding: stylesRoot.spacing.m,
    marginBottom: stylesRoot.spacing.m,
  },
  purchasesButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  purchasesButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: stylesRoot.spacing.m,
  },
  purchasesIcon: {
    marginRight: stylesRoot.spacing.xs,
  },
  purchasesButtonTitle: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "600",
  },
  purchasesButtonSubtitle: {
    fontSize: stylesRoot.fontSize.s,
    marginTop: stylesRoot.spacing.xs / 2,
  },
});

