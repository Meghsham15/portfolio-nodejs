$("#resume").click(function(){
    $("#resumeCon").removeClass("display");
});
$("#resumeD").click(function(){
    $("#resumeCon").addClass("display");
});


$("#lB").click(function(){
    $("#left").css("filter","invert(1)");
    $("#left").css("transform","scale(0.8)");
    let interval = setInterval(function () {
        $("#left").css("filter","invert(0.6)");
        $("#left").css("transform","scale(1)");
        clearInterval(interval);
    }, 200);
});

$("#rB").click(function(){
    $("#right").css("filter","invert(1)");
    $("#right").css("transform","scale(0.8)");
    let interval = setInterval(function () {
        $("#right").css("filter","invert(0.6)");
        $("#right").css("transform","scale(1)");
        clearInterval(interval);
    }, 200);
});