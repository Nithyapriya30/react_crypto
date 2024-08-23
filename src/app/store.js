import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoapi";
import { coinGeckoApi } from "../services/exchangeApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";


export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware)
      .concat(coinGeckoApi.middleware),
});
