import supertest from 'supertest';
import app from '../index';
import path from 'path';
import fs from 'fs';

const request = supertest(app);
describe('Test endpoint responses', () => {
  const testWidth = 200;
  const testHeight = 200;
  const testFilename = 'fjord';
  const imgName = `${testFilename}_${testWidth}_${testHeight}.jpg`;
  const imgPath = path.join('./assets', 'thumb', imgName);

  beforeAll(async () => {
    // delete an img that can be used for testing
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  });

  it('tests invalid request to api', async () => {
    const response = await request.get('/api/images?filename=fjord&width=100');
    expect(response.status).toBe(400);
  });

  it('tests valid request to api', async () => {
    expect(fs.existsSync(imgPath)).toBeFalse();
    const response = await request.get(
      `/api/images?filename=${testFilename}&width=${testWidth}&height=${testHeight}`
    );
    expect(response.status).toBe(200);
    expect(fs.existsSync(imgPath)).toBeTrue();
  });
});