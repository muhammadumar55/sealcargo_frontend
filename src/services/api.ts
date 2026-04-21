const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface SearchParams {
  productType: string;
  material: string;
  quantity: string;
  budget: string;
  destination: string;
}

export interface Supplier {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  moq: number;
  price: number;
  verified: boolean;
  location: string;
  yearsInBusiness: number;
  responseRate: number;
  tags: string[];
  aiScore: number;
  qualityScore: number;
  reliabilityScore: number;
  priceScore: number;
  contactEmail: string;
  contactPhone: string;
  isQualified?: boolean;
}

export interface FilteredOut {
  name: string;
  reason: string;
  rating: number;
}

export interface SuppliersResult {
  topSuppliers: Supplier[];
  filteredOut: FilteredOut[];
  totalAnalyzed: number;
  qualifiedCount: number;
  fromCache?: boolean;
}

export interface CostItem {
  label: string;
  amount: number;
  details: string;
  color: string;
}

export interface CostBreakdownResult {
  supplier: string;
  quantity: number;
  destination: string;
  productType: string;
  items: CostItem[];
  totalCost: number;
  perUnit: number;
}

export interface LeadResult {
  success: boolean;
  leadId: string;
  message: string;
}

// ─── API Functions ────────────────────────────────────────────────────────────
export const api = {

  // Search suppliers
  searchSuppliers: async (params: SearchParams): Promise<SuppliersResult> => {
    const response = await fetch(`${BASE_URL}/api/suppliers/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error || `HTTP ${response.status}`);
    }
    return response.json();
  },

  // Chat with Grok AI
  chat: async (
    message: string,
    context: Record<string, unknown> = {}
  ): Promise<{ reply: string }> => {
    const response = await fetch(`${BASE_URL}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, context }),
    });
    if (!response.ok) throw new Error(`Chat failed: HTTP ${response.status}`);
    return response.json();
  },

  // Get dynamic cost breakdown for selected supplier
  getCostBreakdown: async (params: {
    supplier: Supplier;
    quantity: string;
    budget: string;
    destination: string;
    productType: string;
  }): Promise<CostBreakdownResult> => {
    const response = await fetch(`${BASE_URL}/api/ai/costs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error(`Cost calculation failed: HTTP ${response.status}`);
    return response.json();
  },

  // Contact supplier / save lead
  contactSupplier: async (params: {
    supplier: Supplier;
    notes: string;
    userName: string;
    userEmail: string;
    quantity: string;
    budget: string;
  }): Promise<LeadResult> => {
    const response = await fetch(`${BASE_URL}/api/ai/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error(`Contact failed: HTTP ${response.status}`);
    return response.json();
  },
};