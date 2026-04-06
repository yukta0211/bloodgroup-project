import streamlit as st
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from utils import preprocess_image, get_prediction_label

model = load_model("blood_model.h5")

st.title("AI-Based Blood Group Detection using Fingerprint")

st.write("Upload a fingerprint image to predict the blood group using a trained CNN model.")

uploaded_file = st.file_uploader("Upload Fingerprint Image")

if uploaded_file:
    file_bytes = np.asarray(bytearray(uploaded_file.read()), dtype=np.uint8)
    img = cv2.imdecode(file_bytes, 1)

    st.subheader("Uploaded Image")
    st.image(img)

    # Preprocess using utils
    processed_img, thresh = preprocess_image(img)

    st.subheader("Processed Fingerprint")
    st.image(thresh)

    prediction = model.predict(processed_img)

    result = get_prediction_label(prediction)
    confidence = np.max(prediction) * 100

    st.subheader("Prediction Result")
    st.success(f"Blood Group: {result}")

    st.subheader("Confidence Level")
    st.progress(int(confidence))
    st.write(f"{confidence:.2f}%")