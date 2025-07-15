import { Router } from "express";
import courseRoute from "./courses.route"

const routes = Router()

routes.use(courseRoute)

export default routes