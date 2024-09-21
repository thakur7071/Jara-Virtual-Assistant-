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
    else if (message.includes("whatsapp")) {
        speak("opening whatsapp ")
        window.open("whatsapp://send?text=Hello");
    }

    else if (message.includes("camera")) {
        speak("Opening camera");
    
        // Create a video element to display the camera feed
        const video = document.createElement('video');
        video.autoplay = true;
        document.body.appendChild(video);
    
        // Create a canvas element to capture the image
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
    
        // Create a button to take a photo
        const button = document.createElement('button');
        button.innerText = "Take Photo";
        document.body.appendChild(button);
    
        // Create a link element for downloading the image
        const downloadLink = document.createElement('a');
        downloadLink.innerText = "Download Photo";
        downloadLink.style.display = 'none'; // Initially hide the link
        downloadLink.style.marginTop = '10px'; // Spacing for the download link
        document.body.appendChild(downloadLink);
    
        // Create an image element to display the captured photo
        const capturedImage = document.createElement('img');
        capturedImage.id = "capturedImage"; // Added ID for styling
        capturedImage.style.display = 'none'; // Initially hide the image
        capturedImage.style.marginTop = '10px'; // Spacing for the image
        document.body.appendChild(capturedImage);
    
        // Request access to the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                // Set the video source to the camera stream
                video.srcObject = stream;
    
                // When the button is clicked, capture the image
                button.onclick = () => {
                    // Set canvas dimensions to video dimensions
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
    
                    // Draw the video frame onto the canvas
                    const context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0);
    
                    // Convert the canvas to a data URL
                    const photoData = canvas.toDataURL('image/png');
                    console.log('Photo taken:', photoData); // Log the data URL
    
                    // Set the captured image source
                    capturedImage.src = photoData;
                    capturedImage.style.display = 'block'; // Show the captured image
    
                    // Set the download link
                    downloadLink.href = photoData;
                    downloadLink.download = 'captured_photo.png'; // Specify the filename
                    downloadLink.style.display = 'block'; // Show the download link
    
                    // Stop the video stream
                    stream.getTracks().forEach(track => track.stop());
                    video.remove(); // Remove the video element
                    button.remove(); // Remove the button
                };
            })
            .catch((error) => {
                console.error("Error accessing the camera:", error);
                speak("Unable to access the camera.");
            });
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
