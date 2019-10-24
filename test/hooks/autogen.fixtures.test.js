const today = new Date();
const aWhileAgo = new Date();
aWhileAgo.setDate(aWhileAgo.getDate() - 100);

export default {
  days: [new Date(), new Date(), new Date()],
  dates: {
    start: new Date(),
    end: new Date()
  },
  coaches: {}
};
