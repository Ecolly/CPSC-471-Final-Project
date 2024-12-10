# B&B Cleaning Service Management Platform

**Group Number:** G-39  
**Members:**  
- Yufei Zhang, 30071476  
- YiPing Zhang, 30127823  

---

## Abstract

The B&B Cleaning Service Management Platform addresses the challenges faced by short-term rental property owners and cleaners. Owners often struggle to find reliable cleaners who can accommodate irregular schedules, while cleaners lack a streamlined system to discover jobs that match their availability and location. 

**Key Features:**
- **For Owners:**  
  - Post cleaning requests.  
  - Manage orders and payments.  
  - Rate and review cleaners.  
- **For Cleaners:**  
  - Discover job opportunities based on availability and location.  
  - Manage orders and view job details.  
  - Participate in a transparent rating and review system.  

With a user-friendly web interface, the platform simplifies operations, reduces inefficiencies, and fosters trust and transparency between users, ultimately enhancing efficiency in the short-term rental market.

---

## Technology Stack

- **Frontend:** React.js  
- **Backend:** Node.js  
- **Database:** MySQL  

---

## Installation

Follow the steps below to set up and run the project:

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/bnb-cleaning-platform.git
    cd bnb-cleaning-platform
    ```

2. Navigate to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install express mysql nodemon
    ```

3. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Create the React app and install dependencies:
    ```bash
    npx create-react-app .
    npm install react-router-dom axios
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

---

## Usage

1. Access the platform via your web browser at `http://localhost:3000`.
2. **For Owners:**
   - Register and log in.
   - Create and manage cleaning requests.
   - Process payments and provide feedback for completed jobs.
3. **For Cleaners:**
   - Register and log in.
   - Browse and accept jobs based on your availability and location.
   - Review and rate experiences after job completion.

---

## Dependencies

- **Backend:**  
  - `express`  
  - `mysql`  
  - `nodemon`  
- **Frontend:**  
  - `react-router-dom`  
  - `axios`

---
Database Initialization Using MySQL Workbench

1. Install MySQL Workbench: Download and install MySQL Workbench from the official website.

2. Connect to Your MySQL Server:
- Open MySQL Workbench.
- Click on + to create a new connection, or select an existing connection.
- Enter your MySQL credentials and connect to the server.

3. Create a New Database:
In the toolbar, select Schemas.Right-click on the white space and select Create Schema. Name the schema airbnbnetwork and click Apply.

4. Import the attached SQL File:
The queries from the file will appear in the query editor.

6. Execute the Queries:
Click the Execute button to run all queries and create the tables.


## Contribution

We welcome contributions to improve this platform. Please follow the steps below:  
1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature-branch`.  
3. Commit your changes: `git commit -m "Add new feature"`.  
4. Push to your branch: `git push origin feature-branch`.  
5. Create a pull request.

---

## License

This project is licensed under the MIT License.

---

**Contact Information:**  
For any inquiries, please contact:  
- Yufei Zhang: yufeizhang@example.com  
- YiPing Zhang: yipingzhang@example.com
