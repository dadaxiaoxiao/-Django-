   $(function () {

                var wrap = document.querySelector(".wrap");

                //给返回首页修改密码按钮添加单击事件
                $("#tab-prev").on("click", function () {
                    prev_pic();
                });
                $("#tab-next").on("click", function () {
                    next_pic();
                });
                var index = 0;

                function next_pic () {

                    index++;
                    if(index > 4){
                        index = 0;
                    }
                    showCurrentDot();
                    var newLeft;
                    if(wrap.style.left === "-4812px"){
                         newLeft = -1604;
                    }else{
                        newLeft = parseInt(wrap.style.left)-802;
                    }
                    wrap.style.left = newLeft + "px";
                }
                function prev_pic () {
                    index--;
                    if(index < 0){
                        index = 4;
                    }
                    showCurrentDot();
                    var newLeft;
                    if(wrap.style.left === "0px"){
                        newLeft = -3208;
                    }else{
                        newLeft = parseInt(wrap.style.left)+802;
                    }
                    wrap.style.left = newLeft + "px";
                }
                var timer = null;
                function autoPlay () {   //自动轮播
                    timer = setInterval(function () {   //定时器
                        next_pic();
                    },3000);
                }
                autoPlay();
                var container = document.querySelector(".container")
                container.onmouseenter = function () {
                    clearInterval(timer);
                }
                container.onmouseleave = function () {
                    autoPlay();
                }
                var allL =document.getElementsByTagName("s");
                function showCurrentDot () {
                    for(var i = 0, len = allL.length; i < len; i++){
                        allL[i].style.backgroundColor='#7f7f7f';
                    }
                    allL[index].style.backgroundColor='#fff';
                }
                for (var i = 0, len = allL.length; i < len; i++){
                    (function(i){
                        allL[i].onclick = function () {
                            var dis = index - i;
                            if(index == 4 && parseInt(wrap.style.left)!== -4812){
                                dis = dis - 5;
                            }
                            //和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可
                            if(index == 0 && parseInt(wrap.style.left)!== -802){
                                dis = 5 + dis;
                            }
                            wrap.style.left = (parseInt(wrap.style.left) +  dis * 802)+"px";
                            index = i;
                            showCurrentDot();
                        }
                    })(i);
                }
            });
