import { config } from "dotenv";
config({
    path: "./.env"
});
class Envirements {
    get port(): number {
        return parseInt(process.env.PORT || "80");
    }
}
export const envirements = new Envirements();