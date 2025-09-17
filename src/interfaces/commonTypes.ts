// src/interfaces/commonTypes.ts

// Generic Pagination info
export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Generic API Response (for consistent backend responses)
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    [key: string]: any;
}
