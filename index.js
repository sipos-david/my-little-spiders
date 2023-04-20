const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static("public"));

require('./routes/index')(app);

app.listen(port, () => {
   console.log(`Listening on :${port}`);
});