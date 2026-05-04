import * as YUP from 'yup'
import axios from 'axios'
let SignupSchema = YUP.object({
    fullname : YUP.string()
    // .test("demo", "First Letter Should Be Capital", (x)=>{
    //     let arr = x.split(""); // [r, a, h, u, l]
    //     if(arr[0].toUpperCase() == arr[0]){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // })
    .required("Insert Your Full Name"),
    username : YUP.string().test("checkusername", "This Username Already Exists", async(value)=>{
        if(!value) return;
        
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/user/checkusername/${value}`);
        if(response.data.success==true){
            return true;
        }
        else{
            return false;
        }

    }).required("Insert Username"),
    email : YUP.string().email("Email Id is Incorrect").required("Insert Your Email Id"),
    password : YUP.string().test("pass", "Password has exceeded 16 Char", (value)=>{
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



    }).required("Insert Your Password"),
    repassword : YUP.string().oneOf([YUP.ref("password")], "Password and Re-Password are not same").required("Insert Your Re-Password"),
    contact : YUP.number().typeError("Insert Numbers Only").max(9999999999, "Contact Number is Invalid").min(1000000000, "Contact Number is Invalid").required("Insert Your Contact"),
    address : YUP.string().required("Insert Your Address"),
    city : YUP.string().required("Select Your City"),
    gender : YUP.string().required("Select Your Gender"),
})

export default SignupSchema


/*

axios.get("").then(response=>{
    
})


let response = await axios.get("")


*/