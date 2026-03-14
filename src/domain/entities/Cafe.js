/**
 * Cafe domain entity
 */
class Cafe {
  constructor({ id, name, description, logo, location, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.logo = logo || null;
    this.location = location;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Cafe;
