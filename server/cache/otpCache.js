const NodeCache = require("node-cache");
const otpCache = new NodeCache({ stdTTL: 300 });
module.exports = otpCache;