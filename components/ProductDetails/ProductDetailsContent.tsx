import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProductDetailsContentProps {
  category: string;
  description: string;
  ingredients?: Array<{ ingredient: string; measure: string }>;
  instructions?: string;
}

export default function ProductDetailsContent({
  description,
  ingredients,
  instructions,
}: ProductDetailsContentProps) {
  const { theme } = useAppContext();

  return (
    <>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Descrição
        </Text>
        <Text style={[styles.description, { color: theme.text }]}>
          {description}
        </Text>
      </View>

      {ingredients && ingredients.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Ingredientes
          </Text>
          <View style={styles.featuresList}>
            {ingredients.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.featureItem,
                  { backgroundColor: theme.cardBackground },
                ]}
              >
                <MaterialIcons
                  name="check-circle"
                  size={16}
                  color={theme.primary}
                  style={styles.featureIcon}
                />
                <Text style={[styles.featureText, { color: theme.text }]}>
                  {item.measure} {item.ingredient}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {instructions && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Modo de Preparo
          </Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {instructions}
          </Text>
        </View>
      )}

    </>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: stylesRoot.spacing.m,
  },
  sectionTitle: {
    fontSize: stylesRoot.fontSize.l,
    fontWeight: "bold",
  },
  description: {
    fontSize: stylesRoot.fontSize.m,
    lineHeight: 24,
    textAlign: "justify",
  },
  featuresList: {
    gap: stylesRoot.spacing.xs,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: stylesRoot.spacing.s,
    borderRadius: stylesRoot.radius.m,
  },
  featureIcon: {
    marginRight: stylesRoot.spacing.s,
  },
  featureText: {
    fontSize: stylesRoot.fontSize.m,
    flex: 1,
  },
});

