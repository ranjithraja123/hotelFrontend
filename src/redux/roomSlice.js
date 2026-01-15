import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getRoomById = createAsyncThunk(
    'room/getRoomId',
    async ({ roomid }, { rejectWithValue }) => {
        console.log(roomid, "rididi");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}rooms/getRoomsById`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: roomid
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data,"data,111")
                // toast.success("Validation Successful");
                return data;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Getting room failed');
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const getRoomid = createSlice({
    name: 'room',
    initialState: {
        loading: false,
        success: false,
        error: null,
        data: null,  // Add this to store the room data
    },
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.data = null;  // Reset the data as well
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getRoomById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getRoomById.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
            state.error = null;
        })
        .addCase(getRoomById.rejected, (state, action) => {
            state.loading = false;
            state.success = false;  // Ensure success is false in case of failure
            state.error = action.payload;
        });
    }
});

export const { resetState } = getRoomid.actions;
export default getRoomid.reducer;
