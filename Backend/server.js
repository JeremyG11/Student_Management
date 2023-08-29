const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { loginUser } = require("../Backend/controllers/instructorControllers");

const port = process.env.PORT;

// middlewares
app.use(express.json());

app.use("/api/users/login", loginUser);
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/lessons", require("./routes/lessonRoutes"));
app.use("/api/instructors", require("./routes/instructorRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));
// Connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/student_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
