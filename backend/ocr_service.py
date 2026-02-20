from PIL import Image
import pytesseract

def extract_text_from_image(file):
    img = Image.open(file)
    return pytesseract.image_to_string(img)