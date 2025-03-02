# 🌍 Globetrotte

## 📖 About the Project
Globetrotte is a fun and interactive travel trivia game that challenges players to guess famous travel destinations based on clues. Each destination comes with fun facts and trivia questions, making it both entertaining and educational.

---

## ⚙️ Tech Stack

| Layer         | Technology  |
|----------------|--------------|
| Frontend       | React |
| Backend        | Node.js + Express |
| Data Storage   | MongoDB / JSON file (mock database) |
| Styling        | CSS |

---

## 🚀 Features

✅ Random destination trivia quiz.  
✅ Each destination has clues, fun facts, and trivia questions.  
✅ Tracks user scores (correct/incorrect).  
✅ Fully responsive UI. 
✅ Invite your friends. 


---


## 📄 API Endpoints

| Method | Endpoint                        | Description |
|---|---|---|
| GET   | /api/destinations/random     | Get a random destination |
| POST  | /api/destinations/verify/:id | Verify user’s answer |
| GET   | /api/destinations            | Fetch all destinations |
| GET   | /api/destinations/:id        | Fetch destination by ID |

---

## 🛠️ Setup Instructions

1. Clone the repository:
    ```sh
    git clone <repo-url>
    ```

2. Install dependencies for both client and server:
    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

3. Start the backend server:
    ```sh
    cd server
    node index.js
    ```

4. Start the frontend app:
    ```sh
    cd client
    npm start
    ```

5. Open the app in your browser at:
    ```
    http://localhost:3000
    ```

---

## 📊 Data Source
All destination data is stored in a simple `JSON` file located at:
