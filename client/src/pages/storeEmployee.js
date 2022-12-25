import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: { employeeDetails: {} } }
export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        loginEmployee: (state, action) => {
            state.value = action.payload
        },

        logoutEmployee: (state) => {
            state.value = initialState.value
        }
    }
})

export const { loginEmployee, logoutEmployee } = employeeSlice.actions

export default employeeSlice.reducer