import express from "express";
import {
  getColorPaletteQuestions,
  getSpaceEstimationQuestions,
  reply,
} from "../controllers/botController.js";

const router = express.Router();

router.post("/", reply);
router.get("/questions/space-estimation", getSpaceEstimationQuestions);
router.get("/questions/color-palette", getColorPaletteQuestions);

export default router;
