/**
 * Mock data for the Home Screen discovery experience.
 * These interfaces mirror the Prisma schema shape where applicable.
 */

// ============================================
// Interfaces
// ============================================

export interface Package {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: string;
  price: number;
  tags: string[];
}

export interface Provider {
  id: string;
  name: string;
  rating: number;
  reviews: string;
  verified: boolean;
  packages: Package[];
}

export interface FilterOption {
  id: string;
  label: string;
  active: boolean;
  dropdown?: boolean;
}

export interface PromoBanner {
  id: string;
  title: string;
  image: string;
  overlayText?: string;
}

// ============================================
// Mock Data
// ============================================

export const filterOptions: FilterOption[] = [
  { id: '1', label: 'Vegan 🌱', active: false },
  { id: '2', label: 'Halal ✅', active: true },
  { id: '3', label: 'Kalori', active: false, dropdown: true },
  { id: '4', label: '20 - 40 Gram', active: false },
];

export const promoBanners: PromoBanner[] = [
  {
    id: 'promo-1',
    title: 'HALLOWEEN PROMO 👻',
    image: 'https://images.unsplash.com/photo-1508264165352-258db2ebd59b?w=600',
    overlayText: 'UP TO 20%!!!',
  },
  {
    id: 'promo-2',
    title: 'RAMADAN SPECIAL 🌙',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
    overlayText: 'DISKON 15%',
  },
  {
    id: 'promo-3',
    title: 'NEW YEAR DEAL 🎉',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600',
    overlayText: 'HEMAT 20%',
  },
];

export const cateringData: Provider[] = [
  {
    id: 'provider-1',
    name: 'Catering Kamu',
    rating: 4.8,
    reviews: '4,2RB',
    verified: true,
    packages: [
      {
        id: 'pkg-1',
        name: 'Weightloss',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        rating: 4.7,
        reviews: '4,2RB',
        price: 800000,
        tags: ['Vegan', 'Halal'],
      },
      {
        id: 'pkg-2',
        name: 'Muscle Gain+',
        image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400',
        rating: 4.7,
        reviews: '4,2RB',
        price: 800000,
        tags: ['Vegan', 'Halal'],
      },
    ],
  },
  {
    id: 'provider-2',
    name: 'Diet Sehat Studio',
    rating: 4.6,
    reviews: '2,1RB',
    verified: true,
    packages: [
      {
        id: 'pkg-3',
        name: 'Keto Plan',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        rating: 4.5,
        reviews: '1,8RB',
        price: 750000,
        tags: ['Keto', 'Halal'],
      },
      {
        id: 'pkg-4',
        name: 'Balanced Meals',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
        rating: 4.8,
        reviews: '3,5RB',
        price: 650000,
        tags: ['Balanced', 'Halal'],
      },
    ],
  },
];

export const locations = [
  'Bandung, Gedebage',
  'Bandung, Dago',
  'Bandung, Buah Batu',
  'Jakarta, Selatan',
  'Jakarta, Barat',
];
