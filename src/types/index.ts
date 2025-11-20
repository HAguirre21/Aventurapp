export interface Beach {
  id: string;
  name: string;
  location: string;
  description: string;
  category: 'familiar' | 'aventura' | 'relax' | 'todas';
  rating: number;
  reviewCount: number;
  priceFrom: number;
  images: string[];
  services: string[];
  active: boolean;
}

export interface Package {
  id: string;
  beachId: string;
  name: string;
  description: string;
  price: number;
  servicesIncluded: string[];
}

export interface Reservation {
  id: string;
  beachId: string;
  beachName: string;
  packageId: string;
  packageName: string;
  date: string;
  status: 'active' | 'completed' | 'cancelled';
  qrCode: string;
  totalPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'tourist' | 'admin';
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  beachId: string;
  rating: number;
  comment: string;
  images?: string[];
  date: string;
}
