const mongoose = require('mongoose');
const Movies = require('../models/Movies');
const users = require('../models/User');
const Bookings = require('../models/Bookings');

const Booking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;
    let existingMovie;
    let existingUser;
  
    try {
        existingMovie = await Movies.findById(movie);
        existingUser = await users.findById(user);
  
      if (!existingMovie) {
        return res.status(404).json({ message: "Movie not found by given id" });
      }
  
      if (!existingUser) {
        return res.status(404).json({ message: "User not found by given id" });
      }
    } catch (e) {
      return res.send(e.message);
    }
  
    let newBooking;
    try {
      newBooking = new Bookings({
        movie,
        date: new Date(`${date}`),
        seatNumber,
        user,
      });
  
      const session = await mongoose.startSession();
      session.startTransaction();
      if (existingUser.bookings) {
        existingUser.bookings.push(newBooking);
      } else {
        existingUser.bookings = [newBooking];
      }
  
      if (existingMovie.bookings) {
        existingMovie.bookings.push(newBooking);
      } else {
        existingMovie.bookings = [newBooking];
      }
  
      await existingUser.save({ session });
      await existingMovie.save({ session });
      await newBooking.save({ session });
  
      session.commitTransaction();
    } catch (e) {
      res.send(e.message);
    }
  
    if (!newBooking) {
      res.status(400).json({
        message: "something Went Wrong",
      });
    }
    console.log(newBooking);
    return res.status(201).json({ newBooking });
  };

  const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findByIdAndRemove(id).populate("user movie");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
       await booking.user.bookings.pull(booking);
       await booking.movie.bookings.pull(booking);
        
        await booking.movie.save({ session });
        await booking.user.save({ session });
        session.commitTransaction(); 
    }
    catch (err) {
        return console.error(err);
    }
    if (!booking) {
        return res.status(404).json({ message: "Booking not found by given id" });
    }
    return res.status(200).json({ message: "Booking deleted successfully" });
  }
module.exports = { Booking, deleteBooking };
