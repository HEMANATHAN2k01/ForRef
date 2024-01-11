const dbs = require("../config/dbs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const uuid_user = require("../Utils/uuid_user");
const uuid_task = require("../Utils/uuid_task");
const createdAt = require("../Utils/date");
const dataExporter = require("../Utils/csv");

exports.register = (req, res) => {
  const insertQuery = `INSERT INTO taskmanager_dbs.user (uuid,name,email,password,role) VALUES ('${uuid_user()}','${
    req.body.name
  }','${req.body.email}','${req.body.password}','user')`;

  dbs.query(insertQuery, (insertError, insertResult) => {
    if (insertError) {
      console.error("Error inserting student:", insertError);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    console.log("1 record inserted");
    res.status(200).json({ message: "Student inserted successfully" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const selectQuery = `SELECT * FROM taskmanager_dbs.user WHERE email = '${email}' AND password = '${password}'`;

  dbs.query(selectQuery, (selectError, selectResult) => {
    if (selectError) {
      console.error("Error querying user:", selectError);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (selectResult.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      const user = selectResult[0];
      const token = jwt.sign(
        { email: user.email, role: user.role,userid:user.uuid },
        "secret1234", //key
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ message: "Login successful", token, role: user.role });
      console.log("Login successful");
    }
  });
};

exports.getdata = (req, res) => {
  const selectQuery = `SELECT name,uuid FROM taskmanager_dbs.user WHERE role != 'admin'`;

  dbs.query(selectQuery, (selectError, selectResult) => {
    if (selectError) {
      console.error("Error retrieving data:", selectError);
      res.status(500).json({ error: "data not get something error" });
      return;
    }

    // const names = selectResult.map((user) => user.name,u);
    res.status(200).json({ selectResult });
    // console.log(selectResult);
    // console.log(`data get`);
  });
};

exports.createtask = (req, res) => {
  const getUserEmailQuery = `SELECT email FROM taskmanager_dbs.user WHERE uuid = '${req.body.userid}'`;

  dbs.query(getUserEmailQuery, (userError, userResult) => {
    if (userError) {
      console.error("Error fetching user email:", userError);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (userResult.length === 0) {
      console.error("User not found");
      res.status(404).json({ error: "User not found" });
      return;
    }

    const userEmail = userResult[0].email;

    const mailOptions = {
      from: "hemanathan2k01@gmail.com",
      to: userEmail,
      subject: `'${req.body.title}'`,
      // text: `A new task has been created with the following details:\nTitle: ${req.body.title}\nDescription: ${req.body.description}`,
      html: `<div style='border:2px solid red;border-radius:10px'><h1 style='text-align:center;color:red'>Welcome</h1><p >Title:${req.body.title}</p><p>Description: ${req.body.description}</p></div>`,
    };

    const insertTaskQuery = `INSERT INTO taskmanager_dbs.create_task (taskid,userid,title,description,createdby,createdat
      ) VALUES ('${uuid_task()}', '${req.body.userid}','${req.body.title}','${
      req.body.description
    }','${"admin"}','${createdAt()}')`;

    dbs.query(insertTaskQuery, (insertError, insertResult) => {
      if (insertError) {
        console.error("Error creating task:", insertError);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      console.log("Task created successfully");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hemanathan2k01@gmail.com",
          pass: "fxac nywx wzsf gyxe",
        },
      });

      transporter.sendMail(mailOptions, (emailError, emailInfo) => {
        if (emailError) {
          console.error("Error sending email:", emailError);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        console.log("Email sent:", emailInfo.response);
        res
          .status(200)
          .json({ message: "Task created successfully. Email sent." });
      });
    });
  });
};

exports.selectData = (req, res) => {
  const selectQuery = "SELECT * FROM taskmanager_dbs.user WHERE role != 'admin'";

  dbs.query(selectQuery, (selectError, selectResult) => {
    if (selectError) {
      console.error("Error selecting data:", selectError);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // console.log("Selected data:", selectResult);
    res.status(200).json({ data: selectResult });
  });
};

exports.userdata = (req, res) => {
  const selectQuery = `SELECT title,description FROM taskmanager_dbs.create_task WHERE userid= '${req.body.userid}' `;

  dbs.query(selectQuery, (selectError, selectResult) => {
    if (selectError) {
      console.error("Error selecting data:", selectError);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ data: selectResult });
  });
};

exports.usertasks = (req, res) => {
console.log(req.user)
  // const selectQuery = `SELECT * FROM taskmanager_dbs.create_task WHERE userid='${req.user.userid}'`;
  const selectQuery = `
  SELECT taskmanager_dbs.user.name, taskmanager_dbs.create_task.title, taskmanager_dbs.create_task.description
  FROM taskmanager_dbs.create_task
  LEFT JOIN taskmanager_dbs.user ON taskmanager_dbs.create_task.userid = taskmanager_dbs.user.uuid
  WHERE taskmanager_dbs.user.uuid = '${req.user.userid}'
`;


  dbs.query(selectQuery, (selectError, selectResult) => {
    if (selectError) {
      // console.error("Error selecting data:", selectError);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ data: selectResult });
  });
};

exports.mailToAdmin = (req, res) => {
  const selectQuery = `SELECT taskmanager_dbs.create_task.title,taskmanager_dbs.create_task.description,taskmanager_dbs.user.name FROM taskmanager_dbs.create_task LEFT JOIN taskmanager_dbs.user 
  ON taskmanager_dbs.create_task.userid=taskmanager_dbs.user.uuid `;
  dbs.query(selectQuery, (selectError, selectResult) => {
    if (selectError) {
      console.error("Error selecting data:", selectError);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // console.log(selectResult)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hemanathan2k01@gmail.com",
        pass: "fxac nywx wzsf gyxe",
      },
    });

    const mailOptions = {
      from: "hemanathan2k01@gmail.com",
      to: "1331hems@gmail.com",
      subject: "Data for Admin",
      html: `<table style="border-collapse: collapse; width: 100%; text-align: left; border: 1px solid #ddd;">
      <tr>
        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Name</th>
        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Title</th>
        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Description</th>
      </tr>
      ${selectResult
        .map(
          (item) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.title}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.description}</td>
        </tr>
      `
        )
        .join("")}
    </table>
    `,
    };

    transporter.sendMail(mailOptions, (mailError, mail) => {
      if (mailError) {
        console.error("Error sending email:", mailError);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Email sent");
      return res.status(200).json({
        message: "Email sent to admin successfully",
      });
    });
  });
};

cron.schedule("0 * * * *", () => {
  exports.mailToAdmin();
});

// exports.createCSV = (req, res) => {
  // const selectQuery = `SELECT taskmanager_dbs.user.name,taskmanager_dbs.user.email,taskmanager_dbs.create_task.title,taskmanager_dbs.create_task.description FROM taskmanager_dbs.create_task LEFT JOIN taskmanager_dbs.user
   // ON taskmanager_dbs.create_task.userid=taskmanager_dbs.user.uuid`;

//   const selectQuery =`SELECT name,email FROM taskmanager_dbs.user;`

//   dbs.query(selectQuery, (error, data) => {
//     if (error) {
//       console.error("Error selecting data:", selectError);
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }
//     const sqlData = JSON.parse(JSON.stringify(data));
//     const header = ["Name", "Email", "Title", "Description"];
//     const jsonData = new dataExporter({ header });
//     const csvData = jsonData.parse(sqlData);
//     res.setHeader("Content-Type", "text/csv");
//     res.setHeader("Content-Disposition", "attachment;filename=data.csv");
//     // res.status(200).json({ data: sqlData });
//     res.status(200).end(csvData);
//   });
// };

exports.createCSV = (req, res) => {
  const selectQuery = `SELECT name, email FROM taskmanager_dbs.user;`;

  dbs.query(selectQuery, (error, data) => {
    if (error) {
      console.error("Error selecting data:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const sqlData = JSON.parse(JSON.stringify(data));
    const header = ["Name", "Email", "Title", "Description"];
    const jsonData = new dataExporter({ header });
    const csvData = jsonData.parse(sqlData);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hemanathan2k01@gmail.com",
        pass: "fxac nywx wzsf gyxe",
      },
    });

    // Create an email message
    const mailOptions = {
      from: "hemanathan2k01@gmail.com",
      to: "1331hems@gmail.com",
      subject: "CSV File Attachment",
      text: "Please find the attached CSV file.",
      attachments: [
        {
          filename: "data.csv",
          content: csvData,
        },
      ],
    };

    transporter.sendMail(mailOptions, (emailError, info) => {
      if (emailError) {
        console.error("Error sending email:", emailError);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Email sent:", info.response);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment;filename=data.csv");
        res.status(200).end(csvData);
      }
    });

    // cron.schedule("* * * * *", () => {
    //   sendMail()
    //   console.log(`csv sent`);
    // });
  });
};
