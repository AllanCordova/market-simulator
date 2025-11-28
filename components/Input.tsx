import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Input() {
  const [input, setInput] = useState("");
  const { theme, increment } = useAppContext();

  function receive() {
    if (!input) return;
    increment(Number(input));
    setInput("");
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>Lançar Entrada:</Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBackground,
            color: theme.inputText,
            borderColor: theme.inputBorder,
          },
        ]}
        placeholderTextColor={theme.inputPlaceholder}
        onChangeText={setInput}
        value={input}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={receive}
        activeOpacity={0.7}
        style={[
          styles.button,
          {
            backgroundColor: theme.buttonBackground,
            borderRadius: stylesRoot.radius.m,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: stylesRoot.spacing.s,
    paddingHorizontal: stylesRoot.spacing.s,
    gap: stylesRoot.spacing.s,
  },
  label: {
    fontSize: stylesRoot.fontSize.m,
    marginBottom: stylesRoot.spacing.xs,
    fontWeight: "600",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: stylesRoot.radius.m,
    marginBottom: stylesRoot.spacing.m,
  },

  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
