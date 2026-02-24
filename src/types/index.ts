export interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Voucher {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  description: string;
}
