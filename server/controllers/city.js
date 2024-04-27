import City from "../models/city.js";

export const create = async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.json({ city });
  } catch (error) {
    res.status(400).send("City creation failed");
  }
};

export const list = async (req, res) => {
  try {
    const cities = await City.find();
    res.json({ cities });
  } catch (error) {
    res.status(400).send("City list failed");
  }
};

export const del = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    res.json({ city });
  } catch (error) {
    res.status(400).send("City deletion failed");
  }
};
