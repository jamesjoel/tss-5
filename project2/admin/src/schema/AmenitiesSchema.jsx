import * as YUP from 'yup'

let AmenitiesSchema = YUP.object({
    name : YUP.string().required("*")
})

export default AmenitiesSchema;