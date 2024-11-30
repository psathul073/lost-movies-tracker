# Lost Movies & Series Tracker 📽️🎬

## **Project Description**  
The **Lost Movies & Series Tracker** is a powerful web application that allows users to keep track of their watched movies and series with highly customizable features. Users can log their viewing experiences, categorize their entries, and interact with their data seamlessly. Designed with robust security, a unique UI, dark mode, and smooth transitions, the project is optimized for user experience and future scalability.  

---

## **Features**  

### **Core Functionalities**  
- **Add Movies and Series**:
  - Input data manually or fetch details via an API.
  - Customize entries with details like:
    - **Watch Date**  
    - **Watch Year**  
    - **Number of Times Watched**  
    - **Subtitles Links**
    - **Watched Language**
    - **Repeat Watch Count**     

- **Organized Views**:
  - View **all entries** on the home page.  
  - Separate tabs for **Movies** and **Series**.  
  - See total counts of:
    - Movies.
    - Series.
    - Overall data entries.

- **CRUD Operations**:
  - **Create** new entries.
  - **Edit** existing data.
  - **Delete** unwanted entries.  

---

### **Authentication and Security**  
- **User Accounts**:
  - Create a new account and log in securely.
  - Each user's data is stored separately for privacy.  

- **Authentication**:
  - Implemented with JWT (JSON Web Tokens) stored in cookies for secure session management.  

- **Security Measures**:
  - Password hashing to protect user credentials.
  - User validation and role-based access control.  

---

### **User Experience**  
- **Unique UI**:
  - Dynamic design with smooth transitions and animations.
  - Fully responsive and optimized for all devices.

- **Dark Mode**:
  - Toggle between light and dark modes for a comfortable viewing experience.

- **Statistics Dashboard**:
  - Visualize total entries, including movies and series counts, and track data history.

---

## **Tech Stack**  

### **Backend**:  
- **Node.js** with **Express.js** for RESTful APIs.  
- **JWT** for authentication.  
- **File System (JSON)** for data storage.

### **Frontend**:  
- **EJS** for templating.  
- **CSS & JavaScript** for a dynamic UI and transitions.  
- **LocalStorage & Cookies** for user session handling.

---

## **Setup Instructions**  

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd lost-movies-tracker
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:  
   Create a `.env` file and add the following variables:  
   ```env
   PORT=3000
   SECRET_KEY=your_secret_key
   API_KEY=your_api_key
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```
   Visit the app at [http://localhost:3000](http://localhost:3000).

---

## **Project Folder Structure**  
```
lost-movies-tracker/
├── public/           # Static files (CSS, JS, Images)
├── views/            # EJS Templates
├── routes/           # API and Page Routes
├── data/             # User data in JSON files
├── .env              # Environment variables
├── app.js            # Main server file
├── package.json      # Node.js dependencies
└── README.md         # Project documentation
```

---

## **Upcoming Features 🚀**  
1. **Search and Filter**:
   - Search movies or series by title, genre, or subtitle language.
2. **Recommendation System**:
   - Suggest movies or series based on user preferences and history.
3. **Data Export**:
   - Export movie and series data as CSV or JSON.
4. **User Profiles**:
   - Add avatars and allow users to personalize their accounts.
5. **Notifications**:
   - Get reminders to watch a movie or series you marked as “To Watch.”  

---

## **Contributing**  
We welcome contributions to enhance the project!  
1. Fork the repository.  
2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```  
3. Commit and push your changes.  
4. Submit a pull request for review.

---

## **License**  
This project is licensed under the [MIT License](LICENSE).

---

### **Feedback & Suggestions**  
Feel free to share your ideas for new features or report issues via the [issues section](https://github.com/your-repo-url/issues).  

Happy tracking! 🎥