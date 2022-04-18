import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AlertState } from "../types/insterfaces/Alert"


const initialState: AlertState = {
    msg: null,
    type: null
}

export const alertSlice = createSlice({
    name: "authenticated",
    initialState,
    reducers: {
        onAlert: (state, action: PayloadAction<AlertState>) => {
            state.msg = action.payload.msg
            state.type = action.payload.type
        },
        offAlert: (state) => {
            state.msg = null
            state.type = null
        }
    }
});


export const {
    onAlert,
    offAlert
} = alertSlice.actions


export default alertSlice.reducer
