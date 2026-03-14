class GetCafesHandler {
  constructor({ cafeRepository }) {
    this.cafeRepository = cafeRepository;
  }

  async handle(query) {
    return this.cafeRepository.findAll(query.location);
  }
}

module.exports = GetCafesHandler;
