const GetCafesQuery = require('../../application/cafes/queries/GetCafesQuery');
const CreateCafeCommand = require('../../application/cafes/commands/CreateCafeCommand');
const UpdateCafeCommand = require('../../application/cafes/commands/UpdateCafeCommand');
const DeleteCafeCommand = require('../../application/cafes/commands/DeleteCafeCommand');

class CafeController {
  constructor({ mediator }) {
    this.mediator = mediator;
    this.getCafes = this.getCafes.bind(this);
    this.createCafe = this.createCafe.bind(this);
    this.updateCafe = this.updateCafe.bind(this);
    this.deleteCafe = this.deleteCafe.bind(this);
  }

  async getCafes(req, res, next) {
    try {
      const { location } = req.query;
      const data = await this.mediator.send(new GetCafesQuery({ location }));
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async createCafe(req, res, next) {
    try {
      const logo = req.file ? req.file.filename : null;
      const data = await this.mediator.send(
        new CreateCafeCommand({ ...req.body, logo }),
      );
      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async updateCafe(req, res, next) {
    try {
      const logo = req.file ? req.file.filename : undefined;
      const data = await this.mediator.send(
        new UpdateCafeCommand({ id: req.params.id, ...req.body, logo }),
      );
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async deleteCafe(req, res, next) {
    try {
      await this.mediator.send(new DeleteCafeCommand({ id: req.params.id }));
      res.json({ success: true, message: 'Cafe deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CafeController;
