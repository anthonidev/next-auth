import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { AppDispatch } from "../app/store"
import { getStoreLocal, setStoreLocal } from "../helpers/helpRedux"


interface AuthState {
    access: (string | null)
    refresh: (string | null)
    isAuthenticated: boolean
    user: User
    loading: boolean

}

interface User {
    id: number,
    email: string,
    first_name: string
    last_name: string
    get_full_name: string
    get_short_name: string
}

const initialState: AuthState = {
    access: getStoreLocal('access'),
    refresh: getStoreLocal('refresh'),
    isAuthenticated: false,
    user: {
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
        get_full_name: '',
        get_short_name: ''
    },
    loading: false
}

export const authSlice = createSlice({
    name: "authenticated",
    initialState,
    reducers: {
        auth_loading: (state) => {
            state.loading = true
        },
        reset: (state) => {
            state
        },
        remove_auth_loading: (state) => {
            state.loading = false
        },
        user_loading: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        authenticated_ok: (state) => {
            state.isAuthenticated = true
        },
        login_ok: (state, action: PayloadAction<AuthState>) => {
            setStoreLocal('access', action.payload.access ? action.payload.access : '');
            setStoreLocal('refresh', action.payload.refresh ? action.payload.refresh : '');

            state.isAuthenticated = true
            state.access = getStoreLocal('access')
            state.refresh = getStoreLocal('refresh')
        },
        refresh_ok: (state, action: PayloadAction<AuthState>) => {
            setStoreLocal('access', action.payload.access ? action.payload.access : '');
            state.access = getStoreLocal('access')
        },
        logout: (state) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.isAuthenticated = false
            state.access = null
            state.refresh = null
            state.user = { id: 0, email: '', first_name: '', last_name: '', get_full_name: '', get_short_name: '' }

        },
        clear: (state) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.isAuthenticated = false
            state.access = null
            state.refresh = null
            state.user = { id: 0, email: '', first_name: '', last_name: '', get_full_name: '', get_short_name: '' }

        },
    }
});


export const {
    auth_loading,
    remove_auth_loading,
    user_loading,
    authenticated_ok,
    login_ok,
    refresh_ok,
    logout,
    clear,
    reset
} = authSlice.actions


//   /jwt/verify/
export const check_authenticated = () => async (dispatch: AppDispatch) => {
    console.log(getStoreLocal('access'))
    if (getStoreLocal('access')) {
        console.log("Chek");
        
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
                dispatch(clear());
            }

        } catch (err) {
          
        }

    }
};



export const load_user = () => async (dispatch: AppDispatch) => {
    if (getStoreLocal('access')) {
        console.log(getStoreLocal('access'));
        
        const config = {
            headers: {
                'Authorization': `JWT ${getStoreLocal('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`, config)
            console.log('data', res.data)
            dispatch(user_loading(res.data));

        } catch (err) {
           

        }

    } else {
       
    }
}

// /jwt/create/
export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        password
    });
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/create/`, body, config);

        if (res.status === 200) {

            dispatch(login_ok(res.data));
            try {
                dispatch(load_user());

            } catch (error) {
                dispatch(clear());

            }
        } else {
            dispatch(clear());
            dispatch(remove_auth_loading());
        }

    } catch (err) {
        dispatch(clear());
        dispatch(remove_auth_loading());
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
                dispatch(clear());

            }

        } catch (err) {
            dispatch(clear());

        }
    } else {
    }
}




export default authSlice.reducer