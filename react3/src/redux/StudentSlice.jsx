import {createSlice} from '@reduxjs/toolkit'

let StudentSlice = createSlice({
    name : "student",
    initialState : [],
    reducers : {
        addStu(state, action){
            state.push(action.payload)
        },
        delStu(state, action){
            return state.filter(item=>item.fname != action.payload)
        }
    }
});

export let {addStu, delStu} = StudentSlice.actions

export default StudentSlice.reducer;