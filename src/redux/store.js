import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth';
import productReducer from './features/product';
import electricReducer from './features/electric';

const reducer = {
    auth: authReducer,
    product: productReducer,
    electric: electricReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;