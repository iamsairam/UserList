import { DELETE_ACTION } from "./ActionType"
export const deleteAction = index =>{
    return{
        type: DELETE_ACTION,
        payload:index
    }
}