import express from "express";
const router = express.Router();
import usersRoutes from "../v1/users/users.routes";
import productsRoutes from "../v1/products/products.routes";

router.use("/users", usersRoutes);
router.use("/products", productsRoutes);

export default router;
