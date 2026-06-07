export interface Product {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  manufacturer: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  specs: Record<string, string>;
  stockStatus: 'In Stock' | 'Lead Time 1-2 Weeks' | 'Lead Time 3-4 Weeks' | 'Enquire';
  priceRange?: string; // Industrial equipment usually uses quotes, but price estimate or bracket shows premium scale
  applications: string[];
  datasheetUrl?: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  customNotes?: string;
  selectedSize?: string;
  selectedMaterial?: string;
}

export interface RfqSubmission {
  rfqId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  projectDescription: string;
  items: QuoteItem[];
  attachedFileName?: string;
  submittedAt: string;
}
