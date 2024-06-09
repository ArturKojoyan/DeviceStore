const { Type } = require("../models/models");

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async terminate(req, res) {
    const { name } = req.body;
    const resp = await Type.destroy({ where: { name } });
    let success = true;
    let message = "type is successfully deleted";
    
    if (!resp) {
      success = false;
      message = "No such type";
    }
    return res.json({ message, success });
  }
}

module.exports = new TypeController();
