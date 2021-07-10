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

var CheckPoints = [
    {
        "name": "1_ElmnoMori",
        "lat":43.071049,
        "lng":141.347466,
        "pointer":"img/CP1.png",
        "img":"img/1.png",
        "sound":"sound/Check1.mp3",
        "voice":"sound/1_elm_forest.mp3"
    },
    {
        "name": "2_Elm",
        "lat":43.071211,
        "lng":141.347070,
        "pointer":"img/CP2.png",
        "img":"img/2.png",
        "sound":"sound/Check2.mp3",
        "voice":"sound/2_elm.mp3"
    },
    {
        "name": "3_Urai",
        "lat":43.072247,
        "lng":141.345256,
        "pointer":"img/CP3.png",
        "img":"img/3.png",
        "sound":"sound/Check3.mp3",
        "voice":"sound/3_urai.mp3"
    },
    {
        "name": "4_hurukawa",
        "lat":43.071165,
        "lng":141.343563,
        "pointer":"img/CP1.png",
        "img":"img/1.png",
        "sound":"sound/Check1.mp3",
        "voice":"sound/4_hurukawa.mp3"
    },
    {
        "name": "5_Clark",
        "lat":43.070670,
        "lng":141.343381,
        "pointer":"img/CP2.png",
        "img":"img/2.png",
        "sound":"sound/Check2.mp3",
        "voice":"sound/5_clark.mp3"
    },
    {
        "name": "6_OldBuilding",
        "lat":43.070854,
        "lng":141.342474,
        "pointer":"img/CP3.png",
        "img":"img/3.png",
        "sound":"sound/Check3.mp3",
        "voice":"sound/6_oldbuilding.mp3"
    },
    {
        "name": "7_Musium",
        "lat":43.072691,
        "lng":141.342391,
        "pointer":"img/CP1.png",
        "img":"img/1.png",
        "sound":"sound/Check1.mp3",
        "voice":"sound/7_musiam.mp3"
    },
    {
        "name": "8_OnoPond",
        "lat":43.074359,
        "lng":141.341918,
        "pointer":"img/CP2.png",
        "img":"img/2.png",
        "sound":"sound/Check2.mp3",
        "voice":"sound/8_musiam.mp3"
    },
    {
        "name": "9_SakshkotoniRiv",
        "lat":43.074226,
        "lng":141.341126,
        "pointer":"img/CP3.png",
        "img":"img/3.png",
        "sound":"sound/Check3.mp3",
        "voice":"sound/9_sksktnLi.mp3"
    },
    {
        "name": "10_Popla",
        "lat":43.075222,
        "lng":141.336632,
        "pointer":"img/CP1.png",
        "img":"img/1.png",
        "sound":"sound/Check1.mp3",
        "voice":"sound/10_popla.mp3"
    },
    {
        "name": "11_LuinGurden",
        "lat":43.058824,
        "lng":141.332275,
        "pointer":"img/CP2.png",
        "img":"img/2.png",
        "sound":"sound/Check2.mp3",
        "voice":"sound/11_ruin.mp3"
    },
    {
        "name": "ModelBurn",
        "lat":43.081698,
        "lng":141.339938,
        "pointer":"img/CP3.png",
        "img":"img/3.png",
        "sound":"sound/Check3.mp3",
        "voice":"sound/11_ruin.mp3"
    },
    {
        "name": "Enyu",
        "lat":43.081212,
        "lng":141.341672,
        "pointer":"img/CP1.png",
        "img":"img/1.png",
        "sound":"sound/Check1.mp3",
        "voice":"sound/11_ruin.mp3"
    }
];                                  // ★人魚の情報を入れる変数
var captured = [];                                  // ★人魚を捕獲済みか否かを入れる変数
var getImg = document.getElementById("getImg");     // ★img要素の取得
// loadCheckPoints();                                     // ★人魚の情報を読み込む

// GPS センサの値が変化したら何らか実行する geolocation.watchPosition メソッド
navigator.geolocation.watchPosition( (position) => {
    var lat  = position.coords.latitude;            // 緯度を取得
    var lng  = position.coords.longitude;           // 経度を取得
    var accu = position.coords.accuracy;            // 緯度・経度の精度を取得
    showMyPos(lat, lng);                            // showMyPos 関数を実行
    calcDistance(lat, lng);
    console.log(lat + "," + lng);
});

// 自分の位置を表示する showMyPos 関数
function showMyPos(lat, lng) {
    var myPos = new google.maps.LatLng(lat, lng);   // Googleマップの LatLng オブジェクトを作成
    gmap.setCenter(myPos);                          // gmap の中心を myPos の位置にする
    mark.setPosition(myPos);                        // mark の位置を myPos にする
}

// 地図の初期化
function initMap() {
    var start = document.getElementById("StartButtonDiv");
    start.hidden = true;
    var mainDiv = document.getElementById("mainDiv");
    mainDiv.hidden = false;
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
        placeCheckPoints();                            // ★人魚を配置する
    }, (error) => {                                 // エラー処理（今回は特に何もしない）
    }, {
        enableHighAccuracy: true                    // 高精度で測定するオプション
    });
}


// // ★人魚の情報を読み込む loadMermaids 関数
// function loadCheckPoints() {
//     var req = new XMLHttpRequest();                 // サーバのファイルを読む XMLHttpRequest
//     req.addEventListener("readystatechange", () => {        // 準備状態に変化があった時の処理
//         if(req.readyState === 4 && req.status === 200) {    // データ受信が正常に完了したら
//             CheckPoints = JSON.parse(req.responseText);        // 読み込んだJSONデータを整形して人魚データに入れる
//         }
//     });
//     req.open("GET", "mermaids.json");               // リクエストを設定
//     req.send();                                     // リクエストを送る
// }


// ★人魚を地図上に配置する placeCheckPoints 関数
function placeCheckPoints() {
    var mermaidMark = [];                           // 人魚マーカーの配列
    for(var i = 0; i < CheckPoints.length; i++) {      // 全ての人魚について
        var pos = new google.maps.LatLng(CheckPoints[i].lat, CheckPoints[i].lng); // 人魚の位置を設定
        var img = {                                 // 画像の設定
            url: CheckPoints[i].pointer,                   // 画像ファイル名
            scaledSize: new google.maps.Size(60, 60)    // 画像を縮小表示
        };
        mermaidMark[i] = new google.maps.Marker({   // 人魚のマーカーを作成
            map: gmap,                              // gmap の上に表示する
            position: pos,                          // pos の位置に
            icon: img,                              // アイコンを設定
            title: CheckPoints[i].name                 // タイトルを設定
        });
        captured[i] = false;                        // 捕獲済み状態を全てfalseにする
    }
}
 
// ★自分と人魚との距離を計算する calcDistance 関数
function calcDistance(lat, lng) {
    var distance = [];                              // 距離を入れる配列
    var myPos = new google.maps.LatLng(lat, lng);   // Googleマップの LatLng オブジェクトを作成
    for(var i = 0; i < CheckPoints.length; i++) {      // 全ての人魚について
        var pos = new google.maps.LatLng(CheckPoints[i].lat, CheckPoints[i].lng);                 // 人魚の位置を設定
        distance[i] = google.maps.geometry.spherical.computeDistanceBetween(myPos, pos);    // 距離を求める
        // 捕獲の判定と捕獲した時のエフェクト
        if(distance[i] < 20 && captured[i] === false) {         // 距離が20m未満、かつ、まだ捕獲していないなら
            var music = new Audio(CheckPoints[i].sound);　　　　　　 // music変数をさくせい
            music.play();                                       // 音を流す            
            captured[i] = true;                                 // 捕獲済にする
            get.hidden = false;                              // img要素を表示
            mainDiv.hidden = true;                               // 地図を非表示
            initPlayer(CheckPoints[i]);
            closeButton.addEventListener("click", () => {            // img要素がクリックされたら
                track.pause();
                get.hidden = true;                           // img要素を非表示
                mainDiv.hidden = false;                          // 地図を表示
            });
        }
    }
}

function ReLoad(){
    initMap();
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
