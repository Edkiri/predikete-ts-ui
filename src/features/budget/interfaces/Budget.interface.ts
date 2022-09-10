export interface Budget {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  unit: {
    id: number;
    name: string;
  };
}
