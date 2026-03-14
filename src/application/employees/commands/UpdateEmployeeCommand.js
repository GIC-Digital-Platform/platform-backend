class UpdateEmployeeCommand {
  constructor({ id, name, emailAddress, phoneNumber, gender, cafeId, startDate }) {
    this.id = id;
    this.name = name;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.cafeId = cafeId !== undefined ? cafeId : undefined;
    this.startDate = startDate !== undefined ? startDate : undefined;
  }
}

module.exports = UpdateEmployeeCommand;
