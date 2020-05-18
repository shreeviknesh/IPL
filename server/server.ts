import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { readCsvAsObjectArray } from "./utils.ts";

// Local imports
import { APP_PORT } from "./.config.ts";

let data = await readCsvAsObjectArray("./data/player_list.csv", [
    "Name",
    "Type",
    "Foreigner",
]);

const router = new Router();
router
    .get("/", (context) => {
        context.response.body = "Hello world!";
    })
    .get("/find/:type/:name", (context) => {
        context.response.headers.set("Access-Control-Allow-Methods", "GET");
        context.response.headers.set(
            "Access-Control-Allow-Origin",
            "http://127.0.0.1:5500"
        );
        context.response.headers.set("status", "200");
        console.log("GET /find");
        if (context.params && context.params.type && context.params.name) {
            let responses = [];

            for (let row of data) {
                const [name, type, foreign] = Object.values(row);
                if (name.startsWith(context.params.name)) {
                    responses.push({ name, type, foreign });
                    console.log(name);
                }
            }

            context.response.body = responses;
        }
    });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Listening on port ", APP_PORT);
await app.listen({ port: APP_PORT });
