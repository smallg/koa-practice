const path = require('path');
const {
  uploadFileError,
  unSupportFileTypeError,
  publishGoodError,
  invalidGoodId,
  removeGoodError,
  restoreGoodError,
} = require('../constant/err.type');
const { createGood, updateGood, removeGood, restoreGood, findGoods } = require('../service/good.service');

class GoodsController {
  async upload(ctx) {
    console.log(ctx.request.files.file);
    const { file } = ctx.request.files;
    const fileTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
    ];
    console.log('file', file);
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        ctx.app.emit('error', unSupportFileTypeError, ctx);
        return;
      }
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

  async create(ctx) {
    try {
      const { createdAt, updatedAt, ...res } = await createGood(
        ctx.request.body
      );
      ctx.body = {
        code: 0,
        message: 'upload success',
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit('error', publishGoodError, ctx);
    }
  }

  async update(ctx) {
    try {
      const res = await updateGood(
        ctx.params.id, ctx.request.body
      );

      if (res) {
        ctx.body = {
          code: 0,
          message: 'update success',
          result: res,
        };
      } else {
        return ctx.app.emit('error', invalidGoodId, ctx);
      }
     
    } catch (error) {
      console.error(error);
      return ctx.app.emit('error', publishGoodError, ctx);
    }
  }

  async remove(ctx) {
    try {
      const res = await removeGood(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: 'remove success',
          result: res,
        }
      } else {
        return ctx.app.emit('error', removeGoodError, ctx);
      }
      
    } catch (error) {
      
    }
  }

  async restore(ctx) {
    try {
      const res = await restoreGood(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: 'restore success',
          result: res,
        }
      } else {
        return ctx.app.emit('error', restoreGoodError, ctx);
      }
      
    } catch (error) {
      
    }
  }

  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    try {
      const res = await findGoods(pageNum, pageSize);
      ctx.body = {
        code: 0,
        message: 'get good list success',
        result: res,
      }
    } catch (error) {
      
    }
  }
}

module.exports = new GoodsController();
