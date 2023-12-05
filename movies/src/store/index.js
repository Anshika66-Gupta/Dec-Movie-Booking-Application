import { configureStore, createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {isLoggedIn: false},

    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            localStorage.removeItem("userId")
            state.isLoggedIn = false;
        }
    }
});

const adminSlice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false},

    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            localStorage.removeItem("adminId")
            localStorage.removeItem("token")
            state.isLoggedIn = false;
        }
    }
});

export const adminActions = adminSlice.actions;
export const userActions = userSlice.actions; 

// storing of the configurations for the users and admins
export const store = configureStore({
    reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer
    }
});