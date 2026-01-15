import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


export const checkAdminCode = createAsyncThunk(
    'admin/checkAdminCode',
    async({admin,admincode,adminsoft},{rejectWithValue}) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}admin/checkCode`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    admin,admincode,adminsoft
                })
            })

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Verification failed')

            }
            const data = await response.json()
            toast.success("Validation Successful")
           
            return data;
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
);


const adminSlice = createSlice({
    name: 'admin',
    initialState:{
        loading:false,
        success:false,
        error:null,
    },
    reducers:{
        resetState:(state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkAdminCode.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(checkAdminCode.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
            state.error = null;
        })
        .addCase(checkAdminCode.rejected, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = action.payload;
        })
    }
})



export const {resetState} = adminSlice.actions;
export default adminSlice.reducer;