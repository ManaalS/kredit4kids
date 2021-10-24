
const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

const accountSid = 'AC1e62b18eae5b053283fadc24432cb329';
const authToken = '8ca64283e72f74ca6c226a32222b9fa6'; 
const client = new twilio(accountSid, authToken);

const app = express();

app.use(cors());
app.get('/', (req, res) => {
    res.send("You're in!")
})
app.get('/send-parent-text', (req, res) => {
    res.send('Sent to parent')

    const { recipient, textmessage } = req.query;

    client.messages.create({
        body: textmessage,
        to: '+1',
        from: '+14086874416' 
    }).then((message) => console.log(message.body));
})

app.listen(4000, () => console.log("Running on Port 4000"))