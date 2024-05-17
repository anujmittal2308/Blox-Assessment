const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");

const port = 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  standardHeaders: true,
  statusCode: 426,
  message: {
    message: "Too many requests, please try again in 1 minute",
  },
});

app.use(limiter);

function call_me(input) {
  console.log(`Calling API with input value: $(input)`);
  return new Promise((resolve) => setTimeout(() => resolve("Data"), 1000));
}

app.get("/api/data", async (req, res) => {
  try {
    const data = await call_me(req.query.input);
    res.json(data);
  } catch (error) {
    if (error.statusCode === 429) {
      res.status(429).json(error.message);
    } else {
      console.error(error);
      res.status(500).json("server error");
    }
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
