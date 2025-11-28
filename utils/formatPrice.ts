export function formatPrice(value: number | string): string {
  const numValue =
    typeof value === "string" ? parseFloat(value.replace(",", ".")) : value;

  if (isNaN(numValue)) {
    return "0,00";
  }

  const formatted = numValue.toFixed(2);

  const [integerPart, decimalPart] = formatted.split(".");

  const integerWithSeparators = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  return `${integerWithSeparators},${decimalPart}`;
}

export function parsePrice(priceString: string): number {
  return parseFloat(priceString.replace(/\./g, "").replace(",", "."));
}
