function httpGetAsync(theUrl, callback)
{
   var xmlHttp = new XMLHttpRequest();
   xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.setRequestHeader('Accept', 'application/vnd.github.inertia-preview+json');
    xmlHttp.send();
}
var versionFull;
var versionShort;
var releaseDate;
var archiveHref;
var re = /\d\.\d\.\d+/;
$(document).ready(function(){


httpGetAsync('https://api.github.com/repos/DeskChan/DeskChan/releases/latest', function(response) {
    //console.log(response)
    //console.log(JSON.parse([]+response)["name"]);
    versionFull = []+JSON.parse([]+response)["name"];
    versionShort = []+versionFull.match(re);
    //console.log(versionShort, versionFull);
    var kek;
    kek = []+JSON.parse([]+response)["published_at"];
    releaseDate = []+kek.match(/\d{4}-\d{2}-\d{2}/);
    var day = releaseDate.match(/\d\d$/);
    var month = parseInt(releaseDate.match(/\b\d\d\b/));
    var year = releaseDate.match(/^\d\d\d\d/);
    var months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    archiveHref = []+JSON.parse([]+response)["assets"][0]["browser_download_url"];
    //console.log(day,year,month);
    $('.version-full').text([]+versionFull);
    $('.version-short').text([]+versionShort);
    var a = ([]+JSON.parse([]+response)["body"]).split('\n');
    var size =(parseInt(JSON.parse([]+response)["assets"][0]["size"])/1024/1024);
var out = "";
var dateOut = "";
var percent = []+([]+versionShort.split('.')[1]+ versionShort.split('.')[2]);
var angle = [] +"rotate("+(-180 +3.6*parseInt(percent))+"deg)";
$('.diagram .center').text(percent+"%");
//console.log(angle);
$('.diagram div .filled').css({

"-webkit-transform":angle,
    "-moz-transform":angle,
    "-o-transform":angle,
    "transform":angle



});







dateOut = day+" "+months[month-1]+ " "+year;
    for(var i = 0; i<a.length;i++){
        if(a[i].match(/^-[\s\wа-яА-Яёэ]+\.?/) != null && !(([]+a[i].match(/^-[\s\wа-яА-Яёэ]+\.?/)).match(/.*Другие исправления.*/))){
out+='<li>'+a[i].match(/[\s\wа-яА-Яёэ]+\.?/)+'</li>'
//console.log(a[i].match(/[\s\wа-яА-Яёэ]+\.?/));
//console.log(a[i]);
}
}
$(".get-dc").attr("href", []+archiveHref);
$('.release-date').text([]+dateOut);
$('ul #update').html(out);
$('.size-full').text(([]+size).match(/\d+\.\d\d/));
$('.size-short').text([]+Math.round(size));

var $root = $('html, body');
$('a[href*=\\#]').on('click', function(event){
    event.preventDefault();
    $root.animate({scrollTop:$(this.hash).offset().top}, 1500);
});

$('aintrotxt').on('click', function(event){
    event.preventDefault();
    $root.animate({scrollTop:$('#revolution').offset().top}, 500);
});
//console.log(percent);




});

var purpose;
var outPurp="";


httpGetAsync('https://api.github.com/projects/columns/1407940/cards?access_token=60ada3d5341a0b4deecdb880f48cd9072ab62c96', function(response) {
var plans = JSON.parse(response);
var plansHTML="";
for (var i = 0; i < plans.length; i++) {
    if(plans[i]['note'].match(/^\+.*/)){
        plansHTML+="<div class=\"list-item\"><i class=\"fa fa-check done\" ></i>"+plans[i]['note'].match(/[\s\wа-яА-Яэъё]+/)+"</div>";
    }
};
for (var i = 0; i < plans.length; i++) {
    if(plans[i]['note'].match(/^-.*/)){
        plansHTML+="<div class=\"list-item\"><i class=\"fa fa-times todo\" ></i>"+plans[i]['note'].match(/[\s\wа-яА-Яэъё]+/)+"</div>";
    }
};
$('.todo-get-purp').html(plansHTML);
});


httpGetAsync('https://api.github.com/projects/columns/1893398/cards?access_token=60ada3d5341a0b4deecdb880f48cd9072ab62c96', function(response) {
var plans = JSON.parse(response);
var leftHTML="";
var rightHTML=""
for (var i = 0; i < plans.length; i++) {
   var note = plans[i]['note'].split('\n');
   leftHTML+="<li class=\"question-item" + (i == 0 ? " active" : "");
   leftHTML+="\" data-for=\"" + (i+1) + "\"><a><i class=\"fa "+note[0]+"\"></i><span class=\"text\">"+note[1]+"</span><i class=\"fa fa-chevron-right\"></i></a></li>";
   rightHTML+="<div class=\"answers" + (i == 0 ? " active" : "") + "\" data-for=\"" + (i+1) + "\"><ul class=\"answers-list\">";
   for (var j = 2; j < note.length; j++)
      rightHTML+="<li data-text=\"" + (j-1) + "\">" + note[j] + "</li>";
   rightHTML+="</ul></div>";
};
$('.questions-list__column-one-third').html(leftHTML);
$('.questions-list__column-two-third').html(rightHTML);
   var questions = document.querySelectorAll('.question-item');
   console.log(questions);
    questions.forEach(function (item) {
        console.log("we have one!");
        item.addEventListener('click', function () {
            if (!this.classList.contains('active')) {
                document.querySelector('.question-item.active').classList.remove('active');
                this.classList.add('active');
                document.querySelector('.answers.active').classList.remove('active');
                document.querySelector('.answers[data-for="'+this.getAttribute('data-for')+'"]').classList.add('active');
            }
        });
    })
});
});

