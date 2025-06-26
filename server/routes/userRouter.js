import express from 'express';
import { register, verifyOTP, login, logout, forgotPassword, resetPassword } from '../controllers/userController.js';
import { User } from '../models/userModel.js'; // ✅ Add this line
import { isAuthenticated } from '../middlewares/auth.js';
import {getUser} from '../controllers/userController.js'; // ✅ Import getUser controller

const router = express.Router();

// ✅ Existing register route
router.post('/register', register);

// ✅ Temporary route to delete test user
router.delete('/delete-test-user', async (req, res) => {
    try {
        const { email, phone } = req.body; // ✅ Extract from body

        const result = await User.deleteMany({
            $or: [
                email ? { email } : {},
                phone ? { phone } : {}
            ]
        });

        res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} test user(s)`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete test user",          
        });
    }
});

router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/logout",isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);


export default router;
