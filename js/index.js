setRem();
window.addEventListener("resize",setRem);
window.onload=function(){
    touchImg(".banner2");
}

function setRem(){
    var html=document.getElementsByTagName("html")[0];
    var winW=document.documentElement.clientWidth;
    var value=100;
    value=winW<640?winW/640*100:value;
    html.style.fontSize=value+"px";
}

function touchImg(element){
    var element=document.querySelector(element);
    var thisUl=element.querySelector("ul");
    thisUl.innerHTML+=thisUl.innerHTML;
    var lis=element.querySelectorAll("ul li");
    var nav=element.querySelector("nav");
    var iSpan=element.querySelectorAll("nav span");
    var startPoint=0;
    var startX=0;
    var now=0;
    var timer=null;
    var isMove=true;
    var isFirst=true;

    var baseW=parseFloat(getComputedStyle(lis[0])["width"]);

    cssTransform(thisUl,"translateX",0);
    thisUl.style.width=baseW*lis.length+"px";

    auto();
    element.addEventListener("touchstart",function(e){
        clearInterval(timer);
        thisUl.style.transition="none";
        var translateX=cssTransform(thisUl,"translateX");
        now=Math.round(-translateX/baseW);
        now==0?now=iSpan.length:now==lis.length-1?now=iSpan.length-1:"";
        cssTransform(thisUl,"translateX",-now*baseW);
        startPoint=e.changedTouches[0];
        startX=cssTransform(thisUl,"translateX");
        isMove=true;
        isFirst=true;
    });
    element.addEventListener("touchmove",function(e){
        if(!isMove){
            return;
        }
        var nowPoint=e.changedTouches[0];
        var disX=nowPoint.pageX-startPoint.pageX;
        var disY=nowPoint.pageY-startPoint.pageY;
        if(isFirst){
            isFirst=false;
            if(Math.abs(disY)>Math.abs(disX)){
                isMove=false;
            }
        }
        if(isMove){
            cssTransform(thisUl,"translateX",startX+disX);
        }
    });
    element.addEventListener("touchend",function(e){
        var translateX=cssTransform(thisUl,"translateX");
        now=Math.round(-translateX/baseW);
        auto();
        move();
    });
    function auto(){
        clearInterval(timer);
        timer=setInterval(function(){
            if(now==lis.length-1){
                now=iSpan.length-1;
            }
            thisUl.style.transition="none";
            cssTransform(thisUl,"translateX",-now*baseW);
            setTimeout(function(){
                now++;
                move();
            },30);
        },3000);
    }
    function move(){
        thisUl.style.transition=".5s";
        cssTransform(thisUl,"translateX",-now*baseW);
        for(var i=0;i<iSpan.length;i++){
            iSpan[i].className="";
        }
        iSpan[now%iSpan.length].className="active";
    }
}
