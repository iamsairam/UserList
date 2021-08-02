import { REORDER_ACTION } from "./ReorderType"
export const reorderAction = (sourceIndex,destinationIndex)=>{
    return{
        type: REORDER_ACTION,
        source:sourceIndex,
        destination:destinationIndex
    }
}