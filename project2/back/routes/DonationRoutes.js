import express from 'express'
import SecuredUserApi from '../util/SecuredUserApi.js'
import { MakePayment, PaymentDone, GetAllDonation } from "../controllers/DonationController.js";

const routes = express.Router();


routes.post("/makepayment", SecuredUserApi, MakePayment);
routes.post("/paymentdone", SecuredUserApi, PaymentDone);
routes.get("/alldonation", GetAllDonation);

export default routes;