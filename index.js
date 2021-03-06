const { TextEncoder, TextDecoder } = require("util");
const express = require('express') //require express module
var fs = require('fs');
const path = require('path')
const app = new express() //calls express function to start new Express app

const readXlsxFile = require('read-excel-file/node');

const ejs = require('ejs')
app.set('view engine', 'ejs')

const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://Himanshu:manu2209@cluster0.sdsek.mongodb.net/my_testplatform', { useNewUrlParser: true })

mongoose.connect('mongodb://localhost/gulzari', { useNewUrlParser: true, useUnifiedTopology: true });


var multer = require('multer');
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
// var upload = multer({ storage: storage });

var compression = require('compression');
var helmet = require('helmet');



app.use(compression()); //Compress all routes

// app.use(helmet()); //Protect against well-known vulnerabilities
// But this disable WYSIWYG editor

var bodyParser = require('body-parser')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser());

app.use(express.static('public'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb', extended: true })); //limit attribute is used to deal with error: "PayloadTooLargeError: request entity too large"
app.use(express.urlencoded({ limit: '50mb', extended: true })); //limit attribute is used to deal with error: "PayloadTooLargeError: request entity too large"


const homeController = require('./controllers/home')
const newTestController = require('./controllers/newTest')
const storeTestController = require('./controllers/storeTest')

const newUserController = require('./controllers/newUser')

const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

const logoutController = require('./controllers/logout')

const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const flash = require('connect-flash');
app.use(flash());

const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
})




var catalogRouter = require('./routes/catalog');
app.use('/catalog', authMiddleware, catalogRouter);
// app.use('/catalog', catalogRouter);

// testTaker/tests
var testTakerRouter = require('./routes/testTaker');
app.use('/testTaker', testTakerRouter)

app.get('/', homeController);

app.get('/create', authMiddleware, newTestController);
app.post('/create/store', authMiddleware, storeTestController)

app.get('/edit', (req, res) => {
    res.render('contact');
})

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

app.get('/auth/logout', logoutController)

//----------------------- Serving Ads.txt File at /ads.txt START-------------------------

app.use("/ads.txt", express.static(__dirname + '/ads.txt'));

//----------------------- Serving Ads.txt File at /ads.txt  END-------------------------

app.use((req, res) => res.render('notfound'));

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
app.listen(port, () => {
    console.log('App listening on port 4000...')
})
// app.listen(4000, () => {
//     console.log("App listening on port 4000")
// })