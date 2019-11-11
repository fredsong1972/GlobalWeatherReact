import { Country } from "../types/Country";
import { AppActions } from "../types/actions";
import * as Actions from "../types/actions";

const countriesReducerDefaultState: Country [] = [];

const countriesReducer = (state = countriesReducerDefaultState, action: AppActions): Country [] => {
    switch (action.type) {
        case Actions.GET_COUNTRIES_SUCCESS:
            const data = action.payload.data;
            return data as Country [];
        case Actions.GET_COUNTRIES_FAIL:
            return state;
        default:
            return state;
    }
};

export { countriesReducer };