import * as YUP from 'yup'
let ChangePasswordSchema = YUP.object({
    password : YUP.string().required("Insert Your Current Password"),
    repass : YUP.string().test("pass", "Password has exceeded 16 Char", (value)=>{
            if(value.length > 16){
                return false;
            }else{
                return true;
            }
        }).test("strong", "This Password is Not Strong", (value)=>{
            let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
            if(reg.test(value)==true){
                return true;
            }else{
                return false;
            }
    
    
    
        }).required("Insert New Password"),
    confrepass : YUP.string().oneOf([YUP.ref("repass")], "New Password and Confirm New Password are not same").required("Insert Confirm New Password"),
})

export default ChangePasswordSchema;

