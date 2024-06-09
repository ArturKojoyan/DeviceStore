const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      console.log(req.body, "req body");
      console.log(req.files, "req files");
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        let infoArray = JSON.parse(info);
        infoArray.forEach((item) =>
          DeviceInfo.create({
            title: item.title,
            description: item.description,
            deviceId: device.id,
          })
        );
      }
      return res.json(device);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getAll(req, res) {
    const { brandId, typeId, limit = 3, page = 1 } = req.query;
    console.log(req.query, "req.query");
    let offset = page * limit - limit;
    let devices;

    switch (true) {
      case !brandId && !typeId:
        devices = await Device.findAndCountAll({ limit, offset });
        break;
      case brandId && !typeId:
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit,
          offset,
        });
        break;
      case typeId && !brandId:
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit,
          offset,
        });
        break;
      default:
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          limit,
          offset,
        });
        break;
    }
    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }

  async terminate(req, res) {
    const { id } = req.params;
    await Device.destroy({ where: { id } });
    return res.json({ message: "device successfully deleted" });
  }
}

module.exports = new DeviceController();
