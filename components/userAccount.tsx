import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserAccount() {
  const { theme, amount } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={[styles.subTitle, { color: theme.text }]}>
        Saldo atual: {amount}
      </Text>

      <Text style={[styles.label, { color: theme.text }]}>
        Faça um emprestimo e começe a comprar!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: stylesRoot.spacing.s,
    gap: stylesRoot.spacing.m,
    marginLeft: stylesRoot.spacing.m,
  },
  title: {
    fontSize: stylesRoot.fontSize.xxl,
  },
  subTitle: {
    fontSize: stylesRoot.fontSize.xl,
  },
  label: {
    fontSize: stylesRoot.fontSize.m,
    marginBottom: stylesRoot.spacing.xs,
    fontWeight: "600",
  },
});
