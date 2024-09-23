let btn = document.querySelector('#btn')
let content = document.querySelector('#content')
let voice = document.querySelector('#voice')

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.lang = "en-IN";
    text_speak.volume = 1
    window.speechSynthesis.speak(text_speak)
}

// function wishMe() {
//     let day = new Date()
//     let hours = day.getHours()
//     if (hours >= 0 && hours < 12) {
//         speak("Good morning Sir")
//     } else if (hours >= 12 && hours < 16) {
//         speak("Good afternoon sir")
//     } else {
//         speak("Good evening sir")
//     }
// }

// window.addEventListener('load',()=>{
//     wishMe()
// })



let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerHTML = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    if (message.includes("hello") || message.includes("jarvis")) {
        speak("hello sir, what can i help you?")
    }
    else if (message.includes("who are you")) {
        speak("i am jara, created by Naveen Sir")
    }
    else if (message.includes("open youtube")) {
        speak("opening youtube")
        window.open("https://www.youtube.com/")
    }
    else if (message.includes("open google")) {
        speak("opening google")
        window.open("https://www.google.co.in/")
    }
    else if (message.includes("open whatsapp")){
        const contacts = {
            aatish: "9839660325",
            anubhav: "918076649082",
            suraj: "918009139813"
            // Add more contacts as needed
        };
    
        const name = message.split("call ")[1]; // Extract the name after "call "
        const phoneNumber = contacts[name.toLowerCase()]; // Get the phone number
    
        if (phoneNumber) {
            speak(`okay sir i got it  calling ${name} on WhatsApp`);
            window.open(`whatsapp://call?phone=${phoneNumber}`);
        } else {
            speak("Sorry, I don't have that contact.");
        }
    }
    
    else if (message.includes("open contact")) {
        speak("Opening your contacts. Please choose a contact to call.");
        
        // Open the contacts app using a URL scheme (this may work on mobile devices)
        window.open("tel:");
    }
    
    
    
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        speak(time)
    }

    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" })
        speak(date)
    }
    else {
        let finalText = "this is what i found on internet regarding" + message.replace("jara", "")
        speak(finalText)
        window.open(`https://www.google.co.in/search?q=${message.replace("jara", "")}`, "_blank")
    }

}
