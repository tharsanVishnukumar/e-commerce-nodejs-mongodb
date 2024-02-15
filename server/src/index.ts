import { app } from "./app"
import { log } from "./log";
import { envirements } from "./env";
const main = async () => {
    app.listen(envirements.port, () => {
        log({ message: `Server is running in port ${envirements.port}`, type: 'info' });
    });
};
main().catch((err) => log({ message: err.message, type: 'error' }));