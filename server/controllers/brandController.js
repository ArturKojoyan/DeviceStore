const { Brand } = require("../models/models");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async terminate(req, res) {
    const { name } = req.body;
    const resp = await Brand.destroy({ where: { name } });
    let success = true;
    let message = "brand is successfully deleted";

    if (!resp) {
      success = false;
      message = "No such brand";
    }
    return res.json({ message, success });
  }
}

module.exports = new BrandController();
