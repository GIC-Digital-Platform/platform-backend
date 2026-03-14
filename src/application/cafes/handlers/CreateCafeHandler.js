class CreateCafeHandler {
  constructor({ cafeRepository }) {
    this.cafeRepository = cafeRepository;
  }

  async handle(command) {
    return this.cafeRepository.create({
      name: command.name,
      description: command.description,
      logo: command.logo,
      location: command.location,
    });
  }
}

module.exports = CreateCafeHandler;
