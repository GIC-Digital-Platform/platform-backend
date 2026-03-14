const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Generates a unique employee ID in format UI + 7 alphanumeric chars (uppercase)
 * e.g. UIAB3X7K2
 */
function generateEmployeeId() {
  let suffix = '';
  for (let i = 0; i < 7; i++) {
    suffix += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return `UI${suffix}`;
}

module.exports = { generateEmployeeId };
