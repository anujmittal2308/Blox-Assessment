const express = require("express");
const app = express();
const BigNumber = require("bignumber.js");
const { parse } = require("path/posix");

const port = 3000;

function passjson(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (typeof data === "object" && data !== null) {
      if (Array.isArray(data)) {
        return data.map(passjson);
      } else {
        const abj = {};
        for (const key in data) {
          obj[key] = passjson(data[key]);
        }
        return obj;
      }
    } else {
      if (typeof data == "number") {
        return new BigNumber(data);
      }
      return data;
    }
  } catch (error) {
    console.error("json not found", error.message);
    return null;
  }
}

app.use(express.json({ reviver: (key, value) => passjson(value) }));

app.post("/data", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("dara successfully!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
