export type PaginatedResult<DataType> = {
    page: number;
    results: DataType[];
    total_pages: number;
    total_results: number;
};