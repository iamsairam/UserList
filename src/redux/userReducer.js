import {DELETE_ACTION} from './ActionType'
import {FETCH_ACTION} from './FetchType'
import {UPDATE_ACTION} from './UpdateType'
export const initialState = { data : [
    {"id":"0","Name":"Ram","Gender":"Male","Email":"ram@gmail.com","Phone":"8889991234","City":"Ayodhya","Pincode":"224123"},
    {"id":"1","Name":"Sitha","Gender":"FeMale","Email":"sitha@gmail.com","Phone":"8889990123","City":"Ayodhya","Pincode":"22413"},
    {"id":"2","Name":"Venkatesh","Gender":"Male","Email":"venky@gmail.com","Phone":"8880001234","City":"Thirupati","Pincode":"517507"},
    {"id":"3","Name":"Padmavathi","Gender":"FeMale","Email":"padhu@gmail.com","Phone":"8889990000","City":"Thiruchanuru","Pincode":"517503"},
    {"id":"4","Name":"Sairam","Gender":"Male","Email":"sairam.webdeveloper@gmail.com","Phone":"8919111249","City":"Paritala","Pincode":"521180"}
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
        let idNo= action.payload
        return{
            ...state,
            [idNo]:[
            state.data[idNo],
            state.data[action.payload].id=action.id,
            state.data[action.payload].Name=action.Name,
            state.data[action.payload].Gender=action.Gender,
            state.data[action.payload].Email=action.Email,
            state.data[action.payload].Phone=action.Phone,
            state.data[action.payload].City=action.City,
            state.data[action.payload].Pincode=action.Pincode,
        ],
        }
        default: return state
    }
}

export default userReducer;