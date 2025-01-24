const getTimeString=(time)=>{
    let hour=parseInt(time/3600);
    let remainSecond=time % 3600;
    let minute=parseInt(remainSecond/60);
    remainSecond=remainSecond % 60;
    return `${hour} hour ${minute} minute ${remainSecond} second ago`

}
console.log(getTimeString(7865));