import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// userProfile
// import ProfileReducer from "./auth/profile/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;