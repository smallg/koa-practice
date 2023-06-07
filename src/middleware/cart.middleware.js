const { invalidGoodId } = require('../constant/err.type');

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      // good_id: {
      //   type: 'number',
      //   required: true,
      // }
      good_id: 'number',
    });
    await next();
  } catch (error) {
    console.error(error);
    return ctx.app.emit('error', invalidGoodId, ctx);
  }
}

module.exports = {
  validator,
};