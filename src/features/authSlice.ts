import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getStoreLocal, setStoreLocal } from "../helpers/helpRedux"
import { AuthState, User } from "../types/insterfaces/Auth"

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
        login_ok: (state, action: PayloadAction<AuthState>) => {
            setStoreLocal('access', action.payload.access ? action.payload.access : '');
            setStoreLocal('refresh', action.payload.refresh ? action.payload.refresh : '');
            state.isAuthenticated = true
            state.access = getStoreLocal('access')
            state.refresh = getStoreLocal('refresh')
        },
        fail_clear: (state) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.isAuthenticated = false
            state.access = null
            state.refresh = null
            state.user = null
        },
        on_loading: (state) => {
            state.loading = true
        },
        off_loading: (state) => {
            state.loading = false
        },
        loaded_user: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        fail_user: (state) => {
            state.user = null
        },
        authenticated_ok: (state) => {
            state.isAuthenticated = true
        },
    
        refresh_ok: (state, action: PayloadAction<AuthState>) => {
            setStoreLocal('access', action.payload.access ? action.payload.access : '');
            state.access = getStoreLocal('access')
        },

    }
});


export const {
    login_ok,
    fail_clear,
    on_loading,
    off_loading,
    loaded_user,
    fail_user,
    authenticated_ok,
    refresh_ok,
} = authSlice.actions


export default authSlice.reducer
