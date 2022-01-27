import { createSlice } from '@reduxjs/toolkit'

export const picturSlice = createSlice({
    name:'pictur',
    initialState: {
        list: []
    },

    reducers: {
        pictursFetch: (state, action) => {
            state.list = action.payload
        },
    }
})

export const selectPictur = state => state.pictur.list

export const {pictursFetch} = picturSlice.actions 

export default picturSlice.reducer