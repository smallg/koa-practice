const { goodFormatError } = require('../constant/err.type');

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      good_name: {
        type: 'string',
        required: true,
      },
      good_price: {
        type: 'number',
        required: true,
      },
      good_num: {
        type: 'number',
        required: true,
      },
      good_img: {
        type: 'string',
        required: true,
      }
    });
  } catch (err) {
    console.error(err);
    goodFormatError.result = err;
    return ctx.app.emit('error', goodFormatError, ctx);
  }

  await next();
};

module.exports = {
  validator
};