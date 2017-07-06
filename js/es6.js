/**
 * Created by PX on 2017/6/6.
 */

var rootUrl = window.location.href;
console.log(rootUrl);
rootUrl = rootUrl.slice(0, rootUrl.indexOf("hcy/") + 4);
headAjax();
footAjax();

// 加载页头信息
function headAjax() {
    $.get(rootUrl + "html/header.html", function (str) {
        $("nav").append(str);
    });
}
// 加载页脚信息
function footAjax() {
    $.get(rootUrl + "html/footer.html", function (str) {
        $("footer").append(str);
    });
}
//首页加载
$.get(rootUrl + "html/head.html", function (str) {
    $("main").append(str);
    banCarousel();
});
//首页大轮播
function banCarousel() {
    $('#myCarousel').carousel({
        //自动4秒播放
        interval : 4000,
    });
}
$("nav").on("click","li",function (event) {
    rootUrl = rootUrl.slice(0, rootUrl.indexOf("hcy/") + 4);
    var a = event.target.innerText;
    if(a.match("首页")){
        window.location.href = rootUrl;
        banCarousel();
    }else if(a.match("第二页")){
        window.location.href = rootUrl + "html/page1.html";
    }else if(a.match("第三页")){
        window.location.href = rootUrl + "html/page2.html";
    }else if(a.match("第四页")){
        window.location.href = rootUrl + "html/page3.html";
        toVedio();
    }else if(a.match("第五页")){
        window.location.href = rootUrl + "html/page4.html";
    }
})


//视频页面动态加载数据
$.getJSON("../data/vedio.json",function (str) {
    var vedios = '';
    for(let i in str){
        vedios += `
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div class="thumbnail">
                    <video src="${str[i].src}" style="width: 252px;height: 173px;" controls="controls"></video>
                    <div class="caption">
                        <h4>${str[i].h3}</h4>
                        <p>${str[i].p}</p>
                    </div>
              </div>
        </div>
    `;
    }
    $("#p2Cons").append(vedios);
    toVedio();
})
//page3大部分动态加载
$.getJSON("../data/page3-1.json",function (str) {
    var news = '';
    for(let i in str){
        news += `
        <div class="row addPa">
             <div class="col-md-5 col-sm-5 col-xs-5">
                   <img src="${str[i].src}" class="img-responsive" alt="">
             </div>
             <div class="col-md-7 col-sm-7 col-xs-7">
                   <h4>${str[i].h4}</h4>
                   <p class="hidden-xs">${str[i].p1}</p>
                   <p>${str[i].p2}</p>
             </div>
        </div>
    `;
    }
    $("#pag3Cons").html(news);
})
//page3小部分动态加载
$.getJSON("../data/page3-2.json",function (str) {
    var newsRight = '';
    for(let i in str){
        newsRight += `
        <div class="row addPa addPa1">
             <div class="col-md-5 col-sm-5 col-xs-5">
                  <img src="${str[i].src}" class="img-responsive" alt="">
             </div>
             <div class="col-md-7 col-sm-7 col-xs-7">
                   <h4>${str[i].h4}</h4>
                   <p>${str[i].p2}</p>
             </div>
        </div>
    `;
    }
    $("#rightCon").html(newsRight);
})

//视频页面的点击跳转至相关页面事件
function toVedio() {
    $(".thumbnail").click(function () {
        localStorage.setItem("vedioTit",$(this).find("h4").text());
        localStorage.setItem("vedioSrc",$(this).find("video").attr("src"));
        localStorage.setItem("thisIdx",$(".thumbnail").index($(this)));
        window.location.href = rootUrl + "html/page5.html";
    })
}
//视频详情页动态加载

var getH3 = localStorage.getItem("vedioTit");
var getSrc = localStorage.getItem("vedioSrc");
var getIdx = localStorage.getItem("thisIdx");
$.getJSON("../data/page5.json",function (str) {
    var vedioSingle = `
        <div class="row text-center" style="margin: 20px 0;">
            <h2 id="headTit">${getH3}</h2>
        </div>
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <video src="${getSrc}" style="width: 100%;" controls="controls"></video>
            </div>
            <div class="col-md-1"></div>
        </div>
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-8">
                <h4>${str[getIdx].h4}</h4>
                <p>${str[getIdx].p1}</p>
            </div>
            <div class="col-md-3">
                <p>${str[getIdx].p2}</p>
                <p>${str[getIdx].p3}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <h3>${str[getIdx].h3}</h3>
                <p>${str[getIdx].p4}</p>
                <p>${str[getIdx].p5}</p>
                <p>${str[getIdx].p6}</p>
            </div>
            <div class="col-md-1"></div>
    </div>
    `;
    $("#pa5Con").html(vedioSingle);
})


//无缝轮播---原生js
var speed = 2;
var oUl = document.getElementById("p1Con1").getElementsByTagName("ul")[0];
function noSeam() {
    if (oUl.offsetLeft<-oUl.offsetWidth/3) {
        oUl.style.left="0";
    }
    if (oUl.offsetLeft > 0) {
        oUl.style.left = -oUl.offsetWidth/2+'px';
    }
    oUl.style.left = oUl.offsetLeft-speed+'px';
}
var timer = setInterval(noSeam,50);
oUl.onmouseover = function(){
    clearInterval(timer);
}
oUl.onmouseleave = function(){
    timer = setInterval(noSeam,50);
}