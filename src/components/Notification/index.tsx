import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from 'utils/store';
import { setToastVisibility } from '../../redux/toastSlice';

const Notification = () => {
    const message = useAppSelector((state) => state.toast.toastMessage);
    const isToastVisible = useAppSelector((state) => state.toast.isToastVisible);
    const dispatch = useAppDispatch();

    return (
        <ToastContainer position="bottom-center" className="p-3">
            <Toast
                onClose={() => dispatch(setToastVisibility(false))}
                show={isToastVisible}
                delay={3000}
                autohide
                bg="danger"
            >
                <Toast.Body className="text-white">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default Notification;