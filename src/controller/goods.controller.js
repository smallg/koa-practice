class GoodsController {
  async upload(ctx, next) {
    ctx.body = 'upload successful';
  }
}

module.exports = new GoodsController();