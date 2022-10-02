type Genres = {
    id: number;
    name: string;
}

export type MovieListItem = {
    id: number;
    budget: number;
    revenue: number;
    original_title: string;
    overview?: string;
    genres: Genres[];
    poster_path?: string;
    release_date: string;
    title: string;
    tagline?: string;
    status?: string;
    vote_average?: number;
    vote_count?: number;
}

export enum ThumbnailSize {
    W92 = 'w92',
    W154 = 'w154',
    W185 = 'w185',
    W342 = 'w342',
    W500 = 'w500',
    ORIGINAL = 'original',
}