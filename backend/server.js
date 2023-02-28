const Express = require('express');
require('./bd_connect.js');
const { Router } = require('./router.js');
const app = Express();

app.use(Express.json({ extended: true }));
app.use(Express.urlencoded({ extended: true }));
app.use(Router);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is listening to port:${PORT}`);
});
