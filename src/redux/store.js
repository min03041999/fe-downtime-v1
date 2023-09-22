import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth';
import productReducer from './features/product';

const reducer = {
    auth: authReducer,
    product: productReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;