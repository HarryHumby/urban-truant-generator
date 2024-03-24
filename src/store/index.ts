// ** Toolkit imports
import { combineReducers, configureStore, AnyAction } from "@reduxjs/toolkit";
// @ts-ignore
import { persistReducer } from "redux-persist";
// @ts-ignore
import storage from "redux-persist/lib/storage";
// @ts-ignore
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// ** Reducers
const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2
};
const rootReducer = combineReducers({

});
const pReducer = persistReducer<any, any>(persistConfig, rootReducer) as typeof rootReducer;
const reducerProxy = (state: any, action: AnyAction) => {
    if (action.type === "reset") {
        storage.removeItem("persist:root");

        state = {} as RootState;
    }
    return pReducer(state, action);
};
export const store = configureStore({
    reducer: reducerProxy,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
