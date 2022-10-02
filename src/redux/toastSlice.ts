import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Defining our initialState's type
type initialStateType = {
    isToastVisible: boolean;
    toastMessage: string;
};

const initialState: initialStateType = {
    isToastVisible: false,
    toastMessage: '',
};

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToastVisibility: (state, action: PayloadAction<boolean>) => {
            state.isToastVisible = action.payload;
        },
        toggleToastVisibility: (state) => {
            state.isToastVisible = !state.isToastVisible;
        },
        setToastMessage: (state, action: PayloadAction<string>) => {
            state.toastMessage = action.payload;
        },
    },
});

// To able to use reducers we need to export them.
export const { setToastVisibility, toggleToastVisibility, setToastMessage } = toastSlice.actions;

export default toastSlice.reducer;