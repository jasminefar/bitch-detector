from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
import random

app = Flask(__name__)

RESPONSES = [
    "it's not looking good for you gang 💀",
    "You pull...? 👀",
    "certified Lover 💕💘",
    "rizz detected 😍😛😻",
    "You're HIM. Certified. 🔥🔥🔥",
    "You're HER. Certified. 🔥🔥🔥",
    "uglyahh get out",
    "GET OUT🤮🗣️🔥",
]

def analyze_face(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return "Error loading image. Try another."

    # random results
    return random.choice(RESPONSES)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return jsonify({'result': "No file uploaded!"})

    file = request.files['file']
    file_path = "static/uploaded.jpg"
    file.save(file_path)

    result = analyze_face(file_path)
    return jsonify({'result': result, 'image': file_path})

if __name__ == '__main__':
    app.run(debug=True)
