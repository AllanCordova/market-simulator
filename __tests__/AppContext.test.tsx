import AppContextProvider, { useAppContext } from "@/contexts/userContext";
import { act, renderHook } from "@testing-library/react-native";

jest.mock("@/utils/formatPrice", () => ({
  formatPrice: (val: number) => `R$ ${val.toFixed(2)}`,
}));

jest.mock("@/assets/styles/theme", () => ({
  themes: {
    light: { background: "#FFF", text: "#000" },
    dark: { background: "#000", text: "#FFF" },
  },
}));

describe("AppContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AppContextProvider>{children}</AppContextProvider>
  );

  it("deve iniciar com os valores padrão", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    expect(result.current.amount).toBe(0);
    expect(result.current.themeMode).toBe("dark");
    expect(result.current.purchases).toEqual([]);
  });

  it("deve incrementar e decrementar o valor (amount)", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.increment(10);
    });
    expect(result.current.amount).toBe(10);

    act(() => {
      result.current.decrement(4);
    });
    expect(result.current.amount).toBe(6);
  });

  it("não deve permitir valor negativo ao decrementar", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.increment(5);
      result.current.decrement(10);
    });

    expect(result.current.amount).toBe(0);
  });

  it("deve alternar o tema", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    expect(result.current.themeMode).toBe("dark");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.themeMode).toBe("light");
  });

  it("deve adicionar uma nova compra (purchase)", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    const newPurchase = {
      id: "1",
      productName: "Notebook",
      price: 2500,
    };

    act(() => {
      result.current.addPurchase(newPurchase);
    });

    expect(result.current.purchases).toHaveLength(1);
    expect(result.current.purchases[0].productName).toBe("Notebook");
    expect(result.current.purchases[0].date).toBeDefined();
    expect(result.current.purchases[0].date).toBeInstanceOf(Date);
  });

  it("deve gerar e cachear o preço de um produto (getProductPrice)", async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    const spy = jest.spyOn(Math, "random").mockReturnValue(0.5);

    let price: string = "";

    act(() => {
      price = result.current.getProductPrice("prod-1");
    });

    expect(price).toBe("R$ 32.50");

    expect(result.current.productPrices["prod-1"]).toBe("R$ 32.50");

    spy.mockRestore();
  });
});
