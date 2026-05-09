import express from "express";

import {
  approveOpportunity,
  rejectOpportunity
} from "../controllers/evaluation.controller.js";

const router = express.Router();

router.get("/:id/approve", approveOpportunity);

router.get("/:id/reject", rejectOpportunity);

export default router;