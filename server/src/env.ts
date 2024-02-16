import { config } from "dotenv";
config({
    path: "./.env"
});
class Envirements {
    get port(): number {
        return parseInt(process.env.PORT || "80");
    }
    get databaseUri(): string {
        return process.env.DATABASE_URI || "";
    }
}
export const envirements = new Envirements();