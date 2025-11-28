import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface ProductDetailsHeaderProps {
  name: string;
  image: string;
  price: string;
  category: string;
  rating?: { rate: number; count: number };
}

export default function ProductDetailsHeader({
  name,
  image,
  price,
  category,
  rating,
}: ProductDetailsHeaderProps) {
  const { theme } = useAppContext();

  return (
    <>
      <Image
        source={{ uri: image }}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>{name}</Text>
          <Text style={[styles.price, { color: theme.priceText }]}>
            R$ {price}
          </Text>
        </View>

        <View style={styles.metaContainer}>
          <View
            style={[
              styles.metaBadge,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <MaterialIcons
              name="category"
              size={16}
              color={theme.primary}
              style={styles.metaIcon}
            />
            <Text style={[styles.metaText, { color: theme.text }]}>
              {category}
            </Text>
          </View>
          {rating && (
            <View
              style={[
                styles.metaBadge,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <MaterialIcons
                name="star"
                size={16}
                color={theme.primary}
                style={styles.metaIcon}
              />
              <Text style={[styles.metaText, { color: theme.text }]}>
                {rating.rate.toFixed(1)} ({rating.count})
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: stylesRoot.spacing.m,
    gap: stylesRoot.spacing.l,
  },
  header: {
    gap: stylesRoot.spacing.s,
  },
  title: {
    fontSize: stylesRoot.fontSize.xxl,
    fontWeight: "bold",
  },
  price: {
    fontSize: stylesRoot.fontSize.xl,
    fontWeight: "bold",
  },
  metaContainer: {
    flexDirection: "row",
    gap: stylesRoot.spacing.s,
    flexWrap: "wrap",
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: stylesRoot.spacing.m,
    paddingVertical: stylesRoot.spacing.xs,
    borderRadius: stylesRoot.radius.m,
  },
  metaIcon: {
    marginRight: stylesRoot.spacing.xs,
  },
  metaText: {
    fontSize: stylesRoot.fontSize.s,
    fontWeight: "500",
  },
});

