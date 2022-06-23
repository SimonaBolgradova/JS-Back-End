const router = require('express').Router();
const { isUser, isGuest } = require('../middlewares/guards');
const { register, login} = require('../services/userService');
const {mapErrors} = require('../util/mappers');

router.get('/register',isGuest(), (req, res) => {
    res.render('register',{title:'Register Page'});
});

//TODO check form action, method field names
router.post('/register',isGuest, async (req, res) => {
    try {
        if(req.body.password.trim() ==''){
            throw new Error('Password is required');
        }else if (req.body.password != req.body.repeatPassword) {
            throw new Error('Password dont match');
        }

        const user = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements
    } catch (err) {
        console.log(err);
        //TODO send error messages
        const errors = mapErrors(err);
        const data = {
            fisrtName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        res.render('register', {title:'Register Page',data, errors,})
    }
});

router.get('/login',isGuest(), (req, res) => {
    res.render('login',{title: 'Login Page'});
});

//TODO check form action method, field names
router.post('/login',isGuest(),async (req, res)=>{
    try{
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');//TODO check redirect requirements
    }catch(error){
        console.log(err);
        //TODO send error messages
        const errors = mapErrors(err)
        res.render('login', {title:'Login Page',data: {email: req.body.email},errors })
    }
});

router.get('/logout',isUser(),(req, res)=>{
    delete req.session.user;
    res.redirect('/');
})

module.exports = router;