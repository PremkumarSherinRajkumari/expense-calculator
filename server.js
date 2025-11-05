
const express = require('express');
const cookieParser = require('cookie-parser');
const services = require('./services');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors'); 

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());
app.use(cors({
  origin: 'http://expense-calculator.s3-website.us-east-2.amazonaws.com',
  credentials: true,
}));


// Sessions
app.get('/api/sessions', services.checkSessionsService);
app.post('/api/sessions', services.loginService);
app.delete('/api/sessions', services.logoutService);


// Transactions
app.get('/api/transactions', services.getTransactionsService);
app.post('/api/transactions', services.addTransactionsService);
app.delete('/api/transactions/:id', services.deleteTransactionsService);


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
