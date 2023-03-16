import express from "express";
const router = express.Router();

import usersRoutes from "../v1/users/users.routes";
import productsRoutes from "../v1/products/products.routes";
import jobsRoutes from "../v1/jobs/jobs.routes";

router.use("/users", usersRoutes);
router.use("/jobs", jobsRoutes);
router.use("/products", productsRoutes);

export default router;
