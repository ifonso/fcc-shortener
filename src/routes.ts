import { Router } from "express";
import controller from "./controller";

const routes = Router();

routes.post("/api/shorturl", controller.shortUrl);
routes.get("/api/shorturl/:id", controller.findLink);

export default routes;