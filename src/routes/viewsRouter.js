import { Router } from "express";
import ProductDao from "../daos/mongodb/ProductDao.js";
import CartDao from "../daos/mongodb/CartDao.js";
import UserManager from "../daos/mongodb/UserDao.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const router = Router ();
const productManager = new ProductDao ();
const userManager = new UserManager ();


router.get("/login", async (req, res) => {
  res.render("login", {
    title: "Login",
    style: "home",
    logued: false,
  });
});

router.get("/registro", async (req, res) => {
  res.render("registro", {
    title: "Registro",
    style: "home",
    logued: false,
  });
});

router.get("/perfil", async (req, res) => {
  const userData = req.session.userData;
  res.render ("perfil", {
    userData: userData
  });
});

router.get("/productos", async (req, res) => {
  const userData = await userManager.getById(req.session.userData);
  const productos = await productManager.getProducts();
  console.log (userData)
  res.render ("productos", {
    userData: userData,
    productos: productos.docs.map(product=>product.toJSON()),
  })
});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.redirect("/login");
    else
      res.render("user/perfil", {
        title: "Registro",
        style: "home",
        user,
        logued: true,
        error: { message: err, status: true },
      });
  });
});

router.get('/error-registro',(req,res)=>{
  res.render('errorRegistro')
})

router.get('/error-login',(req,res)=>{
  res.render('errorLogin')
})


export default router;
