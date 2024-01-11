function generateCreatedat() {
  const today = new Date();
  const time = today.getTime();
  return time;
}

module.exports = generateCreatedat;
