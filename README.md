#说明
基于高德实现地图拖动 搜索等功能 
#使用方法
#1.在需要使用到的页面放入map.html中的dom

#2.引入需要用到的css js等文件

#3.定位图标放入项目

#4.在需要使用的页面中直接使用

window.__positionOk = function (data) {
    
    if(data.info === "OK") {
        //data为返回的数据
        console.log(data);
    }
};
