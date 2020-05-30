function fadeInEffect() {
    var fadeTarget = document.getElementById("skip_meditation_button_66345654628423");

    

    var fadeEffect = setInterval(function () {

        if (fadeTarget.style.opacity < 1) {
            fadeTarget.style.opacity =  fadeTarget.style.opacity + 0.1;
        } 
        else {
            clearInterval(fadeInEffect);
        }
    }, 200);
}

function fadeOutEffect() {
    var fadeTarget = document.getElementById("begin_meditation_button_66345654628423");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } 
        else {
            clearInterval(fadeOutEffect);
        }
    }, 100);
}

// var exec = fadeOutEffect("begin_meditation_button_66345654628423");


$(document).ready(function() {

    // document.getElementById("begin_meditation_button_66345654628423").addEventListener('click', fadeOutEffect);

        document.getElementById("begin_meditation_button_66345654628423").addEventListener('click', fadeInEffect);

// fadeInEffect();




});