import { axios } from 'utils/api';
import { AxiosErrorData, AxiosValidationErrors } from 'types/Common';

type ApiError = {
    message?: string;
};

type ErrorUtility = (
    error?: AxiosValidationErrors | ApiError | string,
) => string | undefined;

const defaultErrorMessage = 'Error';

export const getErrorMessage: ErrorUtility = (error) => {
    let message = '';

    if (axios.isCancel(error)) {
        return;
    }

    if (axios.isAxiosError(error)) {
        // Unauthenticated user, do not show any error
        if (error?.response?.status === 401) {
            return;
        }

        // The server responded with a status code that falls out of the range of 2xx
        const axiosErrorData = error?.response?.data as AxiosErrorData;

        if (axiosErrorData) {
            if (axiosErrorData.message) {
                message = axiosErrorData.message;
            } else if (axiosErrorData.error) {
                message = axiosErrorData.error;
            } else if (axiosErrorData?.errors) {
                const { errors } = axiosErrorData;

                message = Object.keys(errors).map((errorField) => errors[errorField].join(', ')).join(' ');
            }

            // The server responded with a status code that falls in the range of 4xx
        } else if (error?.request) {
            // The request was made but no response was received
            message = defaultErrorMessage;
        }
    } else if (typeof error === 'string') {
        message = error;
    } else if (error?.message) {
        message = error.message;
    }

    return message;
};
