import * as YUP from 'yup'

let LoginSchema = YUP.object({
    username : YUP.string().required("*"),
    password : YUP.string().required("*")
})

export default LoginSchema;