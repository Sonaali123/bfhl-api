const express = require("express");
const app = express();

app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const { full_name, dob, emailId, collegeRollNumber, data } = req.body;

    if (!full_name || !dob || !emailId || !collegeRollNumber || !data) {
      return res.status(400).json({
        is_success: false,
        message: "Expected body: { full_name, dob, emailId, collegeRollNumber, data: [] }",
      });
    }

   
    const user_id = `${full_name.toLowerCase().replace(/\s+/g, "_")}_${dob}`;


    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (/^\d+$/.test(item)) {

        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]$/.test(item)) {
 
        alphabets.push(item.toUpperCase());
      } else {

        special_characters.push(item);
      }
    });


    let concat_string = "";
    alphabets.forEach((ch, idx) => {
      concat_string += idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    });
    concat_string = concat_string.split("").reverse().join("");

    return res.json({
      is_success: true,
      user_id,
      email: emailId,
      roll_number: collegeRollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, message: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
