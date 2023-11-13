const express = require('express');
const htmlRouter = require('./routes/htmlRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Turning on the router for the html routes by using middleware
app.use(htmlRouter);

app.listen(port, () => console.log(`Now listening on port: ${port}`));
