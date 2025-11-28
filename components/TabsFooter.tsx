import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsFooter() {
  const { theme } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: "Home",
      icon: "home",
      route: "/",
      active: pathname === "/" || pathname === "/index",
    },
    {
      name: "Carrinho",
      icon: "shopping-cart",
      route: "/market",
      active: pathname === "/market" || pathname.startsWith("/market"),
    },
    {
      name: "Usuário",
      icon: "person",
      route: "/auth/login",
      active: pathname === "/auth/login" || pathname.startsWith("/auth"),
    },
    {
      name: "Carteira",
      icon: "account-balance-wallet",
      route: "/wallet",
      active: pathname === "/wallet" || pathname.startsWith("/wallet"),
    },
  ];

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[
        styles.container,
        {
          backgroundColor: theme.cardBackground,
          borderTopColor: theme.inputBorder,
        },
      ]}
    >
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.route}
            onPress={() => handlePress(tab.route)}
            activeOpacity={0.7}
            style={styles.tab}
          >
            <MaterialIcons
              name={tab.icon as any}
              size={24}
              color={tab.active ? theme.primary : theme.inputPlaceholder}
            />
            <View
              style={[
                styles.indicator,
                {
                  backgroundColor: tab.active ? theme.primary : "transparent",
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderTopWidth: 1,
    paddingVertical: stylesRoot.spacing.s,
    paddingHorizontal: stylesRoot.spacing.m,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: stylesRoot.spacing.xs,
    paddingHorizontal: stylesRoot.spacing.m,
    position: "relative",
  },
  indicator: {
    position: "absolute",
    bottom: -stylesRoot.spacing.xs,
    width: 4,
    height: 4,
    borderRadius: stylesRoot.radius.circle,
  },
});
