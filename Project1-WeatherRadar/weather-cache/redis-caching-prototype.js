import express from 'express';
import fetch from 'node-fetch';
import redis from 'redis';

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

// Make request to Github for data
async function getProducts(req, res, next) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);

    const res_data = await response.json();

    // Set data to Redis
    client.setEx('red_products', 3600 , JSON.stringify(res_data));
    console.log('Fetching Data...');
    res.send(res_data);
  } catch (err) {
    console.error(err);
    res.status(500);

  }
}

// Cache middleware
function cache(req, res, next) {
  client.get('red_products', (err, data) => {
    if (err) throw err;

    if (data !== null) {
      console.log("cached data ...")
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
}

app.get('/products', cache, getProducts);

app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});