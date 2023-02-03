module.exports = function Token(type, value) {
  this.type = type;
  this.value = value;

  return this;
}