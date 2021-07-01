//https://teachablemachine.withgoogle.com/models/Xj4J-k5kJ/
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
Camera = document.getElementById("camera");
Webcam.attach(Camera);
function takeSnapShot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id = 'captured_image' src = '"+data_uri+"'>";
    });
}
console.log("ml5 version"+ ml5.version);
ml5classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tSEnlDwll/model.json",modelLoaded);
function modelLoaded(){
    console.log("MODEL IS LOADED!");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "the first prediction is "+prediction_1;
    speak_data2 = "the second prediction is "+prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}
function Check(){
    img = document.getElementById("captured_image");
    ml5classifier.classify(img, gotResult);
}
function gotResult(error, success){
    if(error){
        console.error(error);
    }
    else{
        console.log(success);
        prediction_1 = success[0].label;
        prediction_2 = success[1].label;
        document.getElementById("resultEmotionName1").innerHTML = success[0].label;
        document.getElementById("resultEmotionName2").innerHTML = success[1].label;
        speak();
        if(success[0].label == "Amazing"){
            document.getElementById("updateEmoji1").innerHTML = "&#128076;";
        }
        if(success[0].label == "ThumbsUp"){
            document.getElementById("updateEmoji1").innerHTML = "&#128077;";
        }
        if(success[0].label == "ThumbsDown"){
            document.getElementById("updateEmoji1").innerHTML = "&#128078;";
        }
        if(success[1].label == "Amazing"){
            document.getElementById("updateEmoji2").innerHTML = "&#128076;";
        }
        if(success[1].label == "ThumbsUp"){
            document.getElementById("updateEmoji2").innerHTML = "&#128077;";
        }
        if(success[1].label == "ThumbsDown"){
            document.getElementById("updateEmoji2").innerHTML = "&#128078;";
        }
        


    }
    
}