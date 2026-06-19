import express from 'express'
import { MakePayment } from "../controllers/DonationController.js";

const routes = express.Router();


routes.post("/makepayment", MakePayment);

export default routes;