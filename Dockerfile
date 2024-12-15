FROM python:3.9-slim

# Install required libraries
RUN pip install flask flask-wtf transformers torch torchvision torchaudio

# Copy application files
COPY app/ /app/

WORKDIR /app

EXPOSE 5000

CMD ["python", "app.py"]
