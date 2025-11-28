import { stylesRoot } from "@/constants/variables";
import AppContextProvider, { useAppContext } from "@/contexts/userContext";
import Foundation from "@expo/vector-icons/Foundation";
import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

function RootLayoutNav() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.primary },
        headerTintColor: theme.tint,
        contentStyle: { backgroundColor: theme.background },
        headerRight: () => (
          <View style={stylesRoot.containers.rowBetween}>
            <TouchableOpacity
              style={{ paddingHorizontal: stylesRoot.spacing.s }}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              <Foundation name="paint-bucket" size={24} color={theme.tint} />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="market/index"
        options={{
          title: "Carrinho",
        }}
      />
      <Stack.Screen
        name="market/categories"
        options={{
          title: "Categorias",
        }}
      />
      <Stack.Screen
        name="market/[category]"
        options={{
          title: "Produtos",
        }}
      />
      <Stack.Screen
        name="market/[category]/[id]"
        options={{
          title: "Detalhes do Produto",
        }}
      />
      <Stack.Screen
        name="auth/login"
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="auth/register"
        options={{
          title: "Criar conta",
        }}
      />
      <Stack.Screen
        name="wallet/index"
        options={{
          title: "Carteira",
        }}
      />
      <Stack.Screen
        name="purchases/index"
        options={{
          title: "Minhas Compras",
        }}
      />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AppContextProvider>
      <RootLayoutNav />
    </AppContextProvider>
  );
}
