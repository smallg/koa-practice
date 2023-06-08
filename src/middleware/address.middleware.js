const { addressFormatError, invalidAddressError } = require("../constant/err.type");
const { findOneAddress } = require("../service/address.service");

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (error) {
      console.error(error);
      addressFormatError.result = error;
      return  ctx.app.emit('error', addressFormatError, ctx);
    }
    await next();
  }
}

const isValidAddress = async (ctx, next) => {
  const res = await findOneAddress(ctx.request.params.id, ctx.state.user.id);
  if(res){
    await next();
  } else {
    return ctx.app.emit('error', invalidAddressError, ctx);
  }
}

module.exports = {
  validator,
  isValidAddress,
}