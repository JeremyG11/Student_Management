const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const port = process.env.PORT;

// middlewares
app.use(express.json());

app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/lessons", require("./routes/lessonRoutes"));
app.use("/api/instructors", require("./routes/instructorRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));
// Connect to mongodb atlas in the cloud
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
