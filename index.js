const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    const user_id = "john_doe_17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item)) { 
        const num = parseInt(item);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {   
  alphabets.push(item.toUpperCase());
} else {
  special_characters.push(item);
}
    });

    let concat_string = "";
    alphabets.reverse().forEach((ch, idx) => {
      concat_string += idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    });

    res.json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });

  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

module.exports = app;