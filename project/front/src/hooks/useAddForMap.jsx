let useAddForMap = (addr)=>{
//    addr  = vijay nagar, indore   ----   Vijay%20Nagar%20Indore
    console.log("************", addr)
    let x = addr.replaceAll(",", "");
    let y = x.replaceAll(" ", "%20")
    return y;
}

export default useAddForMap;