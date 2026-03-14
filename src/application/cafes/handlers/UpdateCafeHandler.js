const { NotFoundError } = require('../../../api/middleware/errors');

class UpdateCafeHandler {
  constructor({ cafeRepository }) {
    this.cafeRepository = cafeRepository;
  }

  async handle(command) {
    const existing = await this.cafeRepository.findById(command.id);
    if (!existing) throw new NotFoundError(`Cafe with id '${command.id}' not found`);

    const updateData = {
      name: command.name,
      description: command.description,
      location: command.location,
    };

    // Only update logo if a new one was provided
    if (command.logo !== undefined) {
      updateData.logo = command.logo;
    }

    return this.cafeRepository.update(command.id, updateData);
  }
}

module.exports = UpdateCafeHandler;
