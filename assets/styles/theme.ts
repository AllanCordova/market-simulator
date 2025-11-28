// constants/themes.ts (ou onde você guarda seus temas)

export interface ThemeColors {
  background: string;
  text: string;
  primary: string;

  buttonBackground: string;
  buttonText: string;

  inputBackground: string;
  inputText: string;
  inputPlaceholder: string;
  inputBorder: string;

  tint: string;

  // NOVAS PROPRIEDADES ADICIONADAS
  cardBackground: string;
  priceText: string;
}

export const themes: Record<"light" | "dark", ThemeColors> = {
  light: {
    background: "#FFFFFF",
    text: "#121212",
    primary: "#69F0AE",

    buttonBackground: "#69F0AE",
    buttonText: "#004D40",

    inputBackground: "#F5F5F5",
    inputText: "#121212",
    inputPlaceholder: "#9E9E9E",
    inputBorder: "#E0E0E0",

    tint: "#004D40",

    // Novos
    cardBackground: "#F9F9F9", // Um pouco diferente do fundo branco total
    priceText: "#00695C", // Um verde/teal escuro para dinheiro
  },
  dark: {
    background: "#121212",
    text: "#FFFFFF",
    primary: "#AB63DB",

    buttonBackground: "#AB63DB",
    buttonText: "#FFFFFF",

    inputBackground: "#1E1E1E",
    inputText: "#FFFFFF",
    inputPlaceholder: "#888888",
    inputBorder: "#333333",

    tint: "#FFFFFF",

    // Novos
    cardBackground: "#1E1E1E", // Combina com o input, destaca do fundo preto total
    priceText: "#69F0AE", // O verde neon do tema light fica ótimo para preço no dark
  },
};
