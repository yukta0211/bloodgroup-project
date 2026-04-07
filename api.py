import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from tensorflow.keras.models import load_model
from utils import preprocess_image, get_prediction_label
from pydantic import BaseModel
import base64

app = FastAPI(title="BloodScan API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model globally
model = load_model("blood_model.h5")

@app.post("/predict")
async def predict_blood_group(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        return {"error": "Invalid image file provided."}

    try:
        # Preprocess using existing project functionality
        processed_img, thresh = preprocess_image(img)
        
        # Predict
        prediction = model.predict(processed_img)
        result = get_prediction_label(prediction)
        confidence = float(np.max(prediction) * 100)
        
        # Optional: return the processed image back if we want to show it in UI
        # _, buffer = cv2.imencode('.png', thresh)
        # encoded_image = base64.b64encode(buffer).decode('utf-8')
        
        return {
            "blood_group": result,
            "confidence": confidence
        }
    except Exception as e:
         return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
