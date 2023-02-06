module.exports = function Token(type, value) {
  this.type = type;
  this.value = value;

  return {
    type: this.type,
    value: this.value
  };
}