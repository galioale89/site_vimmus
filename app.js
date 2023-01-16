const express = require('express')
const app = express()

//const handlebars = require('express-handlebars')
const { engine } = require('express-handlebars')
//Body-Parser
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({extended: true,limit: '100mb'}))
//app.use(bodyParser.urlencoded({extended: true}))

//Handlebars
app.disable('x-powered-by')
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const path = require('path')
// Essa linha faz o servidor disponibilizar o acesso às imagens via URL!
app.use(express.static('public/'))
//Public para CSS do bootstrap
app.use(express.static(path.join(__dirname, 'public')))

//Função passport para logout
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/politica', (req, res) => {
    res.render('politica')
})

app.get('/termo', (req, res) => {
    res.render('termo')
})

const APP_PORT = process.env.APP_PORT || 3000

app.listen(APP_PORT, () => {
    console.log(`Running app at port:${APP_PORT}`)
})