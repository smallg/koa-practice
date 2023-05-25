const path = require('path');

const { uploadFileError } = require('../constant/err.type');

class GoodsController {
  async upload(ctx, next) {
    console.log(ctx.request.files.file);
    const { file } = ctx.request.files;
    console.log('file path', file.path)
    if (file) {
      ctx.body = {
        code: 0,
        message: 'upload success',
        result: {
          file: path.basename(file.filepath),
        },
      };
    } else {
      ctx.app.emit('error', uploadFileError, ctx);
      return;
    }
  }
}

module.exports = new GoodsController();
