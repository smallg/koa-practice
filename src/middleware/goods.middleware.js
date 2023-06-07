const { goodFormatError, invalidGoodId } = require('../constant/err.type');
const { findGood } = require('../service/good.service');

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

const validatorGoodId = async (ctx, next) => {
  const res = await findGood(ctx.request.body.good_id);
  if (res) {
    await next();
  } else {
    return ctx.app.emit('error', invalidGoodId, ctx);
  }
  
};

module.exports = {
  validator,
  validatorGoodId
};