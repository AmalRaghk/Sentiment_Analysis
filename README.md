# Sentiment Analysis App 🌟

A React-based web application that analyzes text sentiment using Hugging Face's BERT model. The app provides real-time sentiment analysis and visualizes the sentiment with emojis to give users an intuitive understanding of the text's sentiment.

## Features ✨
- Real-time sentiment analysis powered by Hugging Face's BERT model 🤖
- Emoji-based sentiment visualization 📊
- Handles loading states and error messages ⚠️
- Responsive design using Tailwind CSS 💻📱

## Installation 🛠️

Follow these steps to get the project up and running:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/sentiment-analysis.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory** with your Hugging Face API token:
   ```env
   VITE_APP_HF_TOKEN=your_api_token_here
   ```

## Usage 🚀

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` 🌐.

3. Enter text in the input field and click "Analyze" to see the sentiment result. 🧐

## Technology Stack 🛠️
- React 19 ⚛️
- Vite ⚡
- Tailwind CSS 🌿
- Hugging Face Inference API 🧠

## Available Scripts 📜

- `npm run dev`: Starts the development server 🚀


## Environment Variables 🔑

| Variable Name       | Description                          |
|---------------------|--------------------------------------|
| `VITE_APP_HF_TOKEN` | Hugging Face API token (required)    |

## Sentiment Rating Scale 📉📈

The sentiment of the analyzed text is rated using emojis that correspond to different levels of sentiment:

| Emoji | Rating        | Description       |
|-------|---------------|-------------------|
| ‼️    | 1 star        | Very negative 💀  |
| ❗    | 2 stars       | Negative ☹️       |
| ✌️    | 3 stars       | Neutral 🤔        |
| ✔️    | 4 stars       | Positive 😀       |
| ✅    | 5 stars       | Very positive 🎉  |

## Contributing 🤝

Feel free to fork this project and submit pull requests. If you find bugs or have suggestions, please open an issue. Contributions are always welcome! ✨

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


