export type Product = {
  id: string;
  title: string;
  description: string;
  base64Image: string;
  price: number;
  strikePrice: number | null;
  checked: boolean;
};

export type NewProduct = Omit<Product, "id">;
