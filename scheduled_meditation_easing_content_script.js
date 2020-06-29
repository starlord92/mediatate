// var iframe_reminder = document.createElement ("iframe");
// iframe_reminder.style.zIndex = "2147483647"; 
// iframe_reminder.style.display = "none";

// iframe_reminder.src  = chrome.extension.getURL ("/ease.html");
// document.body.appendChild(iframe_reminder);


var user_interacted_with_the_reminder = false;

//similuate the fadeout function in jquery
function fadeOutReminder() {
    var fadeTarget = document.getElementById("myModal472826662848262673");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } 
        else {
            clearInterval(fadeOutReminder);
        }
    }, 100);  
};

function stopVideo (callback) {

    var videos = [].slice.call(document.getElementsByTagName('video'), 0);
    console.log("number of videos: " + videos.length);
    for(i = 0;i < videos.length; i++)
    {
        videos[i].pause();
    }

    chrome.storage.sync.get(['stored_open_meditation_recording_page_flag'], function(data) {
        console.log('stored_open_meditation_recording_page_flag before the begin meditation button pressed is ' + data.stored_open_meditation_recording_page_flag);
    });

    callback();
};

function tell_background_script_to_open_meditation_recording_page () {
    stopVideo( function() {

        chrome.storage.sync.set({stored_open_meditation_recording_page_flag: true}, 
            function() {
                chrome.storage.sync.get(['stored_open_meditation_recording_page_flag'], function(data) {
                        console.log('stored_open_meditation_recording_page_flag is ' + data.stored_open_meditation_recording_page_flag);
                });
        });

        //fade out reminder and then hide it
        fadeOutReminder();
        document.getElementById('myModal472826662848262673').remove();
        document.getElementById('begin_meditation_button_66345654628423').remove();
        document.getElementById('skip_meditation_button_66345654628423').remove();
    });

    user_interacted_with_the_reminder = true;
};


var reminder_modal = document.createElement ("div");


  var reminder_modal = document.createElement("IMG");
  reminder_modal.setAttribute("src", "Artboard4.png");
  // reminder_modal.setAttribute("src", "https://cdn.statically.io/gh/chumptoro/git-visual/1bdd92ba/Artboard_2.png");

  

  reminder_modal.id = "myModal472826662848262673";


var begin_meditation_button = document.createElement ("div");
begin_meditation_button.id = "begin_meditation_button_66345654628423";
begin_meditation_button.innerHTML="begin meditation";

var skip_meditation_button = document.createElement ("div");
skip_meditation_button.id = "skip_meditation_button_66345654628423";
skip_meditation_button.innerHTML="skip";


reminder_modal.appendChild(begin_meditation_button);
reminder_modal.appendChild(skip_meditation_button);
document.body.appendChild(reminder_modal);



async function reminderAnimationSequence () {

    const show_reminder_and_begin_button = new Promise((resolve, reject) => {
        reminder_modal.style.display = "block";
        reminder_modal.style.animationPlayState = "running";
        console.log("show the reminder's animation and begin button");
        setTimeout(() => resolve("done!"), 60000);
    });
    let step1 = await show_reminder_and_begin_button;

    const show_skip_button = new Promise((resolve, reject) => {
        skip_meditation_button.style.display = "block"; 
        console.log("show skip meditation button");
        setTimeout(() => resolve("done!"), 1000);
    });
    let step2 = await show_skip_button;

    let fade_reminder = new Promise((resolve, reject) => {
        console.log("fade reminder");
        fadeOutReminder();
        //reminder_modal.style.animationPlayState = "paused";
        setTimeout(() => resolve("done!"), 2000);
    });
    let step3 = await fade_reminder;

    let hide_reminder = new Promise((resolve, reject) => {
        reminder_modal.display = "none";
        document.getElementById('myModal472826662848262673').remove();
        document.getElementById('begin_meditation_button_66345654628423').remove();
        document.getElementById('skip_meditation_button_66345654628423').remove();
        console.log("hide reminder");
    });
};

    reminderAnimationSequence();

    // user interaction: skip.  update the daily skipped meditation count   
    var skip_button = document.getElementById("skip_meditation_button_66345654628423");
    skip_button.addEventListener('click', fadeOutReminder); 

    var begin_meditation_button = document.getElementById("begin_meditation_button_66345654628423");
    begin_meditation_button.addEventListener('click', tell_background_script_to_open_meditation_recording_page); 




// window.onload = function() {

// var reminder_modal = document.createElement ("div");
// reminder_modal.id = "myModal472826662848262673";


// var begin_meditation_button = document.createElement ("div");
// begin_meditation_button.id = "begin_meditation_button_66345654628423";
// begin_meditation_button.innerHTML="begin meditation";

// var skip_meditation_button = document.createElement ("div");
// skip_meditation_button.id = "skip_meditation_button_66345654628423";
// skip_meditation_button.innerHTML="skip";


// reminder_modal.appendChild(begin_meditation_button);
// reminder_modal.appendChild(skip_meditation_button);
// document.body.appendChild(reminder_modal);




//     //takes care of user NON-interaction with the scheduled meditation reminder
//     chrome.runtime.onMessage.addListener(
//       function(incoming, sender, sendResponse) {

//         if (incoming.message == "dear scheduled_meditation_easing_content_script.js:  show scheduled mediation reminder to user") {
//             console.log("message to show scheduled mediation reminder to user is received");
//         }



//         if (incoming.message == "darken the screen" && user_interacted_with_the_reminder == false) {
//             console.log("message to darken the screen is received");
//         }


//         if (incoming.message == "darken the screen" && user_interacted_with_the_reminder == false) {
//             console.log("message to darken the screen is received");
//         }



//         if (incoming.message == "show breathing animation" && user_interacted_with_the_reminder == false) {
//         	console.log("message to show breathing animation is received");
//         	var modal = document.getElementById("myModal472826662848262673");
//     		modal.style.display = "block";
    		
//         	reminder_modal.style.animationPlayState = "running";
//         }

//         if (incoming.message == "skip meditation button shows up ; balloon animation stops on its own" && user_interacted_with_the_reminder == false) {
//         	console.log("message to show skip meditation button is received");
//        		var skip_button= document.getElementById("skip_meditation_button_66345654628423");
//     		skip_button.style.display = "block"; 
//         }

//         if (incoming.message == "fade out breathing animation" && user_interacted_with_the_reminder == false) {
//         	console.log("message to hide breathing animation is received");
//         	fadeOutReminder();
//         	reminder_modal.style.animationPlayState = "paused";
//         }

//         if (incoming.message == "hide breathing animation") {
//      		var modal = document.getElementById("myModal472826662848262673");
//      		modal.style.display = "none";
//             user_interacted_with_the_reminder = false;
//         }

//         return Promise.resolve("Dummy response to keep the console quiet");
//     });

//     // user interaction: skip.  update the daily skipped meditation count   
//     var skip_button = document.getElementById("skip_meditation_button_66345654628423");
//     skip_button.addEventListener('click', fadeOutReminder); 

//     var begin_meditation_button = document.getElementById("begin_meditation_button_66345654628423");
//     begin_meditation_button.addEventListener('click', tell_background_script_to_open_meditation_recording_page); 


// };










