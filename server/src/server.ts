import debug from 'debug';

import { app } from "./app";

const logs = debug('app:server');

const port = process.env.PORT || 3333;
app.listen(port, () => {
  logs(`Server is running on http://localhost:${port}`)
})