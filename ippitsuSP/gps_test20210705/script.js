var mapDiv = document.getElementById("mapDiv");     // 地図を置く場所
var gmap;                                           // Googleマップの Map オブジェクトのための変数
var mark;                                           // Googleマップの Marker オブジェクトのための変数

// sound関係
const track = document.getElementById("track");
const thumbnail = document.getElementById("thumbnail");
const background = document.getElementById("background");
const trackArtist = document.getElementById("track-artist");
const trackTitle = document.getElementById("track-title");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");
let play = document.getElementById("play");
let pause = document.getElementById("pause");
// ここまでsound関係

var mermaids = [];                                  // ★人魚の情報を入れる変数
var captured = [];                                  // ★人魚を捕獲済みか否かを入れる変数
loadMermaids();                                     // ★人魚の情報を読み込む
var getImg = document.getElementById("getImg");     // ★img要素の取得

// GPS センサの値が変化したら何らか実行する geolocation.watchPosition メソッド
navigator.geolocation.watchPosition( (position) => {
    var lat  = position.coords.latitude;            // 緯度を取得
    var lng  = position.coords.longitude;           // 経度を取得
    var accu = position.coords.accuracy;            // 緯度・経度の精度を取得
    showMyPos(lat, lng);                            // showMyPos 関数を実行
    calcDistance(lat, lng);
});
 
// 自分の位置を表示する showMyPos 関数
function showMyPos(lat, lng) {
    var myPos = new google.maps.LatLng(lat, lng);   // Googleマップの LatLng オブジェクトを作成
    gmap.setCenter(myPos);                          // gmap の中心を myPos の位置にする
    mark.setPosition(myPos);                        // mark の位置を myPos にする
}
 
// 地図の初期化
function initMap() {
    // 1回だけ現在位置を測定する getCurrentPosition メソッド
    var music = new Audio("sound/Check1.mp3");　　　　　　 // music変数をさくせい
    music.play();                                       // 音を流す            
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
        placeMermaids();                            // ★人魚を配置する
    }, (error) => {                                 // エラー処理（今回は特に何もしない）
    }, {
        enableHighAccuracy: true                    // 高精度で測定するオプション
    });
}
 
// ★人魚の情報を読み込む loadMermaids 関数
function loadMermaids() {
    var req = new XMLHttpRequest();                 // サーバのファイルを読む XMLHttpRequest
    req.addEventListener("readystatechange", () => {        // 準備状態に変化があった時の処理
        if(req.readyState === 4 && req.status === 200) {    // データ受信が正常に完了したら
            mermaids = JSON.parse(req.responseText);        // 読み込んだJSONデータを整形して人魚データに入れる
        }
    });
    req.open("GET", "mermaids.json");               // リクエストを設定
    req.send();                                     // リクエストを送る
}
 
// ★人魚を地図上に配置する placeMermaids 関数
function placeMermaids() {
    var mermaidMark = [];                           // 人魚マーカーの配列
    for(var i = 0; i < mermaids.length; i++) {      // 全ての人魚について
        var pos = new google.maps.LatLng(mermaids[i].lat, mermaids[i].lng); // 人魚の位置を設定
        var img = {                                 // 画像の設定
            url: mermaids[i].img,                   // 画像ファイル名
            scaledSize: new google.maps.Size(60, 60)    // 画像を縮小表示
        };
        mermaidMark[i] = new google.maps.Marker({   // 人魚のマーカーを作成
            map: gmap,                              // gmap の上に表示する
            position: pos,                          // pos の位置に
            icon: img,                              // アイコンを設定
            title: mermaids[i].name                 // タイトルを設定
        });
        captured[i] = false;                        // 捕獲済み状態を全てfalseにする
    }
    document.getElementById("testImg").src = mermaids[0].img;
}
 
// ★自分と人魚との距離を計算する calcDistance 関数
function calcDistance(lat, lng) {
    var distance = [];                              // 距離を入れる配列
    var myPos = new google.maps.LatLng(lat, lng);   // Googleマップの LatLng オブジェクトを作成
    for(var i = 0; i < mermaids.length; i++) {      // 全ての人魚について
        var pos = new google.maps.LatLng(mermaids[i].lat, mermaids[i].lng);                 // 人魚の位置を設定
        distance[i] = google.maps.geometry.spherical.computeDistanceBetween(myPos, pos);    // 距離を求める
        // 捕獲の判定と捕獲した時のエフェクト
        if(distance[i] < 20 && captured[i] === false) {         // 距離が20m未満、かつ、まだ捕獲していないなら
            var music = new Audio(mermaids[i].sound);　　　　　　 // music変数をさくせい
            music.play();                                       // 音を流す            
            captured[i] = true;                                 // 捕獲済にする
            get.hidden = false;                              // img要素を表示
            mapDiv.hidden = true;                               // 地図を非表示
            initPlayer(mermaids[i]);
            closeButton.addEventListener("click", () => {            // img要素がクリックされたら
                track.pause();
                get.hidden = true;                           // img要素を非表示
                mapDiv.hidden = false;                          // 地図を表示
            });
        }
    }
}

function Start(){
    testStart.addEventListener("click", () => {            // img要素がクリックされたら
        testStart.hidden = true;
        mapDiv.hidden = false;                          // 地図を表示
        initMap();
    });
}

// --------------ここからsound関係

function initPlayer(mermaid){
    track.src = mermaid.voice;
    thumbnail.src = mermaid.img;
    background.src = mermaid.img;
    trackTitle.textContent = mermaid.name;
}

let playing = true;

function pausePlay() {
  if (playing) {
    play.style.display = "none";
    pause.style.display = "block";

    thumbnail.style.transform = "scale(1.25)";

    track.play();
    playing = false;
  } else {
    pause.style.display = "none";
    play.style.display = "block";

    thumbnail.style.transform = "scale(1)";

    track.pause();
    playing = true;
  }
}

play.addEventListener("click", pausePlay);
pause.addEventListener("click", pausePlay);


function progressValue() {
  progressBar.max = track.duration;
  progressBar.value = track.currentTime;

  currentTime.textContent = formatTime(track.currentTime);
  durationTime.textContent = formatTime(track.duration);
}

setInterval(progressValue, 500);

function formatTime(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec - minutes * 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function changeProgressBar() {
  track.currentTime = progressBar.value;
}

progressBar.addEventListener("click", changeProgressBar);
