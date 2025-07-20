import { Router } from "express";
import courseRoute from "./courses.route"
import sectionRoute from "./section.route"
import profRoute from "./prof.route"
import studentRoute from "./student.route"
import queueRoute from "./queue.route"

const routes = Router()

routes.use(courseRoute)
routes.use(sectionRoute)
routes.use(profRoute)
routes.use(studentRoute)
routes.use(queueRoute)

export default routes