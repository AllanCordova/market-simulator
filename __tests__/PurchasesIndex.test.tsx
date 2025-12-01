import Purchases from "@/app/purchases";
import { useAppContext } from "@/contexts/userContext";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

jest.mock("@/contexts/userContext", () => ({
  useAppContext: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@expo/vector-icons/MaterialIcons", () => "MaterialIcons");

jest.mock("@/components/TabsFooter", () => "TabsFooter");

describe("Purchases Component", () => {
  const mockTheme = {
    background: "#fff",
    text: "#000",
    cardBackground: "#f0f0f0",
    inputPlaceholder: "#999",
    priceText: "green",
    buttonBackground: "blue",
    buttonText: "#fff",
  };

  const mockPurchases = [
    {
      id: "1",
      productName: "Arroz Integral",
      price: 25.5,
      date: new Date("2025-11-20T10:00:00"),
      categoryId: "food",
      image: "http://example.com/rice.jpg",
    },
    {
      id: "2",
      productName: "Feijão Preto",
      price: 10.0,
      date: new Date("2025-11-21T14:30:00"),
      categoryId: "food",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
  });

  it("deve renderizar o estado vazio corretamente", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      theme: mockTheme,
      purchases: [],
    });

    const { getByText } = render(<Purchases />);

    expect(getByText("Nenhuma compra realizada")).toBeTruthy();
    expect(getByText("Ver receitas")).toBeTruthy();
  });

  it("deve navegar para o mercado ao clicar no botão de estado vazio", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      theme: mockTheme,
      purchases: [],
    });

    const { getByText } = render(<Purchases />);
    const button = getByText("Ver receitas");

    fireEvent.press(button);

    expect(mockPush).toHaveBeenCalledWith("/market/food");
  });

  it("deve renderizar a lista de compras e os totais corretamente", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      theme: mockTheme,
      purchases: mockPurchases,
    });

    const { getByText } = render(<Purchases />);

    expect(getByText("Arroz Integral")).toBeTruthy();
    expect(getByText("Feijão Preto")).toBeTruthy();

    expect(getByText("2")).toBeTruthy();

    expect(getByText("R$ 35,50")).toBeTruthy();
  });

  it("deve navegar para os detalhes da compra ao clicar em um item", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      theme: mockTheme,
      purchases: mockPurchases,
    });

    const { getByText } = render(<Purchases />);
    const item = getByText("Arroz Integral");

    fireEvent.press(item);

    expect(mockPush).toHaveBeenCalledWith("/market/food/1");
  });

  it("deve formatar a data corretamente no item", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      theme: mockTheme,
      purchases: [mockPurchases[0]],
    });

    const { getByText } = render(<Purchases />);

    const dateText = getByText(/20\/11\/2025/);
    expect(dateText).toBeTruthy();
  });
});
