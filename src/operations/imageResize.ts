import path from 'path';
import fs from 'fs';
import { error } from 'console';

const sharp = require('sharp')
const ImageResize = async (
  width: number,
  height: number,
  filename: string
): Promise<{ success: boolean; result: string }> => {
  try {
    const newFileName = `${filename}_${width}_${height}.jpg`;
    if (!fs.existsSync(path.join('./assets', 'thumb', newFileName))) {
      console.log('creating resized image');
      await sharp(`./assets/full/${filename}.jpg`).resize(width, height).toFile(path.join('./assets', 'thumb', newFileName))
    }
    return { success: true, result: newFileName };
  } catch (err) {
    return { success: false, result: "error" };
  }
};

export default ImageResize;