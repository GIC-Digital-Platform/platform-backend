class CreateEmployeeCommand {
  constructor({ name, emailAddress, phoneNumber, gender, cafeId, startDate }) {
    this.name = name;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.cafeId = cafeId || null;
    this.startDate = startDate || null;
  }
}

module.exports = CreateEmployeeCommand;
