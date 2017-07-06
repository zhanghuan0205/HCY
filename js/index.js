"use strict";

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
        interval: 4000
    });
}
$("nav").on("click", "li", function (event) {
    rootUrl = rootUrl.slice(0, rootUrl.indexOf("hcy/") + 4);
    var a = event.target.innerText;
    if (a.match("首页")) {
        window.location.href = rootUrl;
        banCarousel();
    } else if (a.match("第二页")) {
        window.location.href = rootUrl + "html/page1.html";
    } else if (a.match("第三页")) {
        window.location.href = rootUrl + "html/page2.html";
    } else if (a.match("第四页")) {
        window.location.href = rootUrl + "html/page3.html";
        toVedio();
    } else if (a.match("第五页")) {
        window.location.href = rootUrl + "html/page4.html";
    }
});

//视频页面动态加载数据
$.getJSON("../data/vedio.json", function (str) {
    var vedios = '';
    for (var i in str) {
        vedios += "\n        <div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\">\n              <div class=\"thumbnail\">\n                    <video src=\"" + str[i].src + "\" style=\"width: 252px;height: 173px;\" controls=\"controls\"></video>\n                    <div class=\"caption\">\n                        <h4>" + str[i].h3 + "</h4>\n                        <p>" + str[i].p + "</p>\n                    </div>\n              </div>\n        </div>\n    ";
    }
    $("#p2Cons").append(vedios);
    toVedio();
});
//page3大部分动态加载
$.getJSON("../data/page3-1.json", function (str) {
    var news = '';
    for (var i in str) {
        news += "\n        <div class=\"row addPa\">\n             <div class=\"col-md-5 col-sm-5 col-xs-5\">\n                   <img src=\"" + str[i].src + "\" class=\"img-responsive\" alt=\"\">\n             </div>\n             <div class=\"col-md-7 col-sm-7 col-xs-7\">\n                   <h4>" + str[i].h4 + "</h4>\n                   <p class=\"hidden-xs\">" + str[i].p1 + "</p>\n                   <p>" + str[i].p2 + "</p>\n             </div>\n        </div>\n    ";
    }
    $("#pag3Cons").html(news);
});
//page3小部分动态加载
$.getJSON("../data/page3-2.json", function (str) {
    var newsRight = '';
    for (var i in str) {
        newsRight += "\n        <div class=\"row addPa addPa1\">\n             <div class=\"col-md-5 col-sm-5 col-xs-5\">\n                  <img src=\"" + str[i].src + "\" class=\"img-responsive\" alt=\"\">\n             </div>\n             <div class=\"col-md-7 col-sm-7 col-xs-7\">\n                   <h4>" + str[i].h4 + "</h4>\n                   <p>" + str[i].p2 + "</p>\n             </div>\n        </div>\n    ";
    }
    $("#rightCon").html(newsRight);
});

//视频页面的点击跳转至相关页面事件
function toVedio() {
    $(".thumbnail").click(function () {
        localStorage.setItem("vedioTit", $(this).find("h4").text());
        localStorage.setItem("vedioSrc", $(this).find("video").attr("src"));
        localStorage.setItem("thisIdx", $(".thumbnail").index($(this)));
        window.location.href = rootUrl + "html/page5.html";
    });
}
//视频详情页动态加载

var getH3 = localStorage.getItem("vedioTit");
var getSrc = localStorage.getItem("vedioSrc");
var getIdx = localStorage.getItem("thisIdx");
$.getJSON("../data/page5.json", function (str) {
    var vedioSingle = "\n        <div class=\"row text-center\" style=\"margin: 20px 0;\">\n            <h2 id=\"headTit\">" + getH3 + "</h2>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-1\"></div>\n            <div class=\"col-md-10\">\n                <video src=\"" + getSrc + "\" style=\"width: 100%;\" controls=\"controls\"></video>\n            </div>\n            <div class=\"col-md-1\"></div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-1\"></div>\n            <div class=\"col-md-8\">\n                <h4>" + str[getIdx].h4 + "</h4>\n                <p>" + str[getIdx].p1 + "</p>\n            </div>\n            <div class=\"col-md-3\">\n                <p>" + str[getIdx].p2 + "</p>\n                <p>" + str[getIdx].p3 + "</p>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-1\"></div>\n            <div class=\"col-md-10\">\n                <h3>" + str[getIdx].h3 + "</h3>\n                <p>" + str[getIdx].p4 + "</p>\n                <p>" + str[getIdx].p5 + "</p>\n                <p>" + str[getIdx].p6 + "</p>\n            </div>\n            <div class=\"col-md-1\"></div>\n    </div>\n    ";
    $("#pa5Con").html(vedioSingle);
});

//无缝轮播---原生js
var speed = 2;
var oUl = document.getElementById("p1Con1").getElementsByTagName("ul")[0];
function noSeam() {
    if (oUl.offsetLeft < -oUl.offsetWidth / 3) {
        oUl.style.left = "0";
    }
    if (oUl.offsetLeft > 0) {
        oUl.style.left = -oUl.offsetWidth / 2 + 'px';
    }
    oUl.style.left = oUl.offsetLeft - speed + 'px';
}
var timer = setInterval(noSeam, 50);
oUl.onmouseover = function () {
    clearInterval(timer);
};
oUl.onmouseleave = function () {
    timer = setInterval(noSeam, 50);
};
