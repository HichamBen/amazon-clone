const express = require("express");
const data = require("../data");
const expressAsyncHandler = require("express-async-handler");
const { generateHash, isValidPass } = require("../config/genValidPass");
const User = require("../models/userModel");
const { generateToken, isAuth } = require("../utils");

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.deleteMany({});
    // const createdUsers = await User.insertMany(data.users);
    // res.send({ createdUsers });
     res.send("They created.");

  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const hashSalt = user.password.split("++");
      if (isValidPass(req.body.password, hashSalt[0], hashSalt[1])) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }

    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { salt, hash } = generateHash(req.body.password);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: `${hash}++${salt}`,
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        const { salt, hash } = generateHash(req.body.password);
        user.password = `${hash}++${salt}`;
      }
      const updateUser = await user.save();
      res.send({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser),
      });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

module.exports = userRouter;
