import { Router } from "express";
import courseRoute from "./courses.route"
import sectionRoute from "./section.route"
import profRoute from "./prof.route"


const routes = Router()

routes.use(courseRoute)
routes.use(sectionRoute)
routes.use(profRoute)

export default routes