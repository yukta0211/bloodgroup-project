import cv2
import numpy as np
from tensorflow.keras.models import load_model

model = load_model("blood_model.h5")

classes = ["A+","A-","AB+","AB-","B+","B-","O+","O-"]

img = cv2.imread("test.bmp")

if img is None:
    print("Image not found!")
    exit()

# SAME preprocessing as training
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.resize(gray,(128,128))
gray = cv2.equalizeHist(gray)

thresh = cv2.adaptiveThreshold(
    gray,
    255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY,
    11,
    2
)

img = thresh / 255.0
img = img.reshape(1,128,128,1)

prediction = model.predict(img)

result = classes[np.argmax(prediction)]

print("Predicted Blood Group:", result)