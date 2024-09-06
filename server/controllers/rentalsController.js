import fs from "fs";
import Rentals from "../models/Rentals.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import Message from "../models/Message.js";
import { v2 as cloudinary } from "cloudinary";

export default class API {
  //========================================================= Create New Rental
  static async createNewRental(req, res) {
    const {
      address1,
      address2,
      city,
      region,
      classes,
      description,
      price,
      bedrooms,
      bathrooms,
    } = req.body;
    const files = req.files;
    const user = await User.findById(req.user._id);

    const images = [];

    files.map(async (element) => {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });
      const uploadResult = await cloudinary.uploader.upload(element.path, {
        public_id: element.originalname.slice(
          0,
          element.originalname.indexOf(".")
        ),
      });
      images.push(uploadResult.secure_url);
      const optimizeUrl = cloudinary.url(
        element.originalname.slice(0, element.originalname.indexOf(".")),
        {
          fetch_format: "auto",
          quality: "auto",
        }
      );
      const autoCropUrl = cloudinary.url(
        element.originalname.slice(0, element.originalname.indexOf(".")),
        {
          crop: "auto",
          gravity: "auto",
          width: 500,
          height: 500,
        }
      );
    });

    setTimeout(async () => {
      try {
        images.sort(function (a, b) {
          return a.charAt(a.length - 5) - b.charAt(b.length - 5);
        });
        const rents = await Rentals.create({
          address1,
          address2,
          city,
          region,
          classes,
          images,
          user: user,
          description,
          price,
          bedrooms,
          bathrooms,
        });
        return res.status(200).json(rents);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }, 3000);
  }

  //=================================================================Get All Rentals
  static async getRentals(req, res) {
    const rentals = await Rentals.find({ rented: { $ne: true } }).populate(
      "user"
    );

    if (!rentals) {
      return res.status(404).json({ message: "No Rentals found" });
    }
    return res.status(200).json({ rentals });
  }

  //==================================================================Update Rental
  static async updateRental(req, res) {
    const {
      address1,
      address2,
      city,
      region,
      phone,
      classes,
      description,
      price,
      bedrooms,
      bathrooms,
    } = req.body;

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Incorrect ID" });
    }
    const findRental = await Rentals.findById(id);
    if (!findRental) {
      return res.status(404).json({ Message: "Rental not exists" });
    }

    const images = [];
    const imageFiles = req.files;

    if (imageFiles.length === 4) {
      imageFiles.forEach(async (element) => {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.API_KEY,
          api_secret: process.env.API_SECRET,
        });
        const uploadResult = await cloudinary.uploader.upload(element.path, {
          public_id: element.originalname.slice(
            0,
            element.originalname.indexOf(".")
          ),
        });
        images.push(uploadResult.secure_url);
        const optimizeUrl = cloudinary.url(
          element.originalname.slice(0, element.originalname.indexOf(".")),
          {
            fetch_format: "auto",
            quality: "auto",
          }
        );
        const autoCropUrl = cloudinary.url(
          element.originalname.slice(0, element.originalname.indexOf(".")),
          {
            crop: "auto",
            gravity: "auto",
            width: 500,
            height: 500,
          }
        );

        setTimeout(async () => {
          findRental.images.forEach(async (element) => {
            cloudinary.config({
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.API_KEY,
              api_secret: process.env.API_SECRET,
            });
            const newArray = element.split("/");
            await cloudinary.uploader.destroy(
              newArray[7].slice(0, newArray[7].indexOf("."))
            );
          });
        }, 2500);
      });

      setTimeout(async () => {
        images.sort(function (a, b) {
          return a.charAt(a.length - 5) - b.charAt(b.length - 5);
        });
        try {
          await findRental.updateOne({
            address1,
            address2,
            city,
            region,
            phone,
            classes,
            images,
            description,
            price,
            bedrooms,
            bathrooms,
          });
          return res.status(200).json({ message: "Successfully updated" });
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      }, 7000);
    } else {
      findRental.images.forEach((element) => {
        images.push(element);
      });

      try {
        await findRental.updateOne({
          address1,
          address2,
          city,
          region,
          phone,
          classes,
          images,
          description,
          price,
          bedrooms,
          bathrooms,
        });
        return res.status(200).json({ message: "Successfully updated" });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }
  }

  //======================================================== Delete Rental
  static async deleteRental(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Incorrect ID" });
    }

    const rental = await Rentals.findById(id);
    if (!rental) {
      return res.status(404).json({ message: "Rental not exists" });
    }

    rental.images.forEach(async (element) => {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });
      const newArray = element.split("/");
      await cloudinary.uploader.destroy(
        newArray[7].slice(0, newArray[7].indexOf("."))
      );
    });

    setTimeout(async () => {
      try {
        await rental.deleteOne();
        return res.status(200).json({ message: "Rentals deleted." });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }, 3000);
  }

  //===================================================== Get User Rentals
  static async getUserRentals(req, res) {
    const user = await User.findById(req.user._id);
    try {
      const userRents = await Rentals.find({ user: user });
      return res.status(200).json({ userRents, email: user.email });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  //======================================================Add Inquiries
  static async addInquiry(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Incorrect ID" });
    }

    const { inquiry } = req.body;

    const rents = await Rentals.findById(id);
    if (!rents) {
      return res.status(404).json({ message: "Rental not exists." });
    }
    try {
      rents.inquiries.push(inquiry);
      await rents.save();
      return res
        .status(200)
        .json({ message: "Rental successfully updated", rents });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateIfRented(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Incorrect ID" });
    }
    const user = await User.findById(req.user._id);

    const rent = await Rentals.findById(id);
    if (!rent) {
      return res.status(404).json({ message: "Rental no exists." });
    }

    if (rent.user._id.toString() != user._id.toString()) {
      return res
        .status(401)
        .json({ message: "You dont have permission to do this." });
    }
    try {
      const rented = await rent.updateOne({ rented: !rent.rented });
      return res.status(200).json({ message: "Successfuly updated" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async sendMessage(req, res) {
    const { name, email, message } = req.body;
    try {
      const newMessage = await Message.create({ name, email, message });
      return res.status(200).json({ message: "Successfuly added", newMessage });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
