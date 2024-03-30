const User = require("../models/user");
const bcrypt = require("bcrypt");
const { hashPassword, comparePassword } = require("../helpers/auth")

// creating registration function
const signUp = async (req, res) => {
  try {
    // handle req fields (req.body)
    const { name, email, password } = req.body;

    // Field Validation
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is Required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is Required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is Required" });
    }

    // check if email is taken
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({success: false, message: "Email already taken"});
    }

    // hash password
    const hashedPwd = await hashPassword(password);

    // create a new user object
    const user = new User({
      name,
      email,
      password: hashedPwd
    })

    // save the new user to the database
    user.save()

    return res.json({success: true, user})
  } catch (err) {
    console.log("Error creating registration", err.message);
    return res.status(500).json({ message: "Registration Failed", err});

  }
};


const Login = async (req, res) => {
  try {
    // handle req fields (req.body)
    const { email, password } = req.body;

    // Field Validation
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is Required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is Required" });
    }

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({success: false, message: "User not found"});
    }

    // hash password
    const match = await comparePassword(password, user.password);

    if(!match){
      return res.status(400).json({success: false, message: "Wrong password DumbASS"});
    }
  
    return res.json({success: true, message: "Login Successful", user})
  } catch (err) {
    console.log("Error creating registration", err.message);
    return res.status(500).json({ message: "Registration Failed", err});

  }
};


module.exports = { Login, signUp };