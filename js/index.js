// \n  "facingMode": environment
// let videoDefaultConstraintString = '{\n  "width": 100%,\n  "height": 100%,\n  "frameRate": 30\n}';
// let audioDefaultConstraintString = '{\n  "sampleSize": 16,\n  "channelCount": 2,\n  "echoCancellation": true\n}';
// let videoConstraints = null;
// let audioConstraints = null;

// shuffles value in wheel
const shuffle = (array) => {
  return array.sort(() => 0.5 - Math.random());
};

function buildConstraints() {
  try {
    // videoConstraints = JSON.parse(videoDefaultConstraintString.);
    // audioConstraints = JSON.parse(audioDefaultConstraintString);
  } catch (error) {
    handleError(error);
  }
}

function startVideo() {
  // buildConstraints();
  navigator.mediaDevices
    .getUserMedia({
      video: {
        // minAspectRatio: 1.333,
        frameRate: 60,
        width: "750",
        heigth: "1624",
        facingMode: {
          exact: "environment",
        },
      },
      audio: false,
    })
    .then(function (stream) {
      // let audioTracks = stream.getAudioTracks();
      let videoTracks = stream.getVideoTracks();

      videoElement.srcObject = stream;
      if (audioTracks.length) {
        audioTrack = audioTracks[0];
      }
      if (videoTracks.length) {
        videoTrack = videoTracks[0];
      }
    })
    .then(function () {
      new Promise(function (resolve) {
        videoElement.onloadedmetadata = resolve;
      });
    })
    .then(function () {
      getCurrentSettings();
    })
    .catch(handleError);
}
function log(msg) {
  // logElement.innerHTML += (msg + "<br>");
}

function handleError(reason) {
  log(
    "Error <code>" +
      reason.name +
      "</code> in constraint <code>" +
      reason.constraint +
      "</code>: " +
      reason.message
  );
}

let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

//Usage

//load your JSON (you could jQuery if you prefer)
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "./wheel_data.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      //Call the anonymous function (callback) passing in the response
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

//your own function to capture the spin results
function myResult(e) {
  //e is the result object
  if (!e.win) {
    document.getElementById("button-text").innerText = "Try Again";
  }
  console.log(
    "Spin Count: " +
      e.spinCount +
      " - " +
      "Win: " +
      e.win +
      " - " +
      "Message: " +
      e.msg
  );

  // if you have defined a userData object...
  // if (e.userData) {
  //   console.log("User defined score: " + e.userData.score);
  // }

  //if(e.spinCount == 3){
  //show the game progress when the spinCount is 3
  //console.log(e.target.getGameProgress());
  //restart it if you like
  //e.target.restart();
  //}
}

//your own function to capture any errors
function myError(e) {
  //e is error object
  //console.log("Spin Count: " + e.spinCount + " - " + "Message: " + e.msg);
}

function myGameEnd(e) {
  //e is gameResultsArray
  console.log(e);
  TweenMax.delayedCall(5, function () {
    Spin2WinWheel?.reset();
  });
}

function init() {
  var jsonData = {
    colorArray: [
      "#F4B8DA",
      "#6C6C6B",
      "#F9CC0D",
      "#A5DCEC",
      "#6C6C6B",
      "#A5DCEC",
    ],
    colorTextArray: [
      "##fff",
      "#fff",
      "#fff",
      "#fff",
      "#fff",
      "#ffcc33",
      "#CA0300",
      "#27AE60",
      "#2980B9",
      "#8E44AD",
      "#553C9A",
      "#F39C12",
      "#D35400",
      "#C0392B",
      "#BDC3C7",
      "#1ABC9C",
      "#2ECC71",
      "#E87AC2",
      "#3498DB",
      "#9B59B6",
      "#7F8C8D",
    ],

    segmentValuesArray: shuffle([
      {
        probability: 10,
        type: "image",
        value: "./../media/images/w-text-1.png",
        win: true,
        resultText: "  20% הנחה על כל קנייה",
        userData: {
          score: 1000000,
        },
      },
      {
        probability: 10,
        type: "string",
        value: "You Lost",
        win: false,
        resultText: "5% הנחה על כל קנייה",
        userData: {
          score: 0,
        },
      },
      {
        probability: 10,
        type: "image",
        value: "./../media/images/w-text-3.png",
        win: true,
        resultText: "משלוח חינם",
        userData: {
          score: 100,
        },
      },
      {
        probability: 10,
        type: "image",
        value: "./../media/images/w-text-4.png",
        win: true,
        resultText: "15% הנחה על כל קנייה",
        userData: {
          score: 50,
        },
      },
      {
        probability: 10,
        type: "string",
        value: "You Lost",
        win: false,
        resultText: "קניה באתר ללא מע''מ",
        userData: {
          score: 0,
        },
      },
      {
        probability: 10,
        type: "string",
        value: "You Lost",
        win: false,
        resultText: " הפתעה בכל קנייה",
        userData: {
          score: 0,
        },
      },
      {
        probability: 10,
        type: "image",
        value: "./../media/images/w-text-1.png",
        win: true,
        resultText: "  20% הנחה על כל קנייה",
        userData: {
          score: 1000000,
        },
      },
      {
        probability: 10,
        type: "string",
        value: "You Lost",
        win: false,
        resultText: "5% הנחה על כל קנייה",
        userData: {
          score: 0,
        },
      },
    ]),
    svgWidth: 800,
    svgHeight: 800,
    wheelStrokeColor: "#000",
    wheelStrokeWidth: 6,
    wheelSize: 650,
    wheelTextOffsetY: 80,
    wheelTextColor: "#fff",
    wheelTextSize: "2.3em",
    wheelImageOffsetY: 22,
    wheelImageSize: 100,
    centerCircleSize: 20,
    centerCircleStrokeColor: "black",
    centerCircleStrokeWidth: 3,
    centerCircleFillColor: "#EDF2F7",
    segmentStrokeColor: "#E2E2E2",
    segmentStrokeWidth: 0,
    centerX: 390,
    centerY: 442,
    hasShadows: false,
    numSpins: 100,
    spinDestinationArray: [],
    minSpinDuration: 6,
    gameOverText: "GAME OVER",
    invalidSpinText: "INVALID SPIN. PLEASE SPIN AGAIN.",
    introText: "",
    hasSound: true,
    gameId: "9a0232ec06bc431114e2a7f3aea03bbe2164f1aa",
    clickToSpin: true,
    spinDirection: "ccw",
    spinButton: ".spin-btn",
  };

  //if you want to spin it using your own button, then create a reference and pass it in as spinTrigger
  var mySpinBtn = document.querySelector(".spin-btn");

  //create a new instance of Spin2Win Wheel and pass in the vars object
  var myWheel = new Spin2WinWheel();

  //WITH your own button
  myWheel.init({
    data: jsonData,
    onResult: myResult,
    onGameEnd: myGameEnd,
    onError: myError,
    spinTrigger: mySpinBtn,
  });

  //WITHOUT your own button
  //myWheel.init({data:jsonData, onResult:myResult, onGameEnd:myGameEnd, onError:myError});
  // });
  startVideo();
}

//And finally call it
init();

window.onGameLost = function () {
  window.parent.postMessage(JSON.stringify({ type: "GAME_LOST" }), "*");
};
window.onGameWon = function (prizeCoupon) {
  window.parent.postMessage(
    JSON.stringify({ type: "GAME_WON", data: { prizeCoupon } }),
    "*"
  );
};
window.onGameLoaded = function () {
  window.parent.postMessage(JSON.stringify({ type: "GAME_LOADED" }), "*");
};
window.setcolorone = function (color) {
  pp.setColor(color);
};
var params3 = new URLSearchParams(window.location.search);
params3.append("buttonText", "PressHereToPlay");

console.log(params3);

var titleText = params3.get("title");
var logoImage = params3.get("logoImage");
var subtitleText = params3.get("subtitle");
var buttonText = params3.get("buttonText");
console.log(buttonText);
var image = params3.get("image");
var base = params3.get("base");
// var baseLogo = params3.get("baseLogo");

// document.getElementById("title1").innerText = titleText; @wiply remove title
// document.getElementById("subtitle").innerText = subtitleText; @wiply remove subtitle
// if ((logoImage && logoImage.replace(/ /g, "")) !== "undefined")
//   document.querySelector(".logo-image").src = logoImage;
// document.querySelector(".logo-image").alt = "";
// if ((baseLogo && baseLogo.replace(/ /g, "")) !== "undefined") {
//   document.querySelector(".base-logo").src = baseLogo;
//   document.querySelector(".base-logo").alt = "";
// }

if (buttonText) document.getElementById("button-text").innerText = buttonText;
if (!buttonText) document.getElementById("button-text").style.display = "none";
if (base) document.querySelector("#baseWheel").setAttribute("href", base);

// if (image) {
//   const img = document.querySelector(".logo-image");
//   img.src = image;
//   img.alt = "";
//   img.style.display = "none"; //@remove the image from base
// }

if (logoImage) {
  const img2 = document.querySelector("#logo-image-title");
  img2.src = logoImage;
  img2.alt = "";
  img2.style.display = "block";
}
