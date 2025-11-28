import TabsFooter from "@/components/TabsFooter";
import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Categories() {
  const { theme } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    router.replace("/market/food" as any);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.center}>
        <MaterialIcons name="restaurant" size={64} color={theme.primary} />
        <Text style={[styles.text, { color: theme.text }]}>
          Carregando receitas...
        </Text>
      </View>
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
    gap: stylesRoot.spacing.m,
  },
  text: {
    fontSize: stylesRoot.fontSize.l,
  },
});
