import { ThemeColors, themes } from "@/assets/styles/theme";
import { formatPrice } from "@/utils/formatPrice";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export interface Purchase {
  id: string;
  productName: string;
  price: number;
  date: Date;
  image?: string;
  categoryId?: string;
}

export interface AppContextProps {
  user: string;
  amount: number;
  increment: (value: number) => void;
  decrement: (value: number) => void;
  purchases: Purchase[];
  addPurchase: (purchase: Omit<Purchase, "date">) => void;
  productPrices: Record<string, string>;
  getProductPrice: (productId: string, categoryId?: string) => string;

  theme: ThemeColors;
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export default function AppContextProvider({ children }: PropsWithChildren) {
  const parentCtx = useContext(AppContext);
  if (parentCtx) throw new Error("Nested AppContextProvider is not allowed!");

  const [amount, setAmount] = useState<number>(0);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [productPrices, setProductPrices] = useState<Record<string, string>>(
    {}
  );

  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");

  const getProductPrice = useCallback(
    (productId: string, categoryId?: string): string => {
      const key = categoryId ? `${categoryId}-${productId}` : productId;

      if (productPrices[key]) {
        return productPrices[key];
      }

      const min = 15;
      const max = 50;

      const priceNumber = Math.random() * (max - min) + min;
      const newPrice = formatPrice(priceNumber);

      setProductPrices((prev) => ({
        ...prev,
        [key]: newPrice,
      }));
      return newPrice;
    },
    [productPrices]
  );

  const appContext: AppContextProps = {
    user: "",
    amount: amount,
    purchases: purchases,
    productPrices: productPrices,
    getProductPrice: getProductPrice,
    increment: (value) => {
      setAmount((prev) => prev + value);
    },
    decrement: (value) => {
      setAmount((prev) => Math.max(prev - value, 0));
    },
    addPurchase: (purchase) => {
      setPurchases((prev) => [
        {
          ...purchase,
          date: new Date(),
        },
        ...prev,
      ]);
    },

    themeMode,
    theme: themes[themeMode],
    toggleTheme: () => {
      setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
    },
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(
      "useAppContext deve ser usado dentro de AppContextProvider!"
    );
  }

  return context;
}
