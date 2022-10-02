import { AxiosError } from 'axios';

export type AxiosErrorData = {
    errors: Record<string, string[]>;
    // Some validations return a single error
    error: string;
    message?: string;
    // Some api return a code state error
    code?: string;
};

export type AxiosValidationErrors = AxiosError<AxiosErrorData>;

export enum HomeTab {
    'NOW_PLAYING' = 'now_playing',
    'POPULAR' = 'popular',
    'TOP_RATED' = 'top_rated',
}

export enum ViewMode {
    'GRID' = 'grid',
    'LIST' = 'list',
}