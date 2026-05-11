import * as YUP from 'yup'

let CuisineSchema = YUP.object({
    name : YUP.string().required("*")
})

export default CuisineSchema;