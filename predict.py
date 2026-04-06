import cv2
from tensorflow.keras.models import load_model
from utils import preprocess_image, get_prediction_label

model = load_model("blood_model.h5")

img = cv2.imread("test.bmp")

if img is None:
    print("Image not found!")
    exit()

processed_img, _ = preprocess_image(img)

prediction = model.predict(processed_img)

result = get_prediction_label(prediction)

print("Predicted Blood Group:", result)