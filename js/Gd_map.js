//地图弹框
$('.address_map').click(function () {
    $('.map_bounced').show();
});
$('.back_map').click(function () {
    $('.map_bounced').hide();
});
$('.type_map_yes').click(function () {
    if(typeof window.__positionOk === 'function') {
        window.__positionOk.call(this, __positionResult);
    }
    $('.map_bounced').hide();
});
/**
 * 高德地图基本方法
 *  2018-9-4
 * */
    //map  js
    //定义基本常量
var lng,lat,address,__positionResult;
var map, geolocation;
//gps获取经纬度  安卓方法
// lng = queryGsyInfomation().split(",")[0];
// lat = queryGsyInfomation().split(",")[1];
// lng = 120.201826;
// lat = 30.201971;
//加载地图，调用浏览器定位服务
map = new AMap.Map('', {
    zoom: 16,
    scrollWheel: false
});
map.plugin('AMap.Geolocation', function() {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition:'RB'
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});
//安卓获取定位方法
//gps获取经纬度
// lng = queryGsyInfomation().split(",")[0] * 1;
// lat = queryGsyInfomation().split(",")[1] * 1;
// console.log(lng,lat);
addMarker();
//解析定位结果
function onComplete(data) {
    if(typeof window.__positionOk === 'function') {
        window.__positionOk.call(this, data);
    }
    lng = data.position.getLng();
    lat = data.position.getLat();
    // console.log(data.formattedAddress);
    // $('#textarea_map').html(data.formattedAddress);
    console.log(data)
    addMarker();
}
//解析定位错误信息
function onError(data) {
    console.log(data)
}
input_map();
/**
 * 搜索框搜索
 * */
function input_map() {
    //输入提示
    var auto = new AMap.Autocomplete({
        input: "tipinput"
    });
    var placeSearch = new AMap.PlaceSearch({
        map: map
    });  //构造地点查询类
    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
    }
    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
        // console.log(e.poi.location.lat,e.poi.location.lng);
        lng = e.poi.location.lng;
        lat = e.poi.location.lat;
        console.log(e);
        addMarker();
    }
}

/**
 * 进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker进入页面有经纬度后添加 marker
 */
var positionOk_flag = true;
function addMarker() {
    // console.log(lng,lat);
    map = new AMap.Map("container", {
        resizeEnable: true,
        center:[lng, lat],
        zoom: 16
    });
    // console.log(lng,lat);
    //定位后重新放入marker
    // var marker = new AMap.Marker({
    //     position: [lng, lat],
    //     draggable: true,
    //     cursor: 'move',
    //     raiseOnDrag: true
    // });
    // marker.setMap(map);
    AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
        var positionPicker = new PositionPicker({
            mode: 'dragMap',
            map: map
        });
        positionPicker.on('success', function(positionResult) {
            //跟踪数据变化
            __positionResult = positionResult;
            if(positionOk_flag == true){
                if(typeof window.__positionOk === 'function') {
                    window.__positionOk.call(this, __positionResult);
                }
                positionOk_flag = false;
            }
        });
        positionPicker.start();
        map.panBy(0, 1);
        map.addControl(new AMap.ToolBar({
            liteStyle: true
        }))
    });
    var btn = '<div id="dwBtn"></div>';
    $('#container').append(btn);
    //定位点击
    $('#dwBtn').on('click',function () {
        //gps获取经纬度  安卓方法
        lng = queryGsyInfomation().split(",")[0];
        lat = queryGsyInfomation().split(",")[1];
        addMarker();
    });
}

