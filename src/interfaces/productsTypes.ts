
export interface ProductColor {
  name: string;
  body: string;
  door?: string;
  images?: (string | File)[]; // <-- allow both URLs and File objects
  price?: number;
  mrp?: number;
  available?: boolean;
}

export interface ProductFormData {
  name: string;
  modelId: string;
  categoryId: string;
  description?: string;
  numberOfDoors: number;
  colorOptionsCount: number;
  price: number;
  mrp: number;
  material?: string;
  warranty?: string;
  paintType?: string;
  cardImage?: string | File; // <-- allow uploaded File as well
  colors?: ProductColor[];
}

export interface ProductsParams {
  search?: string;
  page?: number;
  limit?: number;
  categoryId?: string;
  modelId?: string;
}


// ---------------- COLOR OPTION ----------------
export interface ColorOption {
  name: string;
  body: string;
  door: string;
  images: string[];
  price: number;
  mrp: number;
  available: boolean;
}

// ---------------- MODEL ----------------
export interface Model {
  _id: string;
  name: string;
}

// ---------------- CATEGORY ----------------
export interface Category {
  _id: string;
  categoryName: string;
}

// ---------------- PRODUCT ----------------
export interface Product {
  _id: string;
  name: string;
  modelId: Model;
  categoryId: Category;
  createdBy: string;
  description: string;
  numberOfDoors: number;
  colorOptionsCount: number;
  price: number;
  mrp: number;
  material: string;
  warranty: string;
  paintType: string;
  colors: ColorOption[];
  cardImage: string;
  colorsAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ---------------- PAGINATION ----------------
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ---------------- RESPONSE ----------------
export interface ProductsResponse {
  success: boolean;
  message: string;
  products: Product[];
  pagination: Pagination;
}
