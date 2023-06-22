import { registroService, loginService, loginResponseService } from "../services/UserService.js";
import UserManager from "../daos/mongodb/UserDao.js";
import {
    getCartService,
    createCartService,
    addProductToCartService,
    deleteProductToCartService,
    deleteAllProductToCartService,
    updateProductToCartService,
    updateProductQuantityService
  } from "../services/CartsService.js";

const userManager = new UserManager ();

export const registroController = async (req, res, next) => {
    try {
        const newUser = await registroService (req.body)
        if(newUser) {
            res.redirect('/login')
        } else {
            res.redirect('/error-registro')
        }
    } catch (error) {
        console.log (error);
    }
}

export const loginController = async (req, res, next) => {
    try {
        const userData = req.body
        const validate = await loginService (userData)
        if(!validate){
            res.status(404).redirect('/error-login')
        } else {
            const cartId = req.session.cid
            if(!cartId){
                const createCart = await createCartService ();
                req.session.cartId = createCart._id
                req.session.userData = validate
            }
        res.status(304).redirect('/productos');
        }       
    } catch (error) {
        console.log (error);
    }
}

export const logoutController = async (req, res, next) => {
    try {
        req.session.destroy ((err) => {
            if (err) {
                console.log (err);
            } else {
                res.redirect ("/login");
            }
        })
    } catch (error) {
        console.log (error);
    }
}

export const registerResponse = (req, res, next)=>{
    try {
        res.json({
            msg: 'Register OK',
            session: req.session    // --> passport.user: id mongo
        })
    } catch (error) {
        next(error);
    }
};

export const loginResponse = async(req, res, next)=>{
    try {
        const user = await userManager.getById (req.session.passport.user);
        const { first_name, last_name, email, age, role } = user;
        res.json({
            msg: 'Login OK',
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                age,
                role
            }
        })
    } catch (error) {
        next(error);
    }
}

export const githubResponse = async(req, res, next)=>{
    try {
        const { first_name, last_name, email, role, isGithub } = req.user;
        res.json({
            msg: 'Register/Login Github OK',
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                role,
                isGithub
            }
        })
    } catch (error) {
        next(error);
    }
}

