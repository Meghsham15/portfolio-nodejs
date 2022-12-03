import projects from "./popProjects.js";
let length = projects.length;

for (let i = 0;i<length;i++){
    $("#"+projects[i].id).click(function(){
        $("#proPop"+projects[i].id).removeClass("display");
    });
    $("#proPopB"+projects[i].id).click(function(){
        $("#proPop"+projects[i].id).addClass("display");
    });

}



