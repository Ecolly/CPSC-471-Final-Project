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


////////////////Owner Backend////////////////////////////////////

//get the information associated with the iduser
app.get("/ownerView/:id", (req, res) => {
  const userId = req.params.id; 
  const query = "SELECT * FROM users WHERE idusers = ?"; // Query to fetch all data from 'users' table
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Something went wrong while fetching the data." });
    } else {
      res.json(results);
    }
  });
});

//properties associated with the owner
app.get("/propertyView/:ownerId", (req, res) => {
  const { ownerId } = req.params;

  const query = `
    SELECT idproperty, Street, City, ZIP, \`Property Name\` AS 'Property Name',
           \`Size (sqt feet)\`, \`Number of rooms\`, Type, CheckInTime, CheckoutTime
    FROM property
    WHERE idowner = ?
  `;

  db.query(query, [ownerId], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Something went wrong while fetching the properties." });
    }

    console.log("Query result:", rows);

    if (!rows || rows.length === 0) {
      return res.json(rows);
    }

    res.json(rows);
  });
});

//get property information depending on property id (for pre-filling form purposes)
app.get("/IDpropertyView/:propertyid", (req, res) => {
  const { propertyid } = req.params;
  const query = `
    SELECT idproperty, idowner, Street, City, ZIP, \`Property Name\` AS 'Property Name',
           \`Size (sqt feet)\`, \`Number of rooms\`, Type, CheckInTime, CheckoutTime
    FROM property
    WHERE idproperty = ?
  `;

  db.query(query, [propertyid], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Something went wrong while fetching the properties." });
    }

    console.log("Query result:", rows);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No properties found for this owner." });
    }

    res.json(rows);
  });
});

//update a property's information
app.put("/updatePropertyView/:propertyId", (req, res) => {
  const { propertyId } = req.params;
  const {
    street,
    city,
    zip,
    propertyName,
    size,
    numberOfRooms,
    type,
    checkInTime,
    checkOutTime,
  } = req.body;

  const query = `
    UPDATE property
    SET Street = ?, City = ?, ZIP = ?, 
        \`Property Name\` = ?, \`Size (sqt feet)\` = ?, 
        \`Number of rooms\` = ?, Type = ?, CheckInTime = ?, CheckoutTime = ?
    WHERE idproperty = ?
  `;

  const values = [
    street,
    city,
    zip,
    propertyName,
    size,
    numberOfRooms,
    type,
    checkInTime,
    checkOutTime,
    propertyId,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Something went wrong while updating the property." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Property not found." });
    }
    res.json({ message: "Property updated successfully." });
  });
});

//add a property
app.post("/addProperty/:ownerId", (req, res) => {
  const { ownerId } = req.params; // Extract owner ID from URL
  const {
    Street,
    City,
    ZIP,
    "Property Name": PropertyName,
    "Size (sqt feet)": Size,
    "Number of rooms": NumberOfRooms,
    Type,
    CheckInTime,
    CheckoutTime,
  } = req.body;

  const query = `
    INSERT INTO property (
      idowner,
      Street,
      City,
      ZIP,
      \`Property Name\`,
      \`Size (sqt feet)\`,
      \`Number of rooms\`,
      Type,
      CheckInTime,
      CheckoutTime
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      ownerId, // Use owner ID from URL
      Street,
      City,
      ZIP,
      PropertyName,
      Size,
      NumberOfRooms,
      Type,
      CheckInTime,
      CheckoutTime,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Something went wrong while adding the property." });
      }

      res.status(201).json({ message: "Property added successfully!", idproperty: result.insertId });
    }
  );
});

//get all the requests made by the owner
app.get("/requestsView/:ownerId", (req, res) => {
  const { ownerId } = req.params;

  const query = `
    SELECT 
      r.idrequest, 
      r.propertyid, 
      r.\`Payment Amount\`, 
      r.\`Payment Type\`, 
      r.\`Service Description\`, 
      r.\`Service date\`,
      p.\`Property Name\`
    FROM 
      requests r
    JOIN 
      property p ON r.propertyid = p.idproperty -- Join the property table
    WHERE 
      r.ownerid = ?
      AND NOT EXISTS(
        SELECT 1
        FROM orders o
        WHERE o.idrequest = r.idrequest
      )
  `; //it excludes the idrequests that are in the order table

  db.query(query, [ownerId], (err, rows) => {
    if (err) {
      console.error("Error fetching requests:", err);
      return res.status(500).json({ message: "Something went wrong while fetching the requests." });
    }

    if (!rows || rows.length === 0) {
      return res.json(rows)
    }

    res.json(rows);
  });
});

//Make a request
app.post("/addRequest/:ownerId", (req, res) => {
  const ownerId = req.params.ownerId;
  const { propertyId, paymentAmount, paymentType, serviceDescription, serviceDate } = req.body;

  const query = `
    INSERT INTO requests (create_time, update_time, ownerid, propertyid, \`Payment Amount\`, \`Payment Type\`, \`Service Description\`, \`Service date\`)
    VALUES (NOW(), NOW(), ?, ?, ?, ?, ?, ?)`;

  const values = [ownerId, propertyId, paymentAmount, paymentType, serviceDescription, serviceDate];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error adding request:", err);
      res.status(500).json({ error: "Failed to add request." });
    } else {
      res.status(201).json({ message: "Request added successfully!" });
    }
  });
});

//viewe bids on request
app.get("/viewBids/:requestId", (req, res) => {
  const { requestId } = req.params;

  const query = `
    SELECT 
      c.idcleaner AS idcleaner,
      r.ownerid AS idowner,
      u.\`First Name\` AS firstName, 
      b.idreqest AS requestId, 
      c.\`Bank Account #\` AS bankAccount, 
      r.\`Payment Amount\` AS paymentAmount, 
      r.\`Service Description\` AS serviceDescription, 
      r.\`Service date\` AS serviceDate,
      AVG(cr.\`Reliability\`) AS avgReliability, 
      AVG(cr.\`Satisfaction\`) AS avgSatisfaction, 
      AVG(cr.\`Cleanliness\`) AS avgCleanliness
    FROM bid b
    JOIN cleaner c ON b.idcleaner = c.idcleaner
    JOIN requests r ON b.idreqest = r.idrequest
    JOIN users u ON u.idusers = c.idcleaner
    LEFT JOIN cleaner_rating cr ON cr.idcleaner = c.idcleaner
    WHERE b.idreqest = ?
    GROUP BY c.idcleaner, r.ownerid, b.idreqest, u.\`First Name\`, r.\`Payment Amount\`, r.\`Service Description\`, r.\`Service date\`, c.\`Bank Account #\`;
  `;
  db.execute(query, [requestId], (err, results) => {
    if (err) {
      console.error("Error fetching bids:", err);
      return res.status(500).send("Something went wrong while fetching the bid data.");
    }
    res.json(results);
  });
});



//owner's payment options for the selection part
app.get("/paymentOptions/:ownerId", (req, res) => {
  const ownerId = req.params.ownerId;

  const query = `
    SELECT DISTINCT 'Credit Card' AS PaymentType FROM credit_card WHERE idowner = ?
    UNION
    SELECT DISTINCT 'Paypal' AS PaymentType FROM paypal WHERE idowner = ?
    UNION
    SELECT DISTINCT 'Debit Card' AS PaymentType FROM debit_card WHERE idowner = ?`;

  db.query(query, [ownerId, ownerId, ownerId], (err, results) => {
    if (err) {
      console.error("Error fetching payment options:", err);
      res.status(500).json({ error: "Failed to fetch payment options." });
    } else {
      res.json(results.map((row) => row.PaymentType));
    }
  });
});

//get all the payment info of the owner
app.get("/paymentInfo/:ownerId", (req, res) => {
  const ownerId = req.params.ownerId;
  //distinct to make sure only one payment method shows up
  const query = `
    SELECT DISTINCT 'Credit Card' AS PaymentType, \`Card Number\` AS AccountNumber
    FROM credit_card
    WHERE idowner = ?

    UNION

    SELECT DISTINCT 'Paypal' AS PaymentType, \`Account Number\` AS AccountNumber
    FROM paypal
    WHERE idowner = ?

    UNION

    SELECT DISTINCT 'Debit Card' AS PaymentType, \`Card Number\` AS AccountNumber
    FROM debit_card
    WHERE idowner = ?
  `

  db.query(query, [ownerId, ownerId, ownerId], (err, results) => {
    if (err) {
      console.error("Error fetching payment options:", err);
      res.status(500).json({ error: "Failed to fetch payment options." });
    } else {
      res.json(results);
    }
  });
});

//update owner profile
app.put("/ownerView/:id", (req, res) => {
  const ownerId = req.params.id;
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
  } = req.body;

  const q = `
    UPDATE airbnbnetwork.users u
    JOIN airbnbnetwork.bnbowner c ON u.idusers = c.idbnbowner
    SET
      u.\`First Name\` = ?,
      u.\`Middle Initial\` = ?,
      u.\`Last Name\` = ?,
      u.Email = ?,
      u.Password = ?,
      u.City = ?,
      u.Street = ?,
      u.ZIP = ?,
      u.\`Phone Number\` = ?,
      u.Gender = ?,
      u.\`Date of Birth\` = ?
    WHERE u.idusers = ?;
  `;

  const values = [
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
    ownerId
  ];
  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong while updating the profile." });
    }
    return res.json({ message: "Profile updated successfully!", data });
  });
});

//edit request based on the request ID
app.put("/updateRequest/:id", (req, res) => {
  const requestId = req.params.id;
  const { paymentAmount, paymentType, serviceDescription, serviceDate } = req.body;

  const query = `
    UPDATE requests
    SET \`Payment Amount\` = ?, \`Payment Type\` = ?, \`Service Description\` = ?, \`Service date\` = ?
    WHERE idrequest = ?
  `;

  db.query(
    query,
    [paymentAmount, paymentType, serviceDescription, serviceDate, requestId],
    (err, result) => {
      if (err) {
        console.error("Error updating request:", err);
        return res.status(500).json({ error: "Failed to update request." });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Request not found." });
      }
      res.json({ message: "Request updated successfully." });
    }
  );
});

//accept the bid of the cleaner
app.post("/acceptBid", (req, res) => {
  const { requestId, idcleaner, idowner} = req.body;
  if (!requestId || !idcleaner) {
    return res.status(400).send("Missing requestId or bidId.");
  }
  const query = `
    INSERT INTO orders (idrequest, idcleaner, idowner) 
    VALUES (?, ?, ?)
  `;

  db.execute(query, [requestId, idcleaner, idowner], (err, results) => {
    if (err) {
      console.error("Error inserting into orders table:", err);
      return res.status(500).json({ error: "Failed to accept bid and insert into orders." });
    }
    res.status(201).json({ message: "Bid accepted and order created successfully!" });
  });
});

//get owner's orders (whch excludes made transasctions)
app.get('/ownerorders/:id', (req, res) => {
  const ownerId = req.params.id;  // Get the ownerId from the URL parameter

  const query = `
    SELECT
      p.\`Property Name\`,
      r.\`Service date\`,
      u.\`First Name\`,
      u.\`Last Name\`,
      u.\`Phone Number\`, 
      o.idowner,
      o.idcleaner,
      o.idorders,
      r.\`Payment Amount\`
    FROM orders o
    JOIN requests r ON o.idrequest = r.idrequest
    JOIN property p ON r.propertyid = p.idproperty
    JOIN cleaner c ON o.idcleaner = c.idcleaner
    JOIN users u ON c.idcleaner = u.idusers
    WHERE o.idowner = ?
    AND NOT EXISTS(
        SELECT 1
        FROM transaction t
        WHERE o.idorders = t.idorder
      )
    `;

  db.execute(query, [ownerId], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Error fetching data.");
    }
    res.json(results);
  });
});

//Add payment queries
//add credit card
app.post('/addCreditCard/:id', (req, res) => {
  const { id } = req.params; 
  const { cardNumber, cardName, billingAddress, expiryDate } = req.body; 
  let formattedExpiryDate = expiryDate;
  if (expiryDate && !expiryDate.includes("-")) {
    formattedExpiryDate = `${expiryDate}-28`;
  } else if (expiryDate && expiryDate.split("-").length === 2) {
    formattedExpiryDate = `${expiryDate}-28`;
  }

  const query = `INSERT INTO credit_card (idowner, \`Card Number\`, \`Name\`, \`Billing Address\`, \`Expiracy Date\`) 
                 VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [id, cardNumber, cardName, billingAddress, formattedExpiryDate], (err, result) => {
    if (err) {
      console.error("Error adding credit card:", err);
      return res.status(500).send("Failed to add credit card.");
    }
    res.send("Credit card added successfully.");
  });
});

//add debit card
app.post('/addDebitCard/:id', (req, res) => {
  const { id } = req.params; 
  const { cardNumber, cardName, billingAddress, expiryDate } = req.body;  

  let formattedExpiryDate = expiryDate;
  if (expiryDate && !expiryDate.includes("-")) {
    formattedExpiryDate = `${expiryDate}-28`;
  } else if (expiryDate && expiryDate.split("-").length === 2) {
    formattedExpiryDate = `${expiryDate}-28`;
  }

  const query = `INSERT INTO debit_card (idowner, \`Card Number\`, \`Name\`, \`Billing Address\`, \`Expiry Date\`) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [id, cardNumber, cardName, billingAddress, formattedExpiryDate], (err, result) => {
    if (err) {
      console.error("Error adding debit_card card:", err);
      return res.status(500).send("Failed to add credit card.");
    }
    res.send("debit_card card added successfully.");
  });
});

//add paypal account
app.post('/addPaypal/:id', (req, res) => {
  const { id } = req.params;
  const { accountNumber } = req.body;

  const query = `INSERT INTO paypal (idowner, AccountNumber) 
                 VALUES (?, ?)`;

  db.query(query, [id, accountNumber], (err, result) => {
    if (err) {
      console.error("Error adding PayPal account:", err);
      return res.status(500).send("Failed to add PayPal account.");
    }
    res.send("PayPal account added successfully.");
  });
});

//sends order to complete on owner side to make it a transasction
app.post("/completeOrder", (req, res) => {
  const { orderId, cleanerId, ownerId } = req.body;

  if (!orderId || !cleanerId || !ownerId) {
    return res.status(400).send("Order ID, Cleaner ID, and Owner ID are required.");
  }

  const query = `
    INSERT INTO transaction (idorder, idowner, idcleaner) 
    VALUES (?, ?, ?)`;

  db.query(query, [orderId, ownerId, cleanerId], (err, result) => {
    if (err) {
      console.error("Error inserting into transaction table:", err);
      return res.status(500).send("Failed to complete the order.");
    }
    res.send({ message: "Order completed successfully." });
  });
});

// get the transactions made by the owner
app.get('/ownertransactions/:id', (req, res) => {
  const ownerId = req.params.id;
  const query = `
    SELECT
      p.\`Property Name\`,
      r.\`Service date\`,
      u.\`First Name\`,
      u.\`Last Name\`,
      u.\`Phone Number\`, 
      o.idowner,
      o.idcleaner,
      o.idorders,
      r.\`Payment Amount\`
    FROM transaction t
    JOIN orders o ON t.idorder = o.idorders
    JOIN requests r ON o.idrequest = r.idrequest
    JOIN property p ON r.propertyid = p.idproperty
    JOIN cleaner c ON o.idcleaner = c.idcleaner
    JOIN users u ON c.idcleaner = u.idusers
    WHERE o.idowner = ?`;

  db.query(query, [ownerId], (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).json({ error: "Failed to fetch transactions." });
    }
    res.json(results);
  });
});

//submit feedback by the owner to the cleaner
app.post('/submitFeedback', (req, res) => {
  const { orderId, cleanerId, ownerId, reliability, satisfaction, cleanliness, comment } = req.body;

  console.log('Received Feedback:', req.body);
  const query = `
    INSERT INTO cleaner_rating (idorder, Comment, Reliability, Satisfaction, Cleanliness, idcleaner)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [orderId, comment, reliability, satisfaction, cleanliness, cleanerId], (err, result) => {
    if (err) {
      console.error('Error inserting feedback:', err);
      return res.status(500).json({ error: 'Failed to submit feedback' });
    }
    res.status(200).json({ message: 'Feedback submitted successfully' });
  });
});


////////////////////////////////////////////////////////////
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

//update cleaner profile
app.put("/updateCleaner/:id", (req, res) => {
  const cleanerID = req.params.id;
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
    bankAccount,
    cleaningTools,
  } = req.body;

  const q = `
    UPDATE airbnbnetwork.users u
    LEFT JOIN airbnbnetwork.cleaner c ON u.idusers = c.idcleaner
    LEFT JOIN airbnbnetwork.cleaning_tools t ON t.idcleaner = c.idcleaner
    SET
      u.\`First Name\` = ?,
      u.\`Middle Initial\` = ?,
      u.\`Last Name\` = ?,
      u.Email = ?,
      u.Password = ?,
      u.City = ?,
      u.Street = ?,
      u.ZIP = ?,
      u.\`Phone Number\` = ?,
      u.Gender = ?,
      u.\`Date of Birth\` = ?,
      c.\`Bank Account #\` = ?,
      t.\`Cleaning Tools\` = ?
    WHERE u.idusers = ?;
  `;

  const values = [
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
    bankAccount,
    cleaningTools,
    cleanerID
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong while updating the profile." });
    }
    console.log(data);
    return res.json({ message: "Profile updated successfully!", data });
  });
});

app.get("/updateCleaner/:id", (req, res) => {
  const cleanerID = req.params.id;
  const q = `
        SELECT 
        u.\`First Name\`,
        u.\`Middle Initial\`,
        u.\`Last Name\`,
        u.Email,
        u.Password,
        u.City,
        u.Street,
        u.ZIP,
        u.\`Phone Number\`,
        u.Gender,
        u.\`Date of Birth\`,
        c.\`Bank Account #\`,
        t.\`Cleaning Tools\`
    FROM airbnbnetwork.cleaner c
    LEFT JOIN airbnbnetwork.users u ON c.idcleaner = u.idusers
    LEFT JOIN airbnbnetwork.cleaning_tools t ON t.idcleaner = c.idcleaner
    WHERE c.idcleaner = ? ;
      `;

  db.query(q, [cleanerID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong while getting the profile." });
    }
    //console.log(data);
    return res.json({ message: "Profile loaded successfully!", data });
  });
});



//get cleaner profile data
app.get("/cleanerView/:id", (req, res) => {
  const cleanerID = req.params.id;
  console.log(cleanerID);
  const q = `
  SELECT 
        u.\`First Name\`,
        u.\`Middle Initial\`,
        u.\`Last Name\`,
        u.Email,
        u.Password,
        u.City,
        u.Street,
        u.ZIP,
        u.\`Phone Number\`,
        u.Gender,
        u.\`Date of Birth\`,
        c.\`Bank Account #\`,
        t.\`Cleaning Tools\`
    FROM airbnbnetwork.cleaner c
    LEFT JOIN airbnbnetwork.users u ON c.idcleaner = u.idusers
    LEFT JOIN airbnbnetwork.cleaning_tools t ON t.idcleaner = c.idcleaner
    WHERE c.idcleaner = ? ;
     `;

  db.query(q, [cleanerID], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    //console.log(data);
    return res.json(data);
  });
});


//Update Owner Rating
app.put("/ownerRating", (req, res) => {
  const { idorder, behavior, professionalism, overallScore, comment } = req.body;

  const q = `
  INSERT INTO airbnbnetwork.owner_rating (
    idorder,
    idowner,
    Comment,
    Behavior,
    Professionalism,
    \`Overall Score\`
  )
  SELECT 
    ? AS idorder,
    t.idowner,
    ? AS comment,
    ? AS behavior,
    ? AS professionalism,
    ? AS overallScore
  FROM airbnbnetwork.transaction t
  WHERE t.idorder = ?
`;


  const values = [idorder, comment, behavior, professionalism, overallScore, idorder];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong while updating the rating." });
    }
    //console.log(data);
    return res.json({ message: "Rating updated successfully!", data });
  });
});



//Job Board information
app.get("/jobBoard/:id", (req, res) => {
  const userId = req.params.id;
  const q = `
    SELECT 
        r.idrequest,
        u.\`First Name\`,
        u.\`Last Name\`,
        AVG(orating.\`Overall Score\`) as \`Overall Rating\`,
        p.\`Property Name\`,
        p.Street,
        p.City,
        p.Type,
        r.\`Service date\`,
        r.\`Payment Amount\`,
        r.\`Payment Type\`,
        r.\`Service Description\`,
        r.create_time
      FROM requests r
      JOIN bnbowner bo ON r.ownerid = bo.idbnbowner
      JOIN users u ON bo.idbnbowner = u.idusers
      JOIN property p ON r.propertyid = p.idproperty
      LEFT JOIN owner_rating orating ON r.ownerid = orating.idowner
      LEFT JOIN bid b ON r.idrequest = b.idreqest
      WHERE r.idrequest NOT IN (SELECT idrequest FROM orders) 
      GROUP BY 
        r.idrequest,
        u.\`First Name\`,
        u.\`Last Name\`,
        p.\`Property Name\`,
        p.Street,
        p.City,
        p.Type,
        r.\`Service date\`,
        r.\`Payment Amount\`,
        r.\`Payment Type\`,
        r.\`Service Description\`,
        r.create_time
      ORDER BY r.\`Service date\``;
  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Failed to fetch job data" });
    }

    const formattedData = data.map((row) => ({
      ...row,
      paymentAmount: parseFloat(row["paymentAmount"]),
    }));
    //console.log(formattedData);
    res.json(formattedData);
  });
});

//Job Board bidding
app.post('/cleanerBids/bidding', (req, res) => {
  const { idrequest, cleanerid } = req.body;
  if (!idrequest || !cleanerid) {
    return res.status(400).json({ message: 'idrequest and cleanerid are required' });
  }
  const q = "INSERT INTO bid (idreqest, idcleaner) VALUES (?, ?)";
  db.query(q, [idrequest, cleanerid], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});


//Orders information for cleaner
app.get("/cleanerorders/:id", (req, res) => {
  const cleanerID = req.params.id;
  const q = `
        SELECT 
        o.idorders,
        r.\`Service date\`,
        p.\`Property Name\`,
        p.Street,
        p.City,
        p.CheckInTime,
        r.\`Payment Amount\`,
        r.\`Payment Type\`,
        r.\`Service Description\`,
        u_owner.\`First Name\`,
        u_owner.\`Last Name\` 
    FROM orders o
    JOIN requests r ON o.idrequest = r.idrequest
    JOIN property p ON r.propertyid = p.idproperty
    JOIN bnbowner b ON r.ownerid = b.idbnbowner
    JOIN users u_owner ON b.idbnbowner = u_owner.idusers
    JOIN cleaner c ON o.idcleaner = c.idcleaner
    JOIN users u_cleaner ON c.idcleaner = u_cleaner.idusers
    WHERE o.idcleaner = ?
    ORDER BY r.\`Service date\``;

  db.query(q, [cleanerID],(err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Failed to fetch orders data" });
    }
    //console.log(data);
    res.status(200).json(data); 
  });
});

//Transaction information for cleaner
app.get("/cleanertransactions/:id", (req, res) => {
  const cleanerID = req.params.id;
  const q = `
        SELECT 
        o.idorders,
        r.\`Service date\`,
        p.\`Property Name\`,
        p.Street,
        p.City,
        r.\`Payment Amount\`,
        r.\`Payment Type\`,
        r.\`Service Description\`,
        u_owner.\`First Name\`,
        u_owner.\`Last Name\` 
    FROM orders o
    JOIN transaction t ON o.idorders = t.idorder
    JOIN requests r ON o.idrequest = r.idrequest
    JOIN property p ON r.propertyid = p.idproperty
    JOIN bnbowner b ON r.ownerid = b.idbnbowner
    JOIN users u_owner ON b.idbnbowner = u_owner.idusers
    JOIN cleaner c ON o.idcleaner = c.idcleaner
    JOIN users u_cleaner ON c.idcleaner = u_cleaner.idusers
    WHERE o.idcleaner = ?
    ORDER BY r.\`Service date\``;

  db.query(q, [cleanerID],(err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Failed to fetch orders data" });
    }
    //console.log(data);
    res.status(200).json(data); 
  });
});

//Bids information for cleaner
app.get("/cleanerbids/:id", (req, res) => {
  const cleanerID = req.params.id;
  const q = `
      SELECT 
      r.idrequest,
      u.\`First Name\`,
      u.\`Last Name\`,
      p.\`Property Name\`,
      p.Street,
      p.City,
      p.Type,
      r.\`Service date\`,
      r.\`Payment Amount\`,
      r.\`Payment Type\`,
      r.\`Service Description\`,
      r.create_time
    FROM requests r
    JOIN bnbowner bo ON r.ownerid = bo.idbnbowner
    JOIN users u ON bo.idbnbowner = u.idusers
    JOIN property p ON r.propertyid = p.idproperty
    LEFT JOIN bid b ON r.idrequest = b.idreqest
    WHERE b.idcleaner = ?
    GROUP BY r.idrequest
    ORDER BY r.\`Service date\``;

  db.query(q, [cleanerID],(err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Failed to fetch orders data" });
    }
    //console.log(data);
    res.status(200).json(data); 
  });
});


app.post("/cleanerView:id", (req, res) => {
  const q = "INSERT INTO cleaner (id, bankAccount) VALUES (?, ?)";
  const values = [req.body.id, req.body.bankAccount];
  db.query(q, values, (err, data) => {
    if (err
      ) return
    res.send
    return res.json(data);
  });
});





////////////////////////////general pages//////////////////////////////
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
    bankAccount,
    cleaningTools
  } = req.body;

  // Validate required fields
  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

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

  db.query(q, userValues, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query error" });
    }
    const personID = data.insertId; 
    console.log("Role value:", role); 

    if (role === "cleaner") {
      if (!cleaningTools) {
        return res.status(400).json({ error: "Cleaning tools are required for cleaners" });
      }

      const roleQuery = "INSERT INTO cleaner (idcleaner, \`Bank Account #\`) VALUES (?, ?)";
      const cleanerValues = [personID, bankAccount];

      db.query(roleQuery, cleanerValues, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Failed to insert into cleaner table" });
        }

        // Insert into cleaning_tools table
        const toolsQuery = "INSERT INTO cleaning_tools (idcleaner, \`Cleaning Tools\`) VALUES (?, ?)";
        const toolsValues = [personID, cleaningTools];

        db.query(toolsQuery, toolsValues, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to insert into cleaning_tools table" });
          }

          res.status(201).json({ message: "Cleaner and tools registered successfully!" });
        });
      });
    } else {

      const roleQuery = "INSERT INTO bnbowner (idbnbowner) VALUES (?)";
      const ownerValues = [personID];

      db.query(roleQuery, ownerValues, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Failed to insert into bnbowner table" });
        }

        res.status(201).json({ message: "Owner registered successfully!" });
      });
    }
  });
});


//connects to backend with this port 
app.listen(8800, () => {
  console.log("Connected to backend.");
});
