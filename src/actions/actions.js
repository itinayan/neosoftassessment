import { ADD_TASK } from "./actionTypes"

export const addToCart = (item) =>{
    return {type: ADD_TASK,payload:item}
}