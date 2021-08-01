import { FETCH_ACTION } from "./FetchType"

export let initialdata = []

export const fetchAction = (index = initialdata) =>{
    let personlist;
    for(var i=0; i<localStorage.length; i++)  {
    personlist = JSON.parse(localStorage.getItem(localStorage.key(i)))
    index.push(personlist);
    }localStorage.clear();
    return{
        type: FETCH_ACTION,
        payload:index
    }
}
