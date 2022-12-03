$(".midContainer").scroll(function () {
    let scrollVal = Math.floor($(".midContainer").scrollTop());
    // console.log(scrollVal);
    if (scrollVal > 0 && scrollVal < 453) {
        $("footer ul li ").removeClass("footer-click");
        $("footer ul li ").addClass("footer");
        $("footer ul li a").removeClass("navigator-click");
        $("footer ul li a").addClass("navigator");
        $("#1 a").removeClass("navigator");
        $("#1 a").addClass("navigator-click");
        $("#1").removeClass("footer");
        $("#1").addClass("footer-click");
        $(".downScrollL,.downScrollR").css("transform", "rotate(90deg)");
    }
    if (scrollVal > 453 && scrollVal < 945) {
        $("footer ul li ").removeClass("footer-click");
        $("footer ul li ").addClass("footer");
        $("footer ul li a").removeClass("navigator-click");
        $("footer ul li a").addClass("navigator");
        $("#2 a").removeClass("navigator");
        $("#2 a").addClass("navigator-click");
        $("#2").removeClass("footer");
        $("#2").addClass("footer-click");
        $(".downScrollL").css("transform", "rotate(90deg)");
        $(".downScrollR").css("transform", "rotate(270deg)");
    }
    if (scrollVal > 945 && scrollVal < 1120) {
        $("footer ul li ").removeClass("footer-click");
        $("footer ul li ").addClass("footer");
        $("footer ul li a").removeClass("navigator-click");
        $("footer ul li a").addClass("navigator");
        $("#3 a").removeClass("navigator");
        $("#3 a").addClass("navigator-click");
        $("#3").removeClass("footer");
        $("#3").addClass("footer-click");
        $(".downScrollL,.downScrollR").css("transform", "rotate(270deg)");

    }
});
$(".footer").click(function () {
    $("footer ul li ").removeClass("footer-click");
    $("footer ul li ").addClass("footer");
    $("footer ul li a").removeClass("navigator-click");
    $("footer ul li a").addClass("navigator");

    // $(".navigator").addCLass("navigator");
    let id = $(this).attr("id");
    $("#" + id + " a").removeClass("navigator");
    $("#" + id).removeClass("footer");
    $("#" + id).addClass("footer-click");
    $("#" + id + " a").addClass("navigator-click");

});

$(".img").mouseenter(function () {
    $(".last1").addClass("last-1");
    $(".last2").addClass("last-2");
    $(".name").addClass("name-1");
});

$(".img").mouseleave(function () {
    $(".last1").removeClass("last-1");
    $(".last2").removeClass("last-2");
    $(".name").removeClass("name-1");
});
$(".let").mouseenter(function () {
    $(this).css("animation", "letter 0.6s ease-out 1 alternate");
});
setInterval(function () {
    $(".let").css("animation", "none");
}, 2000);

// Time ----- 

function countDown() {
    let dt = new Date();
    let hrs = dt.getHours();
    let ap = "";
    if (dt.getHours() >= 12) {
        ap = "pm";
        hrs = dt.getHours() - 12;
    }
    else {
        ap = "am";
        hrs = dt.getHours();
    }
    let mins = dt.getMinutes();
    let secs = dt.getSeconds();
    $("#time").text(hrs + ":" + mins + ":" + secs + " " + ap);
}
setInterval(countDown, 1000);

// Date ------
function getDate() {
    var options = {
        day: "numeric"
    };
    const today = new Date();
    const date = today.toLocaleDateString("en-US", options);
    return date;
}
function getDay() {
    var options = {
        weekday: "long"
    };
    const today = new Date();
    const date = today.toLocaleDateString("en-US", options);
    return date;
}
function getMonth() {
    var options = {
        month: "long"
    };
    const today = new Date();
    const date = today.toLocaleDateString("en-US", options);
    return date;
}
$("#date").text(getDay() + ", " + getDate() + " " + getMonth());

// Weather ----- 

fetch('https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=c931035e8ef7ccea5ad27c6b2a8f7f9b')
 .then(response=> response.json())
 .then(data => {
     var temp = data["main"]["temp"];
     var des = data["weather"][0]["description"];
     const icon = data["weather"][0]["icon"];
     const iconurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    //  console.log(temp+des);
    //  console.log(icon);

    $(".deg").text(`Pune: `+"  "+temp+` °C`)
    $(".des").html(des+`<img src="`+iconurl+`" alt="">`)
});

// Socialss ==== 
var id = "";
$(".social").mouseenter(function(){
    id = $(this).attr("id");
    $("#"+id+" a img").css("animation","rot 0.6s ease-in-out");
    $("#"+id+" a img").css("transform","scale(0.8)");
});

$(".social").mouseleave(function(){
    let id = $(this).attr("id");
    $("#"+id+" a img").css("animation","none");
    $("#"+id+" a img").css("transform","scale(1)");
});
social = ["instagram","faceBook","discord","twitter"];

setInterval(function () {
    let i = Math.floor( Math.random()*4);
    $("#"+social[i]+" a img").css("animation","bnc 0.5s ease-in-out");
}, 1500);

setInterval(function () {
    $(".social a img").css("animation","none");
}, 2200);

setInterval(function () {
    $("#login").css("animation","pop 0.5s ease-in-out");
}, 3000);

setInterval(function () {
    $("#login").css("animation","none");
}, 3700);

// Project section ------ 

$(".projectBox").scroll(function(){
    let scrollVal = $(".projectBox").scrollLeft();
    // console.log(scrollVal);
});
$("#lB").click(function(){
    let scrollVal = $(".projectBox").scrollLeft();
    scrollVal-=522;
    $(".projectBox").scrollLeft(scrollVal);
    $(".proInner").css("animation","slideleft 0.5s ease-in-out");
    let interval = setInterval(function () {
        $(".proInner").css("animation","none");
        clearInterval(interval);
    }, 500);
});

$("#rB").click(function(){
    let scrollVal = $(".projectBox").scrollLeft();
    scrollVal+=522;
    $(".projectBox").scrollLeft(scrollVal);
    $(".proInner").css("animation","slideRight 0.5s ease-in-out");
    let interval = setInterval(function () {
        $(".proInner").css("animation","none");
        clearInterval(interval);
    }, 500);
});


// skills -----

$(".midContainer").scroll(function(){
    let scrollVal = Math.floor($(".midContainer").scrollTop());
    if(scrollVal>280 && scrollVal<903){
        $("#fadeUp1,#fadeUp2,#fadeUp3").css("animation","fadeUp 1s ease-in-out forwards");
        $("#fadeLeft1,#fadeLeft2,#fadeLeft3").css("animation","fadeLeft 1s ease-in-out forwards");
        $("#fadeRight1,#fadeRight2,#fadeRight3").css("animation","fadeRight 1s ease-in-out forwards");
        $(".skillsInner h1").css("animation","fadeUpIn 1s ease-in-out forwards");
    }else{
        $("#fadeUp1,#fadeUp2,#fadeUp3").css("animation","none");
        $("#fadeLeft1,#fadeLeft2,#fadeLeft3").css("animation","none");
        $("#fadeRight1,#fadeRight2,#fadeRight3").css("animation","none");
        $(".skillsInner h1").css("animation","none");
    }
        
}) ;

$(".midContainer").scroll(function(){
    let scrollVal = Math.floor($(".midContainer").scrollTop());
    // console.log(scrollVal);
    if(scrollVal>900){
        $(".projectsInner h1").css("animation","fadeUpIn 1s ease-in-out forwards");
        $(".projectBox").css("animation","popUpIn 1s ease-in-out forwards");
    }else{
        $(".projectsInner h1").css("animation","none");
        $(".projectBox").css("animation","none");
    }
        
}) ;
// $(".hi").css("color","green");

// Project scroll button ---

$(".scrl").click(function(){
    $(".scrl").removeClass("scrlAct");
    $(this).addClass("scrlAct");
    $(".proInner").css("animation","fadeUp 0.5s ease-in-out");
    let interval = setInterval(function () {
        $(".proInner").css("animation","none");
        clearInterval(interval);
    }, 500);
});


$("#resume").click(function(){
    $("#resumeCon").removeClass("display");
});
$("#resumeD").click(function(){
    $("#resumeCon").addClass("display");
});

