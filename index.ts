import { app } from './src';
import dotenv from 'dotenv';
dotenv.config();

import { init } from "./src/db";
const port = process.env.PORT || 8000;

init().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})