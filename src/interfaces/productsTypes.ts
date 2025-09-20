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
