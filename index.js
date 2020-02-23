const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
require('./middleware/passport');
const user = require('./routes/user');


app.use('/user', user);


app.listen(port, () => console.log(`Application running on port: ${port}`))