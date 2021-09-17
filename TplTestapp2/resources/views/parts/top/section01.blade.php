<!-- Icons Grid -->
<style>
    /* Google マップを表示させるためには style 内で width と height の指定が必要 */
    #mapDiv {width: 100%; height: 400px;}
</style>
</head>
 
<body>
<div id="txt">ここにデータを表示</div>                 <!-- データを表示するdiv要素 -->
<div id="mapDiv"></div>                             <!-- 地図を置くdiv要素 -->
 
<script>
var mapDiv = document.getElementById("mapDiv");     // 地図を置く場所
var gmap;                                           // Googleマップの Map オブジェクトのための変数
var mark;                                           // Googleマップの Marker オブジェクトのための変数
 
// GPS センサの値が変化したら何らか実行する geolocation.watchPosition メソッド
navigator.geolocation.watchPosition( (position) => {
    var lat  = position.coords.latitude;            // 緯度を取得
    var lng  = position.coords.longitude;           // 経度を取得
    var accu = position.coords.accuracy;            // 緯度・経度の精度を取得
    displayData(lat, lng, accu);                    // displayData 関数を実行
    showMyPos(lat, lng);                            // showMyPos 関数を実行
}, (error) => {                                     // エラー処理（今回は特に何もしない）
}, {
    enableHighAccuracy: true                        // 高精度で測定するオプション
});
 
// データを表示する displayData 関数
function displayData(lat, lng, accu) {
    var txt = document.getElementById("txt");       // データを表示するdiv要素の取得
    txt.innerHTML = "緯度, 経度: " + lat + ", " + lng + "<br>"  // データ表示
                  + "精度: "       + accu;
}
 
// 自分の位置を表示する showMyPos 関数
function showMyPos(lat, lng) {
    var myPos = new google.maps.LatLng(lat, lng);   // Googleマップの LatLng オブジェクトを作成
    gmap.setCenter(myPos);                          // gmap の中心を myPos の位置にする
    mark.setPosition(myPos);                        // mark の位置を myPos にする
}
 
// 地図の初期化
function initMap() {
    // 1回だけ現在位置を測定する getCurrentPosition メソッド
    navigator.geolocation.getCurrentPosition( (position) => {
        var lat = position.coords.latitude;         // 緯度を取得
        var lng = position.coords.longitude;        // 経度を取得
        var initPos = new google.maps.LatLng(lat, lng); // 初期位置を指定
        gmap = new google.maps.Map(mapDiv, {        // Map オブジェクトを作成して mapDiv に表示
            center: initPos,                        // 地図の中心を initPos に設定
            zoom: 16                                // ズーム倍率
        });
        mark = new google.maps.Marker({             // Marker オブジェクトを作成
            map: gmap,                              // gmap の上に表示する
            position: initPos,                      // initPos の位置に
        });
    }, (error) => {                                 // エラー処理（今回は特に何もしない）
    }, {
        enableHighAccuracy: true                    // 高精度で測定するオプション
    });
}
</script>
 
<!-- Google マップを読み込むための外部スクリプトの読み込み -->
<!-- API_KEY の部分を自身で取得した APIキーで置き換える -->
<!-- callback=initMap により、マップの準備ができたら initMap 関数が実行される -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNEk6Ez6eaiKK_pTuM_op7D3M3D4fyoO8&callback=&libraries=geometry">
</script>

<!--Image Showcases-->