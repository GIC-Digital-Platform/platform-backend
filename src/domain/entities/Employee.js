/**
 * Employee domain entity
 */
class Employee {
  constructor({ id, name, emailAddress, phoneNumber, gender, createdAt, updatedAt, cafeId, cafeName, startDate }) {
    this.id = id;
    this.name = name;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.cafeId = cafeId || null;
    this.cafeName = cafeName || null;
    this.startDate = startDate || null;
  }

  get daysWorked() {
    if (!this.startDate) return 0;

    const now = new Date();
    const start = new Date(this.startDate);
    return Math.floor((now - start) / (1000 * 60 * 60 * 24)); // Calculate days worked based on start date
  }
}

module.exports = Employee;
