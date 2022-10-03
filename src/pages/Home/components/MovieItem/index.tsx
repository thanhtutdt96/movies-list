import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import { MovieListItem, ThumbnailSize } from 'types/Movie';
import 'pages/Home/components/MovieItem/styles.scss';
import { ViewMode } from 'types/Common';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

interface IProps {
    movie: MovieListItem;
    imageWidth?: ThumbnailSize;
    viewMode?: ViewMode;
    isListViewForced?: boolean;
}

const MovieItem: React.FC<IProps> = ({movie, imageWidth = ThumbnailSize.W342, viewMode = ViewMode.GRID, isListViewForced}) => {
    const releaseDate = useMemo(() => {
        return new Date(movie.release_date).toLocaleDateString('en-us', {
            year: 'numeric', month: 'short', day: 'numeric',
        });
    }, [movie.release_date]);

    return (
        <Card className={`h-100 shadow-sm cursor-pointer movie-item ${viewMode === ViewMode.LIST || isListViewForced ? 'flex-row' : ''}`}>
            <Card.Img
                className={`${viewMode === ViewMode.LIST || isListViewForced ? 'movie-item__image--list w-auto' : ''}`}
                variant="top"
                loading="lazy"
                src={movie.poster_path ? `${IMAGE_BASE_URL + imageWidth}${movie.poster_path}` : ''}
                alt={movie.title}
            />
            <Card.Body>
                <Card.Title className="ellipsis-2-lines fw-bold movie-item__title">
                    {movie.title}
                </Card.Title>
                <Card.Text className="text-secondary">{releaseDate}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MovieItem;