
import { type Pagination, type ApiResponse } from "./commonTypes";
import { type Category } from "./categoriesTypes";

export interface Model {
    _id: string;
    name: string;
    description: string;
    categoryId: Pick<Category, "_id" | "categoryName">;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ModelVeritiesResponse extends ApiResponse<Model[]> {
    modelVerities: Model[];
    pagination: Pagination;
}


export interface ModelVerityResponse extends ApiResponse<Model> {
    data: Model;
}


export interface ModelPayload {
    name: string;
    description?: string;
    categoryId: string;
}
