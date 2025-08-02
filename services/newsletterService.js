const Newsletter = require('../models/Newsletter');

exports.subscribe = async (email) => {
  const existing = await Newsletter.findOne({ email });
  if (existing) throw new Error('Already subscribed');
  const subscription = new Newsletter({ email });
  await subscription.save();
  return subscription;
}; 