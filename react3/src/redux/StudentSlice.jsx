import {createSlice} from '@reduxjs/toolkit'

let StudentSlice = createSlice({
    name : "student",
    initialState : ["rohit", "vijay", "ajay"],
    reducers : {
        addStu(){
            console.log("******")
        }
    }
});

export let {addStu} = StudentSlice.actions

export default StudentSlice.reducer;