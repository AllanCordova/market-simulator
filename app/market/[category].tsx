import MarketPlace from "@/components/MarketPlace";
import TabsFooter from "@/components/TabsFooter";
import { useAppContext } from "@/contexts/userContext";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function CategoryMarket() {
  const { theme } = useAppContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <MarketPlace />
      <TabsFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

