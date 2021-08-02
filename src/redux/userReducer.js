import {DELETE_ACTION} from './ActionType'
import {FETCH_ACTION} from './FetchType'
import { REORDER_ACTION } from './ReorderType';
import {UPDATE_ACTION} from './UpdateType'
export const initialState = { data : [
    {"id":"1","Name":"Ram","Gender":"Male","Email":"ram@gmail.com","Phone":"8889991234","City":"Ayodhya","Pincode":"224123"},
    {"id":"2","Name":"Sitha","Gender":"FeMale","Email":"sitha@gmail.com","Phone":"8889990123","City":"Ayodhya","Pincode":"22413"},
    {"id":"3","Name":"Venkatesh","Gender":"Male","Email":"venky@gmail.com","Phone":"8880001234","City":"Thirupati","Pincode":"517507"},
    {"id":"4","Name":"Padmavathi","Gender":"FeMale","Email":"padhu@gmail.com","Phone":"8889990000","City":"Thiruchanuru","Pincode":"517503"},
    {"id":"5","Name":"Dharani","Gender":"FeMale","Email":"dharani@yahoo.com","Phone":"8889994321","City":"Universal","Pincode":"000000"}
]};

const userReducer = (state = initialState,action) =>{
    switch(action.type){
        case DELETE_ACTION : 
        return{
            data:[
            ...state.data.slice(0, action.payload),
            ...state.data.slice(action.payload + 1)
            ]
        }
        case FETCH_ACTION: 
        return{
            ...state,
            data:[
                // ...state.data,
                ...initialState.data,
                ...action.payload
            ]
        }
        case UPDATE_ACTION: 
        let id= action.payload
        return{
            ...state,
            [id]:[
            state.data[id],
            state.data[action.payload].Name=action.Name,
            state.data[action.payload].Gender=action.Gender,
            state.data[action.payload].Email=action.Email,
            state.data[action.payload].Phone=action.Phone,
            state.data[action.payload].City=action.City,
            state.data[action.payload].Pincode=action.Pincode,
        ],
        }
        case REORDER_ACTION:
        let source = ""+action.source+"";
        let destination = action.destination;
        console.log(source,destination);
        return{
            ...state,
            [source]:[
            state.data[source],
            state.data[action.source].id=destination
            ],
            [destination]:[    
            state.data[destination],
            state.data[action.destination].id=source,
            console.log(state.data[action.source].Name),
            console.log(state.data[action.destination].Name)
            ],
        }
        default: return state
    }
}

export default userReducer;