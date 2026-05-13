const mongoose=require("mongoose")
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(()=>console.log("Mongodb Connected"))
.catch((err) => console.log(err));

const messageSchema=new mongoose.Schema({
    name:String,
    email:String,
    message:String,
    createdAt:{
        type:Date,
        default:Date.now

    }
});
const Message= mongoose.model("Message",messageSchema);
require("dotenv").config();

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.Email_user,
        pass:process.env.Email_pass
    }
});
transporter.verify(function(error,success){
    if(error){
        console.log("Email setup error:",error);
    } else {
        console.log("Email Server is ready");
    }
});


app.post("/contact", async (req, res) => {

    const { name, email, message } = req.body;

    try {

        const newMessage = new Message({
            name,
            email,
            message
        });

        await newMessage.save();

        console.log("Saved to MongoDB");

        await transporter.sendMail({
            from:`"Portfolio Contact" <${email}>`,
            to:"smarakimohapatra43@gmail.com",
            subject:`New message from ${name}`,
            text:`
    Name: ${name}
    Email: ${email}
    
    Message:
    ${message}`
            });

            console.log("Email Sent");

        res.send("Message saved successfully! + Email Sent Successfully!");

    } catch (error) {
        console.log(error);
        res.send("Error saving message");
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});