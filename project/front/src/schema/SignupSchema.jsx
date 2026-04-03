import * as YUP from 'yup'
import axios from 'axios'

let SignupSchema = YUP.object({
    fullname : YUP.string().required("Insert Your Full Name"),
    username : YUP
    .string()
    .required("Insert Your Username")
    .test("checkusername", "This Username already exists !",async(a)=>{
        if(!a) return true;
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/user/username-exists/${a.toLowerCase()}`)
        console.log(response.data)
        return response.data.success;
    }),
    email : YUP
    .string()
    .email("Email Id is Invalid")
    //http://localhost:3000/api/v1/user/username-exists/james
    .required("Insert Your E-Mail Id"),
    password : 
        YUP
        .string()
        .required("Insert Your Password")
        .test("strongpass", "Strong Password", (value)=>{
            let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
            if(!value) return true;
            if(reg.test(value)==true)
                return true;
            else
                return false;
        }),
    repassword : YUP.string().oneOf([YUP.ref("password")], "Password and Re-Password should be same").required("Insert Your Re-Password"),
    city : YUP.string().required("Select Your City"),
    contact : YUP.number().typeError("Invalid Contact Number").min(1000000000, "Contact Number should be 10 digit").max(9999999999, "Contact Number should be 10 digit").required("Insert Your Contact Number"),
    address : YUP.string().required("Insert Your Full Address"),
    gender : YUP.string().required("Select Your Gender"),
})

export default SignupSchema