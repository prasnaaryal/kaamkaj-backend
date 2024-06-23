import express from "express";
import { authenticateToken } from "../../middleware/index.js";
import {
createApplicant,
  confirmOrderPayment,
  getAllApplicants,
  deleteOrder,
  getAllOrdersByUser,
  getOrderById,
  updateOrderStatus,
} from "../../controllers/applicant/applicantController.mjs";

const router = express.Router();

router.post("/create-applicant", authenticateToken, createApplicant);
router.get("/get-all-applicants", authenticateToken, getAllApplicants);

router.get("/get-applicant-by-id/:applicantId", authenticateToken, getOrderById);
router.put(
  "/update-applicant-status/:applicantId",
  authenticateToken,
  updateOrderStatus
);
router.delete("/delete-applicant/:applicantId", authenticateToken, deleteOrder);

export default router;