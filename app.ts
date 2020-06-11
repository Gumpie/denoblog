import { Application } from "https://deno.land/x/oak/mod.ts";
import logger from "./middleware/logger.ts";
import timer from "./middleware/timer.ts";
const app = new Application();

app.use(logger);
app.use(timer);

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use((ctx) => {
  ctx.response.body = "hello World !";
});

console.log("app running -> http://localhost:3000");

await app.listen({ port: 3000 });
