import { Router } from "express";
import products from "./products.js";
import categories from "./categories.js";
const routes = Router()

routes.use('/', products);
routes.use('/', categories);

export default routes;