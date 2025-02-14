# import requests

# # Replace with your bot token
# BOT_TOKEN = "7846765291:AAFit5H5GUyfuRognuw8gTjl5HE-axKni-0"

# # Replace with your chat ID (use @userinfobot to find your chat ID)
# CHAT_ID = "5457599845"

# # Message you want to send
# MESSAGE = "Hello from my Telegrt!"

# # Telegram API URL
# url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

# # Payload data
# payload = {
#     "chat_id": CHAT_ID,
#     "text": MESSAGE
# }

# # Sending request
# response = requests.post(url, data=payload)

# # Print response
# print(response.json())

import requests
import threading
import time

# Replace with your bot token
BOT_TOKEN = "7846765291:AAFit5H5GUyfuRognuw8gTjl5HE-axKni-0"

# Replace with your chat ID
CHAT_ID = "5457599845"

# Telegram API Base URL
BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

# Function to send a message to Telegram
def send_message(text):
    url = f"{BASE_URL}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": text}
    requests.post(url, data=payload)

# Function to get new messages continuously
def receive_messages():
    global last_update_id
    while True:
        url = f"{BASE_URL}/getUpdates"
        params = {"offset": last_update_id + 1, "timeout": 5}
        response = requests.get(url, params=params).json()

        if "result" in response and response["result"]:
            for update in response["result"]:
                chat_id = update["message"]["chat"]["id"]
                text = update["message"].get("text", "")

                if chat_id == int(CHAT_ID):  # Only show messages from the correct chat
                    print(f"\nTelegram: {text}")
                    last_update_id = update["update_id"]  # Update last processed message

        time.sleep(1)  # Avoid excessive API calls

# Start receiving messages in a separate thread
last_update_id = 0
threading.Thread(target=receive_messages, daemon=True).start()

# Allow user to send messages while receiving messages
print("🔹 Type a message to send to Telegram. Type 'exit' to stop.")

while True:
    user_message = input("You: ")
    if user_message.lower() == "exit":
        print("🚀 Conversation ended.")
        break
    send_message(user_message)
