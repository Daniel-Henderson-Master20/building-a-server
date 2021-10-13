import express from 'express';
import ImageResize from '../../operations/imageResize';
import path from 'path';

const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response) => {
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  if (isNaN(width) != true && isNaN(height) != true){
    const filename = req.query.filename as string;
    const resizeOp = await ImageResize(width, height, filename);
    if (resizeOp.success) {
      res.sendFile(resizeOp.result, { root: path.join('./assets', 'thumb') });
    } else {
      res.send(resizeOp.result);
    }
  }
});

export default images;