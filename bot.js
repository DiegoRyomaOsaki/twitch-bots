// Replace the AWS_URL_BASE with your own URL to your AWS Lambda end point
const URL_BASE = "https://qa3ll5e539.execute-api.us-east-1.amazonaws.com/default/twitch-bot";
// AWS_POLLY_VOICE specifies which of the AWS Polly voices it should use
const AWS_POLLY_VOICE = "Mia";



window.addEventListener("onEventReceived", function ( obj ) {

    const data = obj.detail.event && obj.detail.event.data;
    console.log("data=", data);
    if( !data ) {
        return;
    }

    if( data.text.indexOf("!digo ") !== 0 ) {
        return;
    }

    const text = data.text.substring(5);
    const name = data.nick;
    console.log("text=\"" + text + "\".");
    const texto = name +" Dice: "+text;
    speak(texto);

});

function speak( text ) {

    const src = URL_BASE + "?voice=" + AWS_POLLY_VOICE + "&text=" + encodeURIComponent(text);

    const audioTag = document.createElement("AUDIO");
    audioTag.src = src;   
    audioTag.play();
    document.body.appendChild(audioTag);
    audioTag.addEventListener("ended", () => {
        audioTag.remove();
    });
    
}