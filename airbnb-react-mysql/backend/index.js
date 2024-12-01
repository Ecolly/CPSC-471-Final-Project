import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors()); // can specify domain name here
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Thisisannoying1!?",
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
app.get("/cleanerorders/:id", (req, res) => {
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

    if (results.length === 0) {
      console.log("No user found with email:", email);
      return res.status(401).send("Invalid email or password");
    }
    
    //see if the user is a cleaner or an owner
    const user = results[0];
    console.log("user:", user);

    if (password !== user.Password) { 
      //when accessing the attributes of user, if it is not working try checking capitalization
      console.log("Password mismatch:", { provided: password, stored: user.Password });
      return res.status(401).send("Invalid email or password");
    }

    const cleanerQuery = `SELECT idcleaner FROM cleaner WHERE idcleaner = ? LIMIT 1`;
    
    console.log("Checking if user is a cleaner with iduser:", user.idusers);
    db.query(cleanerQuery, [user.idusers], (err, cleanerResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      

      if (cleanerResults.length > 0) {
        // User is a cleaner
        console.log("Cleaner query results:", cleanerResults);
        return res.status(200).json({ role: "cleaner", id: user.idusers});
      }
      
      const ownerQuery = `SELECT idbnbowner FROM bnbowner WHERE idbnbowner = ? LIMIT 1`;
      console.log("Cleaner query results:", cleanerResults);

      db.query(ownerQuery, [user.idusers], (err, ownerResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database error" });
        }

        if (ownerResults.length > 0) {
          console.log("User identified as owner:", user.idusers);
          // User is an owner
          return res.status(200).json({ role: "owner", id: user.idusers });
        }

      
        console.log("User role not found:", user.id);
        return res.status(404).json({ error: "User role not found" });
    
      });
    });
  });
});

app.post("/register", (req, res) => {
  const {
    firstName,
    middleInitial,
    lastName,
    email,
    password,
    city,
    street,
    zip,
    phoneNumber,
    gender,
    dateOfBirth,
    role, // This should come from the dropdown
  } = req.body;
  
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
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const userValues = [
    firstName,
    middleInitial,
    lastName,
    email,
    password,
    city,
    street,
    zip,
    phoneNumber,
    gender,
    dateOfBirth,
  ];

// Extracting values from the request body


  db.query(q, userValues, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(err);
    }
    const personID = data.insertId;
    console.log("Role value:", role); // Check what value `role` actually holds

    let roleQuery = "";
    if (role == "cleaner") {
      roleQuery = "INSERT INTO cleaner (idcleaner) VALUES (?)";
    } else {
      roleQuery = "INSERT INTO bnbowner (idbnbowner) VALUES (?)";
    }

    db.query(roleQuery, [personID], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Error saving user to role table");
      }
      res.status(200).json("User registered successfully");
    });
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
