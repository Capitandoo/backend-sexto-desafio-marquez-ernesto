import { Router } from "express";
import passport from "passport";
import { registroController, loginController, logoutController, registerResponse, loginResponse, githubResponse } from "../controllers/UserController.js";


const router = Router();

router.post("/registro", registroController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post('/register', passport.authenticate('register'), registerResponse);
router.post('/logon', passport.authenticate('logon'), loginResponse);
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/profile-github', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);

export default router;
