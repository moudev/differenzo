const {
  Myers,
  Myers: { diff },
  Encoder
} = require('./myers');
const formats = require('./formats');
const changed = require('./changed');

// to use destructuring in browser version
// https://rollupjs.org/guide/en/#outputexports
exports.Myers = Myers
exports.Encoder = Encoder
exports.diff = diff
exports.formats = formats
exports.changed = changed
