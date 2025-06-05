export interface Product {
  id?: string;
  name: string;
  type: 'PRODUCT' | 'SERVICE';
  price: number;
  description: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
