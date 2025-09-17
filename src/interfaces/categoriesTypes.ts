import { type Pagination, type ApiResponse } from "./commonTypes";

export interface Category {
    _id: string;
    categoryName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CategoriesResponse extends ApiResponse<Category[]> {
    categories: Category[];
    pagination: Pagination;
}

export interface CategoryResponse extends ApiResponse<Category> {
    data: Category;
}

export interface CategoryPayload {
    categoryName: string;
    description?: string;
}
