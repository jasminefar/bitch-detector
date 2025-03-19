document.getElementById("start-btn").addEventListener("click", function() {
    document.getElementById("upload-section").classList.remove("hidden");
});

document.getElementById("upload-btn").addEventListener("click", function() {
    let fileInput = document.getElementById("file-input").files[0];
    if (!fileInput) {
        alert("Please upload an image!");
        return;
    }

    let formData = new FormData();
    formData.append("file", fileInput);

    fetch("/analyze", { method: "POST", body: formData })
        .then(response => response.json())
        .then(data => {
            document.getElementById("result-text").innerText = data.result;
            document.getElementById("result-img").src = data.image;
            document.getElementById("result-section").classList.remove("hidden");
        });
});

// Webcam Capture
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let captureBtn = document.getElementById("capture-btn");

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
});

captureBtn.addEventListener("click", function() {
    let context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob((blob) => {
        let formData = new FormData();
        formData.append("file", blob, "webcam.jpg");

        fetch("/analyze", { method: "POST", body: formData })
            .then(response => response.json())
            .then(data => {
                document.getElementById("result-text").innerText = data.result;
                document.getElementById("result-img").src = data.image;
                document.getElementById("result-section").classList.remove("hidden");
            });
    });
});
