import HomeSlider from "@/components/Slider";
import TabsFooter from "@/components/TabsFooter";
import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function index() {
  const { theme } = useAppContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <HomeSlider />
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
    width: "100%",
    gap: stylesRoot.spacing.s,
  },
});
