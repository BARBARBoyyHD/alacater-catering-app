import { create } from 'zustand';
import { Package } from '@/src/data/mockData';

export type MealPlan = 'Lunch' | 'Dinner' | 'Both';
export type Duration = 5 | 10 | 20 | 60;

export interface OrderDraft {
  package: Package | null;
  quantity: number;
  startDate: Date;
  duration: Duration;
  mealPlan: MealPlan;
  notes: string;
}

interface OrderStore {
  orderDraft: OrderDraft;
  
  // Actions
  setPackage: (pkg: Package) => void;
  setQuantity: (quantity: number) => void;
  setStartDate: (date: Date) => void;
  setDuration: (duration: Duration) => void;
  setMealPlan: (plan: MealPlan) => void;
  setNotes: (notes: string) => void;
  resetOrder: () => void;
}

const initialOrderDraft: OrderDraft = {
  package: null,
  quantity: 1,
  startDate: new Date(),
  duration: 5,
  mealPlan: 'Both',
  notes: '',
};

export const useOrderStore = create<OrderStore>()((set) => ({
  orderDraft: initialOrderDraft,

  setPackage: (pkg) =>
    set((state) => ({
      orderDraft: { ...state.orderDraft, package: pkg },
    })),

  setQuantity: (quantity) =>
    set((state) => ({
      orderDraft: { ...state.orderDraft, quantity },
    })),

  setStartDate: (date) =>
    set((state) => ({
      orderDraft: { ...state.orderDraft, startDate: date },
    })),

  setDuration: (duration) =>
    set((state) => ({
      orderDraft: { ...state.orderDraft, duration },
    })),

  setMealPlan: (plan) =>
    set((state) => ({
      orderDraft: { ...state.orderDraft, mealPlan: plan },
    })),

  setNotes: (notes) =>
    set((state) => ({
      orderDraft: { ...state.orderDraft, notes },
    })),

  resetOrder: () => set({ orderDraft: initialOrderDraft }),
}));
