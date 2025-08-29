const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const isLetter = (ch) => /^[A-Za-z]$/.test(ch);
const isAlnum = (ch) => /^[A-Za-z0-9]$/.test(ch);

app.post("/bfhl", (req, res) => {
  try {
    const { full_name, dob, emailId, collegeRollNumber, data } = req.body || {};

    if (
      typeof full_name !== "string" ||
      typeof dob !== "string" ||
      typeof emailId !== "string" ||
      typeof collegeRollNumber !== "string" ||
      !Array.isArray(data)
    ) {
      return res.status(400).json({
        is_success: false,
        message:
          "Expected body: { full_name, dob (ddmmyyyy), emailId, collegeRollNumber, data: [] }",
      });
    }

    const user_id =
      full_name.trim().toLowerCase().replace(/\s+/g, "_") + "_" + dob;

    const evenNumbers = [];
    const oddNumbers = [];
    const alphabetsUppercase = [];
    const specialCharacters = [];
    const lettersSequence = [];
    let sumOfNumbers = 0;

    for (const item of data) {
      if (typeof item === "number" && Number.isFinite(item)) {
        sumOfNumbers += item;
        if (Number.isInteger(item)) {
          (Math.abs(item) % 2 === 0 ? evenNumbers : oddNumbers).push(item);
        }
        continue;
      }

      if (typeof item === "string") {
        for (const ch of item) {
          if (isLetter(ch)) {
            alphabetsUppercase.push(ch.toUpperCase());
            lettersSequence.push(ch);
          } else if (!isAlnum(ch)) {
            specialCharacters.push(ch);
          }
        }
      }
    }

    const reversed = lettersSequence.reverse();
    let reverseAlternatingCaps = "";
    reversed.forEach((ch, idx) => {
      const lower = ch.toLowerCase();
      reverseAlternatingCaps += idx % 2 === 0 ? lower.toUpperCase() : lower;
    });

    return res.status(200).json({
      is_success: true,
      user_id,
      emailId,
      collegeRollNumber,
      evenNumbers,
      oddNumbers,
      alphabetsUppercase,
      specialCharacters,
      sumOfNumbers,
      reverseAlternatingCaps,
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
