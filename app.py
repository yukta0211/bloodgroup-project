import streamlit as st
import cv2
import numpy as np
from tensorflow.keras.models import load_model

model = load_model("blood_model.h5")

classes = ["A+","A-","AB+","AB-","B+","B-","O+","O-"]

st.title("Fingerprint Blood Group Detection")

uploaded_file = st.file_uploader("Upload Fingerprint Image")

if uploaded_file:
    file_bytes = np.asarray(bytearray(uploaded_file.read()), dtype=np.uint8)
    img = cv2.imdecode(file_bytes, 1)

    st.image(img, caption="Uploaded Image")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray,(128,128))
    gray = cv2.equalizeHist(gray)

    thresh = cv2.adaptiveThreshold(
        gray,255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,2
    )

    st.image(thresh, caption="Processed Fingerprint")

    img = thresh / 255.0
    img = np.reshape(img,(1,128,128,1))

    prediction = model.predict(img)

    result = classes[np.argmax(prediction)]
    confidence = np.max(prediction) * 100

    st.success(f"Prediction: {result}")
    st.write(f"Confidence: {confidence:.2f}%")