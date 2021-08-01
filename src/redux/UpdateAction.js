import { UPDATE_ACTION} from "./UpdateType"

export const updateAction =(indexNo,Name,Gender,Email,Phone,City,Pincode)=>{
    return{
        type: UPDATE_ACTION,
        payload:indexNo-1,
        Name:Name,
        Gender:Gender,
        Email:Email,
        Phone:Phone,
        City:City,
        Pincode:Pincode,
    }
}