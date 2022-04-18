import axios from "axios";
import { AppDispatch } from "../app/store";
import { authenticated_ok, fail_clear, fail_user, loaded_user, login_ok, off_loading, on_loading, refresh_ok } from "../features/authSlice";
import { getStoreLocal } from "../helpers/helpRedux";
import { setAlert } from "./alert";

//   /jwt/verify/
export const check_authenticated = () => async (dispatch: AppDispatch) => {
    if (getStoreLocal('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({
            token: getStoreLocal('access')
        });

        try {

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/verify/`, body, config);

            if (res.status === 200) {
                dispatch(authenticated_ok());
            } else {
                dispatch(fail_clear());
            }

        } catch (err) {
            dispatch(fail_clear());
        }
    }
};



export const load_user = () => async (dispatch: AppDispatch) => {
    if (getStoreLocal('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${getStoreLocal('access')||'default'}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`, config)
            if (res.status === 200) {

                dispatch(loaded_user(res.data));
            } else {
                dispatch(fail_user());
            }
        } catch (err) {
            dispatch(fail_user());
        }

    } else {
        dispatch(fail_user());
    }
}

// /jwt/create/
export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(on_loading());

    const config = { headers: { 'Content-Type': 'application/json' } };

    const body = JSON.stringify({
        email,
        password
    });
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/create/`, body, config);

        if (res.status === 200) {

            dispatch(login_ok(res.data));
            dispatch(setAlert("WELCOME","green"));
            try {
                dispatch(load_user());

            } catch (error) {
                dispatch(fail_user());
            }
            dispatch(off_loading());

        } else {
            dispatch(setAlert("Credinciales incorectas","red"));

            dispatch(fail_clear());
            dispatch(off_loading());
        }

    } catch (err) {
        dispatch(setAlert("Credinciales incorectas","red"));

        dispatch(fail_clear());
        dispatch(off_loading());
    }
}


export const refresh = () => async (dispatch: AppDispatch) => {
    if (getStoreLocal('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({
            refresh: getStoreLocal('refresh')
        });

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/refresh/`, body, config);

            if (res.status === 200) {

                dispatch(refresh_ok(res.data));
            } else {
                dispatch(fail_clear());

            }

        } catch (err) {
            dispatch(fail_clear());

        }
    } else {
        dispatch(fail_clear());
    }
}



