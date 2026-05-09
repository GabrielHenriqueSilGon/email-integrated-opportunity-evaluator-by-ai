import { Router }
from "express";

import multer
from "multer";

import {

  createOpportunity,
  getOpportunity,
  listOpportunities

} from "../controllers/opportunity.controller.js";

const router = Router();

const upload = multer({
  dest: "uploads/"
});

router.post(
  "/",
  upload.single("document"),
  createOpportunity
);

router.get(
  "/",
  listOpportunities
);

router.get(
  "/:id",
  getOpportunity
);

export default router;