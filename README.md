# Voice Messages To Text

## Project Overview
**Voice Messages To Text** is a Chrome extension and server combination designed to convert Facebook voice messages into text. It allows you to scrape Facebook voice messages and send them to a server that transcribes the audio into text. Note that this tool does not work on voice messages that have been blobbed by Facebook.

This project is treated as a template demonstrating two key functionalities:
- **Chrome Extension**: Scraping voice messages, sending audio data to a server, and receiving the transcribed response.
- **Server**: Receiving the audio data from the extension and transcribing it into text using speech-to-text services.

## Tech Stack
- **Chrome Extension**: JavaScript (for scraping, API requests, and handling responses)
- **Server**: FastAPI, Celery, RabbitMQ, Docker
- **Speech-to-Text**: OpenAI Whisper

---

## Installation
Navigate to the directory where you have downloaded this project.

### Chrome Extension
The extension is located at `voicemsgtotext` directory inside of this project.
Follow standard approach for adding external extension to your Google Chrome [How to add custom extension Google Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

### Server
Ensure that you have docker configured on your computer [Docker Get Started](https://docs.docker.com/get-started/).
Open terminal at the project directory `voicemsgtotext_server` and run:
```
docker-compose up --build
```
This will set up the server for transcribing.

---

## Usage
1. Open your Facebook Messenger in the Chrome browser.
2. Open the Chrome extension and play the voice message.
3. The extension will show found voice messages.
4. Click on the found voice message.
3. The extension will send the voice message data to the server.
4. The server processes the voice message and sends back the transcribed text.
5. The extension will display the transcription.

---

## Disclaimer
This project, **Voice Messages To Text**, is provided as a template for educational and demonstration purposes. It is not a fully developed production tool, and some functionalities may not work as intended or may require further refinement. Specifically, the project may encounter limitations when dealing with certain Facebook voice messages, especially those that have been blobbed by Facebook or are otherwise encrypted.

The code and setup are designed as a starting point for building a Chrome extension and server-based transcription system. 

Use this template at your own risk, and feel free to customize it to suit your requirements!
