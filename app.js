const express = require('express');
const path = require('path');
const port = process.env.PORT || '3001';

const clientPath = path.join('/Users/ekaputkin/WebstormProjects/', 'app-architecture/src');
const employeesRouter = require('./routes/employees'),
      positionsRouter = require('./routes/positions');

const app = express();

app.use(express.static(clientPath));
app.use('/employees', employeesRouter);
app.use ('/positions', positionsRouter);

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});