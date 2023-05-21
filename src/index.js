const { APP_PORT } = require('./config/config.default');

const app = require('./app');

// Handle errors
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(APP_PORT);