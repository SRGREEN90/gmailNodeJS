const express = require('express')
const nodemailer = require("nodemailer");
const app = express()
const port = 3010
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
//=============================================================================

let transporter = nodemailer.createTransport({
    service: 'gmail', // host: 'smtp.ethereal.email',
    port: 25,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'jmsbrown@gmail.com',
        pass: '111111111',
    },
    tls: {
        rejectUnauthorized: false
    }


    //
    // host: "smtp.gmail.com",
    //  port: 587,
    // requireTLS: true,

     //service: "gmail",
    // secure: false,
    // port: 25,
    // tls: {
    //     rejectUnauthorized: false
    // },
    // auth: {
    //     user: "jmsbrown@gmail.com", // generated ethereal user
    //     pass: "11111111", // generated ethereal password
    // },
});
//==========================1Request=============================================================

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//const port = process.env.PORT || 3020;
app.get ('/', function (req, res) {
    res.send('hello')
})

//=====================================
// app.get('/', (req, res) => {
//     res.send('Hello World! How Are You?')
// })
//==========================2Request============================================================

app.get('/sendMessage', async (req, res) => {

    let {message, email, name} = req.body

    let result = await transporter.sendMail({
        from: 'Mr',
        to: 'jmsbrown63@gmail.com',
        subject: 'Mr',
        html: `This <i>message</i> was sent from: 
                <div> name: ${name}</div>
                <div>email: ${email}</div>
                <div>message: ${message}</div>`
    })

    res.send('success')
    // let info = await transporter.sendMail({
    //     from: 'Sergey test account', // sender address
    //      to: "jmsbrown@gmail.com", // list of receivers
    //    // to: "sr.gr@bk.ru", // list of receivers
    //     subject: "Testing by Sergey", // Subject line
    //     html: "<b>Hello It's me!</b>", // html body
    // });
    //
    // res.send("It's nodeMailer")
})

//==============================Port=====================================================
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})