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


// Dummy function to simulate fetching a phone number based on contact name
function getPhoneNumber(contactName) {
    const contacts = {
        "Aatesh Kumar Singh": "+919839660325",
        // Add more contacts as needed
    };
    return contacts[contactName] || null; // Return the number or null if not found
}


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
    else if (message.includes("whatsapp")) {
        speak("opening whatsapp ")
        window.open("whatsapp://send?text=Hello");
    }

    else if (message.includes("contact")) {
        speak("Please tell me the name of the contact you want to call.");
    } else if (message.includes("call")) {
        // Extract the contact name and number from the message
        const contactMatch = message.match(/call (.+)/); // Example: "call John Doe"
        const phoneNumber = getPhoneNumber(contactMatch[1]); // Custom function to get number
    
        if (phoneNumber) {
            speak(`Calling ${contactMatch[1]}`);
            window.open(`tel:${phoneNumber}`);
        } else {
            speak("Sorry, I couldn't find that contact.");
        }
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
