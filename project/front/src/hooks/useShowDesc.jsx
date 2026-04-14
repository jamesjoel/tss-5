let useShowDesc = (str)=>{
    let arr = str.split(" ");
    if(arr.length <= 20){
        return str+"..."
    }
    else{

        let newstr = "";
        for(let i=0; i<20; i++){
            newstr += " "+arr[i];
        }
        return newstr+"...";
    }
}

export default useShowDesc;