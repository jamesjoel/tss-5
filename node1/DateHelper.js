let DateHelper = (d)=>{
    let m = d.toLocaleString().split(" ")
    let n = m[1].split(":");
    let a = d.toDateString();
    let b = a.split(" ");
    let x = b[2]+"-"+b[1]+"-"+b[3]+" "+n[0]+":"+n[1]+" "+m[2];
    return x;
}

export default DateHelper;
// 21-Feb-2026 1:35 pm