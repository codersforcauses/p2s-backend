const today = new Date();
const aWhileAgo = new Date();
aWhileAgo.setDate(today.getDate() - 100);

module.exports = {
  days: [new Date(), new Date(), new Date()],
  dates: {
    start: new Date(),
    end: new Date(),
  },
  coaches: {},
};
