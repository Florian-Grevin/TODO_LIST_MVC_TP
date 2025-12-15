const app = require('./app');
const index = require('./config/index')
const PORT = index.port;

app.listen(PORT, function(err) {
   if (err) console.log(err);
   console.log("Server listening on PORT", PORT);
});