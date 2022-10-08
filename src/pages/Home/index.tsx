import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { CancelTokenSource } from 'axios';
import { debounce } from 'lodash-es';
import { api } from 'utils/api';
import { useAppDispatch } from 'utils/store';
import { getErrorMessage } from 'utils/getErrorMessage';
import { setToastMessage, setToastVisibility } from 'redux/toastSlice';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import MainLayout from 'layouts/MainLayout';
import MovieItem from 'pages/Home/components/MovieItem';
import Loader from 'components/Loader/Spinner';
import SearchInput from 'components/SearchInput';
import { MovieListItem } from 'types/Movie';
import { PaginatedResult } from 'types/PaginatedResult';
import { HomeTab, ViewMode } from 'types/Common';
import 'pages/Home/styles.scss';

const Home = () => {
    const [movieList, setMovieList] = useState<MovieListItem[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [totalPagesCount, setTotalPagesCount] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [tab, setTab] = useState(HomeTab.POPULAR);
    const [viewMode, setViewMode] = useState(ViewMode.GRID);
    const [filterChangeCount, setFilterChangeCount] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    const cancelToken = useRef<CancelTokenSource | undefined>(undefined);

    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dispatch = useAppDispatch();

    const allTabs = [
        {
            key: HomeTab.POPULAR,
            title: 'Popular',
        },
        {
            key: HomeTab.NOW_PLAYING,
            title: 'Now Playing',
        },
        {
            key: HomeTab.TOP_RATED,
            title: 'Top Rated',
        }
    ]

    const fetchMovies = useMemo(() => debounce(async () => {
        if (typeof cancelToken.current != typeof undefined) {
            cancelToken.current?.cancel();
        }

        // Save the cancel token for the current request
        cancelToken.current = axios.CancelToken.source();

        const params: { page: number; query?: string; } = {
            page: currentPage,
        }

        if (searchValue) {
            params.query = searchValue;
        }

        const response = await api
            .get<PaginatedResult<MovieListItem>>(searchValue ? 'search/movie' : `movie/${tab}`, {
                params,
                cancelToken: cancelToken.current?.token,
            }).catch((error) => {
                const message = getErrorMessage(error);

                if (!message) {
                    return;
                }

                dispatch(setToastVisibility(true));
                dispatch(setToastMessage(message));
            });

        if (!response?.data) {
            return;
        }

        setMovieList([...movieList, ...response.data.results]);
        setTotalPagesCount(response.data.total_pages);

        if (currentPage <= totalPagesCount) {
            setCurrentPage(prevState => prevState + 1);
        }
    }, 250), [dispatch, movieList, currentPage, totalPagesCount, tab, searchValue]);

    const refreshList = () => {
        setMovieList([]);
        setCurrentPage(1);
        setFilterChangeCount(prevState => prevState + 1);
    };

    const onSetTab = (tab: string | null) => {
        setTab(tab as HomeTab);
        setSearchValue('');
        refreshList();
    }

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        refreshList();
    }

    const clearSearchValue = () => {
        setSearchValue('');
        refreshList();
    };

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <MainLayout title="Movies">
            <Row className="mt-3 justify-content-center">
                <Col md={6}>
                    <SearchInput
                        value={searchValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e)}
                        onClear={clearSearchValue}
                    />
                </Col>
            </Row>

            <Tabs
                activeKey={tab}
                onSelect={(tab) => onSetTab(tab)}
                className="my-3"
            >
                {allTabs.map((item) => (
                    <Tab key={item.key} eventKey={item.key} title={item.title}>
                        <div className="d-none d-md-flex mt-3 justify-content-end">
                            <button
                                type="button"
                                className={`btn ${viewMode === ViewMode.GRID ? 'btn-primary' : 'btn-light'}`}
                                onClick={() => setViewMode(ViewMode.GRID)}
                            >
                                <i className="bi bi-grid" />
                            </button>
                            <button
                                type="button"
                                className={`btn ms-2 ${viewMode === ViewMode.LIST ? 'btn-primary' : 'btn-light'}`}
                                onClick={() => setViewMode(ViewMode.LIST)}
                            >
                                <i className="bi bi-list" />
                            </button>
                        </div>
                        <InfiniteScroll
                            key={filterChangeCount}
                            pageStart={1}
                            loadMore={fetchMovies}
                            hasMore={currentPage <= totalPagesCount}
                            loader={<Loader/>}
                            className="home__infinite-scroll"
                        >
                            <div className={`home__movie-list mb-4 ${viewMode === ViewMode.GRID ? 'home__movie-list--grid' : ''}`}>
                                {movieList.map((movie) => (
                                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                                        <MovieItem movie={movie} key={movie.id} viewMode={viewMode} isListViewForced={isMobile}/>
                                    </Link>
                                ))}
                            </div>
                        </InfiniteScroll>
                    </Tab>
                ))}
            </Tabs>
        </MainLayout>
    );
};

export default Home;