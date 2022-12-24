import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = { value: { username: null } }
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.value = action.payload
        },

        logoutUser: (state) => {
            state.value = initialState.value
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})