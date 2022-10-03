import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, ProgressBar, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { setToastMessage, setToastVisibility } from 'redux/toastSlice';
import { useAppDispatch } from 'utils/store';
import { getErrorMessage } from 'utils/getErrorMessage';
import { api } from 'utils/api';
import MainLayout from 'layouts/MainLayout';
import MovieDetailsSkeleton from 'components/Loader/Skeleton/MovieDetailsSkeleton';
import { IMAGE_BASE_URL } from 'pages/Home/components/MovieItem';
import { MovieListItem, ThumbnailSize } from 'types/Movie';


const MovieDetails = () => {
    const [movie, setMovie] = useState<MovieListItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id: movieId } = useParams();

    const movieGenres = useMemo(() => movie?.genres.reduce(
        (acc, cur, index) => acc + cur.name + (index < (movie?.genres.length || 0) - 1 ? ',' : ''), ''), [movie?.genres]
    );

    const fetchMovieDetails = useCallback(async () => {
        setIsLoading(true);

        const response = await api
            .get<MovieListItem>(`movie/${movieId}`)
            .catch((error) => {
                const message = getErrorMessage(error);

                if (!message) {
                    return;
                }

                dispatch(setToastVisibility(true));
                dispatch(setToastMessage(message));
            });

        setIsLoading(false);

        if (!response?.data) {
            return;
        }

        setMovie(response.data);
    }, [dispatch, movieId]);

    useEffect(() => {
        void fetchMovieDetails();
    }, [fetchMovieDetails]);

    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <MainLayout backgroundColor="#e5e5e5">
            {movie && (
                <Row className="p-3">
                    <Col lg="3">
                        <Button
                            variant="primary"
                            onClick={() => navigate(-1)}
                            className="mb-3"
                        >
                            Back
                        </Button>
                        <div className="d-flex justify-content-center align-items-center">
                            <img
                                src={`${IMAGE_BASE_URL + ThumbnailSize.W342}${movie.poster_path}`}
                                alt={movie.title}
                                className="img-fluid"
                            />
                        </div>
                    </Col>
                    <Col lg="9">
                        <h2 className="fw-bold mt-3">{movie.title}</h2>
                        <div className="d-flex align-items-center fs-6 mb-3">
                            <span className="me-2">{movie.release_date}</span>
                            | <span className="ms-2 me-2">{movieGenres}</span>
                            | <span className="ms-2">{movie.status}</span>
                        </div>

                        <ProgressBar striped variant="primary" now={(movie.vote_average || 0) / 10 * 100} />
                        <figcaption className="text-primary mt-2">
                            Vote by {movie.vote_count} people
                        </figcaption>

                        <div className="fs-6 fst-italic text-secondary mt-4">{movie.tagline}</div>

                        <h5 className="mt-3">Overview</h5>
                        <div className="fs-6">{movie.overview}</div>

                        <Row>
                            <Col>
                                <h5 className="mt-3">Budget</h5>
                                <div className="fs-6">
                                    {movie.budget > 0 ? formatCurrency.format(movie.budget) : '-'}
                                </div>
                            </Col>
                            <Col>
                                <h5 className="mt-3">Revenue</h5>
                                <div className="fs-6">
                                    {movie.revenue > 0 ? formatCurrency.format(movie.revenue) : '-'}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
            {isLoading && <MovieDetailsSkeleton />}
        </MainLayout>
    );
};

export default MovieDetails;