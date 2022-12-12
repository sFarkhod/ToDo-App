import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import logger from "redux-logger";
import { rootReducers } from "./reducer";

export default configureStore({
    reducer: rootReducers
}, composeWithDevTools(applyMiddleware(logger)));