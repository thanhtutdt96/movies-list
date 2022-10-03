import React from 'react';
import { Col, Placeholder, ProgressBar, Row } from 'react-bootstrap';
import 'components/Loader/Skeleton/MovieDetailsSkeleton/styles.scss';

const MovieDetailsSkeleton = () => {
    return (
        <Row className="p-3">
            <Col lg="3" className="d-flex flex-column">
                <Placeholder.Button variant="primary" xs={3} className="mb-3" />
                <div className="d-flex justify-content-center flex-fill">
                    <img
                        src="http://placekitten.com/300/200"
                        alt="Placeholder"
                        className="img-fluid h-100 movie-details-skeleton__img"
                    />
                </div>
            </Col>
            <Col lg="9">
                <Placeholder as="h2" animation="glow">
                    <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>

                <Placeholder as={ProgressBar} bg="primary" animation="glow" className="mb-4" />
                <Placeholder animation="glow">
                    <Placeholder xs={4} />
                </Placeholder>

                <Placeholder as="h5" animation="glow" className="mt-3">
                    <Placeholder xs={2} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                    <Placeholder xs={12} />
                    <Placeholder xs={12} />
                </Placeholder>

                <Row>
                    <Col>
                        <Placeholder as="h5" animation="glow" className="mt-3">
                            <Placeholder xs={4} />
                        </Placeholder>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                    </Col>
                    <Col>
                        <Placeholder as="h5" animation="glow" className="mt-3">
                            <Placeholder xs={4} />
                        </Placeholder>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default MovieDetailsSkeleton;