from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = 'your_openai_api_key'

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message')
    response = openai.Completion.create(
        engine="davinci",
        prompt=message,
        max_tokens=150
    )
    reply = response.choices[0].text.strip()
    return jsonify({"reply": reply})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)