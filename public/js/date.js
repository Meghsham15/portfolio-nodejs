// date in day , month , date format 

function getDate(){
    var options =  {
        weekday :"long",
        day :"numeric",
        month : "long"
    };
    const today = new Date();
    const day = today.toLocaleDateString("en-US",options);
    return day;
};
module.exports = getDate;