import express from "express";

import { getask, taskCreate, taskDelete } from "./controller.js";

const router = express.Router();

router.post("/taskcreate", taskCreate);
router.delete("/taskdelete", taskDelete);
router.get("/getTask", getask);

export default router;
