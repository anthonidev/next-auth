import { AppDispatch } from "../app/store";
import { offAlert, onAlert } from "../features/alertSlice";

export const setAlert = (msg: (string | null), type: (string | null), timeout = 5000) => (dispatch: AppDispatch) => {
    dispatch(onAlert({ msg, type }));
    return setTimeout(() => dispatch(offAlert()), timeout);
}