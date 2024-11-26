import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors()); // can specify domain name here
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "airbnbnetwork",
});

//this gets a request from the user and send a response
// app.get("/", (req, res) => {
//   res.json("hello");
// });
 
app.get("/", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/cleanerView/68", (req, res) => {
  const cleanerID = 68;
  console.log("Cleaner ID:", cleanerID); 
  const q = "SELECT * FROM airbnbnetwork.cleaner WHERE idcleaner = ?";
  db.query(q, [cleanerID], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

//Job Board information
app.get("/jobBoard", (req, res) => {
  const q = `
    SELECT 
      idrequest,
      ownerid,
      propertyid,
      CAST(\`Payment Amount\` AS DECIMAL(10, 2)) AS paymentAmount,
      \`Payment Type\`,
      \`Service Description\`,
      \`Service date\`
    FROM airbnbnetwork.requests
  `;
  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Failed to fetch job data" });
    }

    // 遍历数据，将字符串转为数字（如果需要）
    const formattedData = data.map((row) => ({
      ...row,
      paymentAmount: parseFloat(row["paymentAmount"]),
    }));

    res.json(formattedData);
  });
});

//Orders information for cleaner
app.get("/cleanerorders", (req, res) => {
  const q = `
    SELECT 
      o.idorders,
      o.idrequest,
      o.idcleaner,
      o.idowner,
      r.\`Service Description\` AS service_description,
      r.\`Service date\` AS service_date
    FROM orders o
    LEFT JOIN requests r ON o.idrequest = r.idrequest;
  `;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Failed to fetch orders data" });
    }
    res.status(200).json(data); // 返回 orders 表的全部数据
  });
});


app.post("/cleanerView68", (req, res) => {
  const q = "INSERT INTO cleaner (id, bankAccount) VALUES (?, ?)";
  const values = [req.body.id, req.body.bankAccount];
  db.query(q, values, (err, data) => {
    if (err
      ) return
    res.send
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const {email, password} = req.body;
  console.log("Login attempt:", { email, password });
  // Query the database for the user
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (results.length === 0) {
      console.log("No user found with email:", email);
      return res.status(401).send("Invalid email or password");
    }

    //return the user that was logged into
    const user = results[0];
    if (password !== user.Password) { 
      //when accessing the attributes of user, if it is not working try checking capitalization
      console.log("Password mismatch:", { provided: password, stored: user.Password });
      return res.status(401).send("Invalid email or password");
    }
    console.log("Login successful for user:", user);

    // Send role and other user data
    res.status(200).json({ role: user.role, id: user.id, name: user.name });
  });
});


app.post("/register", (req, res) => {
  const q = `
  INSERT INTO users(
    \`First Name\`, 
    \`Middle Initial\`, 
    \`Last Name\`, 
    \`Email\`, 
    \`Password\`, 
    \`City\`, 
    \`Street\`, 
    \`ZIP\`, 
    \`Phone Number\`, 
    \`Gender\`, 
    \`Date of Birth\`
  ) 
  VALUES (?)`;

// Extracting values from the request body
const values = [
  req.body.firstName, // Matches "First Name" in the SQL table
  req.body.middleInitial, // Matches "Middle Initial"
  req.body.lastName, // Matches "Last Name"
  req.body.email, // Matches "Email"
  req.body.password, // Matches "Password" (should be hashed before storing)
  req.body.city, // Matches "City"
  req.body.street, // Matches "Street"
  req.body.zip, // Matches "ZIP"
  req.body.phoneNumber, // Matches "Phone Number"
  req.body.gender, // Matches "Gender"
  req.body.dateOfBirth, // Matches "Date of Birth"
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});




app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

//connects to backend with this port 
app.listen(8800, () => {
  console.log("Connected to backend.");
});
