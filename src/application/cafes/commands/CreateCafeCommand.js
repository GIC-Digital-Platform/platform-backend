class CreateCafeCommand {
  constructor({ name, description, logo, location }) {
    this.name = name;
    this.description = description;
    this.logo = logo || null;
    this.location = location;
  }
}

module.exports = CreateCafeCommand;
