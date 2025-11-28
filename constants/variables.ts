import { StyleSheet } from "react-native";

export const stylesRoot = {
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },

  fontSize: {
    xs: 12,
    s: 14,
    m: 16,
    l: 20,
    xl: 24,
    xxl: 32,
  },

  radius: {
    s: 4,
    m: 8,
    l: 16,
    circle: 9999,
  },

  containers: StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    rowBetween: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 22,
    },
    column: {
      flexDirection: "column",
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
    fill: {
      flex: 1,
    },
  }),
};
