#说明
基于高德实现地图拖动 搜索等功能 
#使用方法
1.在需要使用到的页面放入map.html中的dom
<div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>地址描述</p>
            </div>
            <div class="weui-cell__ft">
                <!--<input name="EVEN_ADDR"  type="text" placeholder="" disabled="disabled">-->
                <span class=" weui-input text-right adress">地图定位</span>
                <span class="address_map"></span>
            </div>
        </div>
    </div>
    <div class="textarea_map">
        <textarea name="DESCRIPTION" class="weui-textarea" placeholder=""rows="3" disabled="disabled" id="textarea_map"></textarea>
    </div>
2.引入需要用到的css js等文件
3.定位图标放入项目
4.在需要使用的页面中直接使用
window.__positionOk = function (data) {
    if(data.info === "OK") {
        //data为返回的数据
        console.log(data);
    }
};
