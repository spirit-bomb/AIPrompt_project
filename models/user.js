import {Schema,model,models} from 'mongoose';
const skeema=new Schema({
    email:{
        type:String,
        unique:[true,'Email already exists!'],
        required:[true,'Email is required'],
    },
    userName:{
        type:String,
        required:[true,'userName is required'],
    },
    image:{
        type:String,
    }
});
const User=models.User||model("User",skeema);
export default User;