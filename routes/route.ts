import { Router } from "express";
import courseRoute from "./courses.route"
import sectionRoute from "./section.route"

const routes = Router()

routes.use(courseRoute)
routes.use(sectionRoute)

export default routes