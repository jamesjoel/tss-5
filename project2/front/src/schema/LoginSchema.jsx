import * as YUP from 'yup'

let LoginSchema = YUP.object({
    username : YUP.string().required("Insert Your Username/Email"),
    password : YUP.string().required("Insert Your Password")
})

export default LoginSchema;