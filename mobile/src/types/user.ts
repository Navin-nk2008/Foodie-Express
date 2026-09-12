export interface Address {
  id?: string;
  title: string;
  addressLine: string;
  area?: string;
  city?: string;
  isDefault?: boolean;
  note?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  addresses: Address[];
  favorites?: number[];
}
