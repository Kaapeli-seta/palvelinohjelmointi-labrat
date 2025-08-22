import app from './app';
import mongoConnect from './utils/db';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

(async () => {
  try {
    await mongoConnect();
  } catch (error) {
    console.log('Server error', (error as Error).message);
  }
})();
