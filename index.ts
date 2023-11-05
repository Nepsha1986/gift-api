import { app } from './src';
import { init } from "./src/db";

const port = process.env.PORT || 8000;

init().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})