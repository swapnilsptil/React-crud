const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();

const port = process.env.PORT || 5000;

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'ptilswapnils@gmail.com',
        pass: 'swapnil@7',
    },
    secure: true,
});

route.post('/text-mail', (req, res) => {
    const {to, text, name } = req.body;
    const mailData = {
        from: 'swapnils.ptil@gmail.com',
        to: to,
        subject: 'Thank you for your application / Your application at Ezaburo',
        text: text,
        html: `Dear <b> ${name} </b>, <br /> <br /> Thank you for applying to the job position at Ezaburo.<br /> <br /> I’d like to inform you that we received your application. Our hiring team is currently reviewing all applications and we are planning to schedule interviews in the next two weeks. If you are among qualified candidates, you will receive call from our one of our recruiters to schedule. In any case, we will keep you posted on the status of your application.<br /> <br /> Thank you, again, for taking the time to apply to this role at Ezaburo <br /> <br /> Best regards, `,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});
