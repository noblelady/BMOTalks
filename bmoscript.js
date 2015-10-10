var start_timestamp;
if (!('webkitSpeechRecognition' in window))
{
  start_button.style.visibility = 'hidden';
  document.getElementById('msg').innerHTML="Web Speech API is not supported by this browser. Upgrade to //www.google.com/chrome Chrome version 25 or later.";
}
else
{
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  var final_transcript='';
  var recognizing = false;
  var ignore_onend;
  recognition.onstart = function()
  {
    recognizing = true;
    //document.getElementById('msg').innerHTML="Started";
    document.getElementById('BMO').src = "images/BMO_Base.png";
    start_img.src = 'images/mic-animate.gif';
  }
  recognition.onresult = function(event)
  {
    var interim_transcript = '';
     for (var i = event.resultIndex; i < event.results.length; ++i)
     {
      if (event.results[i].isFinal)
      {
        final_transcript += event.results[i][0].transcript;
      }
      else
      {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_span.innerHTML = final_transcript;
    interim_span.innerHTML = interim_transcript;
  }
  recognition.onerror = function(event)
  {
    if (event.error == 'no-speech') {
      start_img.src = 'images/mic.gif';
      document.getElementById('msg').innerHTML="No Speech Found.";
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'images/mic.gif';
      document.getElementById('msg').innerHTML = "No Microphone Found.";
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        document.getElementById('msg').innerHTML = "Application Blocked.";
      } else {
        document.getElementById('msg').innerHTML="Denied Microphone Access.";
      }
      ignore_onend = true;
      document.getElementById('BMO').src = "images/BMO_Error.png";
    }
  }
  recognition.onend = function()
  {
    recognizing = false;
    if (ignore_onend)
    {
      return;
    }
    start_img.src = 'images/mic.gif';
    document.getElementById('BMO').src = "images/BMO_Base.png";
    var bmoTxt = final_transcript;
    bmoSays(bmoTxt);
  }
}
function startButton(event) 
{
  if (recognizing) {
    recognition.stop();
    return;
  }
    final_transcript = '';
    recognition.lang = ['English',['en-US', 'United States']];
    recognition.start();
    ignore_onend = false;
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
    document.getElementById('msg').innerHTML='started listening';
    start_img.src = 'images/mic-slash.gif';
    start_timestamp = event.timeStamp;
}
//this fuction will check what the person said and will use the appropiate sound file
var audioHello        = new Audio('sound_files/BMO_Hello.mp3');
var friendSong        = new Audio('sound_files/BMO_FriendSong.mp3');
var pregnantSong      = new Audio('sound_files/BMO_Pregnant.mp3');
var interstingResponse = new Audio('sound_files/BMO_InterestingResponse.mp3');
var yay               = new Audio('sound_files/BMO_Yay.mp3');
var endTxt = document.getElementById('final_span');
function bmoSays(txt)
{
  if(txt == 'hello')
  {
    document.getElementById('BMO').src = "images/BMO_Happy_Talking.png";
    audioHello.play();
  }
  if(txt == 'sing a song')
  {
    document.getElementById('BMO').src = "images/BMO_Singing.gif";
    document.getElementById('BMO').style.display = '';  // show it, and then...
    document.getElementById('BMO').innerHTML = document.getElementById('BMO').innerHTML;
    var randNum = Math.floor((Math.random() * 10) + 1);
    if(randNum <=5)
    {
      friendSong.play();
    }
    else
    {
      pregnantSong.play();
    }
  }
  if(txt == "let's play")
  {
    document.getElementById('BMO').src = "images/BMO_Happy_Talking.png";
    yay.play();
  }
  // else
  // {
  //   document.getElementById('BMO').src = "images/BMO_Happy_Talking.png";
  //   interstingResponse.play();
  // }
}
function speakingEnded()
{
  document.getElementById('BMO').src = "images/BMO_Base.png";
}