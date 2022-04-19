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
                'Authorization': `JWT ${getStoreLocal('access') || 'default'}`,
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
            dispatch(setAlert("WELCOME", "green"));
            try {
                dispatch(load_user());

            } catch (error) {
                dispatch(fail_user());
            }
            dispatch(off_loading());

        } else {
            dispatch(setAlert("Credinciales incorectas", "red"));

            dispatch(fail_clear());
            dispatch(off_loading());
        }

    } catch (err) {
        dispatch(setAlert("Credinciales incorectas", "red"));

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


export const signup = (first_name: string, last_name: string, email: string, password: string, re_password: string) => async (dispatch: AppDispatch) => {
    dispatch(on_loading());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        re_password
    })
    dispatch(fail_clear());

    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/`, body, config);

        if (res.status === 201) {
            dispatch(setAlert("Te enviamos un correo, por favor activa tu cuenta. Revisa el correo de spam", "green"))
        } else {
            dispatch(setAlert('Error al crear cuenta', 'red'));
        }
        dispatch(off_loading());

    } catch (err) {
        dispatch(off_loading());
        dispatch(setAlert('Error conectando con el servidor, intenta mas tarde.', 'red'));
    }


}
export const activate = (uid: (string | string[] | undefined), token: (string | string[] | undefined)) => async (dispatch: AppDispatch) => {
    dispatch(on_loading());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        uid,
        token
    });

    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/activation/`, body, config);

        if (res.status === 204) {
            dispatch(setAlert("Cuenta activada!", "green"))

        } else {
            dispatch(setAlert("Error al activar la cuenta", "red"))
        }

        dispatch(off_loading());

    } catch (err) {
        dispatch(setAlert("Error al conectar al servidor", "red"))

        dispatch(off_loading());

    }
}

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(fail_clear());
    dispatch(setAlert('Succesfully logged out', 'green'));


}

export const reset_password = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(on_loading());
    const body = JSON.stringify({ email });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/reset_password/`, body, config);
        if (res.status === 204) {
            dispatch(setAlert("Te enviamos un correo, revisa tu bandeja", "green"))
        } else {
            dispatch(setAlert("El correo no esta registrado", "red"))
        }
        dispatch(off_loading());
    } catch (err) {
        dispatch(setAlert("Error en el servidor, intente mas tarde", "red"))
        dispatch(off_loading());

    }
}
export const reset_password_confirm = (uid: (string | string[] | undefined), token: (string | string[] | undefined),new_password:string,re_new_password:string) => async (dispatch: AppDispatch) => {
    dispatch(on_loading());
    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (new_password ===re_new_password){
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/reset_password_confirm/`,body,config)

        if (res.status===204){
            dispatch(setAlert("Tu clave ha sido cambiada con exito", "green"))
        }else{
            dispatch(setAlert("Error en el servidor", "red"))
        }
        dispatch(off_loading());

    }else{
        dispatch(setAlert("Las contraseñas no coinciden", "red"))
        dispatch(off_loading());
    }
}