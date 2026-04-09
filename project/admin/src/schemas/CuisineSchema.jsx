import * as YUP from 'yup'
let CuisineSchema = YUP.object({
    title : YUP.string().required("*")
})

export default CuisineSchema