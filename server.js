const express = require('express');
const dbConnector = require('./config/dbConnector');


const app = express();


// Add middleware for the req body parser
app.use(express.json());

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/todo', require('./routes/todosRoute'));
app.use('/api/user', require('./routes/userRoute'));

const PORT = process.env.PORT || 5000


dbConnector().then(() => {
    console.log("MongoDB connected");
});

app.listen(PORT, () => console.log(`Express starts on ${PORT}`));


module.exports = app;
