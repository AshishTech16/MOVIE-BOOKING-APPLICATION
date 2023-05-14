const user = require("../models/User");
const bcrypt = require("bcryptjs");
const Booking = require("../models/Bookings");


const getAllUser = async (req, res, next) => {
    let users;

    try {
        users = await user.find();
    } catch (err) {
        return console.log(err);

    }

    if (!users) {
        return res.status(500).json({
            message: "Unexpected error"
        })
    }

    return res.status(200).json({ users })
};

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (
        !name &&
        name.trim() === "" &&
        !email &&
        email.trim() === "" &&
        !password && password.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" })
    }
    const hashedPassword = bcrypt.hashSync(password);

    let users;
    try {
        users = new user({ name, email, password: hashedPassword });
        users = await users.save();

    } catch (err) {
        return console.log(err);
    }

    if (!users) {
        return res.status(500).json({ message: "Unexpected Error Occurred" })
    }
     
    return res.status(201).json({id: users._id });

}


const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (
        !name &&
        name.trim() === "" &&
        !email &&
        email.trim() === "" &&
        !password && password.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" })
    }
    const hashedPassword = bcrypt.hashSync(password);
    let users;
    try {
        users = await user.findByIdAndUpdate(id,
            {
                name,
                email,
                password: hashedPassword
            });
    } catch (err) {
        return console.log(err);
    }
    if (!users) {
        return res.status(500).json({ message: "Something went wrong" })
    }
    res.status(200).json({ message: "Updated successfully" })
}
const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let users;

    try {
        users = await user.findByIdAndDelete(id);

    } catch (err) {
        return console.log(err);
    }
    if (!users) {
        return res.status(500).json({ message: "Something went wrong" })
    }
    res.status(200).json({ message: "Deleted successfully" })

}
const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password && password.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" })
    }
    let existingUser;
    try {
        existingUser = await user.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable to find user from this Id" })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password " })
    }
    return res.status(200).json({ message: "Login Successfully",id:existingUser._id })
}
const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let User;
    try {
        User = await user.findById(id);
    }
    catch(err) {
        return console.log(err);
    }
    if (!User) {
        return res.status(500).json({ message: "Unexpected Error Occurred" })
    }
    return res.status(200).json({ User });
}
const getBookingsofUser = async (req, res) => {
    const id = req.params.id;
    let bookings;
    try {
         bookings = await Booking.find({user:id})
        .populate("user movie");
       
    } catch(err) {
        return console.log(err);
    }
    if (!bookings) {
        return res.status(500).json({ message: "Unexpected Error Occurred" })
    }
    return res.status(200).json({ bookings});   
}

module.exports = { getAllUser, signup, updateUser, deleteUser, login, getUserById, getBookingsofUser }       