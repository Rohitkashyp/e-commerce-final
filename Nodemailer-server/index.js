
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();


const app = express()
// app.use(cors())

const allowedOrigins = ['http://localhost:5173', 'https://e-com-best-deals.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));
app.options('*', cors());


app.use(bodyParser.json())
const PORT = process.env.PORT || 4000;



app.get('/', (req, res) => {
    // res.send("Hello Nodemon New...");
    // console.log("EMAILL:", process.env.EMAIL); 
    

  });
  



// Order checkout

app.post('/checkout',async(req,res)=>{

 const {userDetails,cartItems,totalAmount,shippingCharge,discount,finalprice,OrderDate} = req.body;

//  email send
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USERNAME,
      pass: process.env.BREVO_PASSWORD,
    },
   
})

const orderlist = cartItems.map(item =>{

    return`
      <li style="margin-bottom 15px; padding: 10px; background-color: #f9f9f9; border-radius: 8px; list-style: none;">
      <strong>${item.name}</strong> - 
         <span style="margin-left: 8px; font-weight: bold;">₹Price</span> 
         <span style="color: red; font-size: 16px; margin-left: 4px;">${item.price}</span>
      <br/>
      <img src="${process.env.IMAGE_URL}${item.image}" alt="${item.name}"
      style="width: 60px; height: 60px; border-radius: 6px; margin-top: 6px;" />
    </li>
  `;
    
}).join("")

// user email send user with html content 
const userMailOptions = {
    
    from: process.env.BREVO_FROM_EMAIL,
    to: userDetails.email,
    subject: "Your Order Confirmation - Your Order",
    html:`
    <h2>Order Confirmation</h2>
    <p>Thank you, <strong>${userDetails.name}</strong>,for your order.</p>
    <p><strong>Shipping Address:</strong>${userDetails.address},${userDetails.zipcode}</p>
    <p><strong>Payment Method:</strong>${userDetails.paymentMethod}</p>
    <p><strong>Order Date:</strong> ${OrderDate}</p>
    <h3>Order Summary:</h3>
    <ul>
     ${orderlist}
    </ul>
    <p><strong>Subtotal:</strong> ₹${totalAmount}</p>
    <p><strong>Shipping Charge:</strong> ₹${shippingCharge}</p>
    <p><strong>Discount (10%):</strong> -₹${discount}</p>
    <h3><strong>Final Amount:</strong> ₹${finalprice}</h3>
    <p>Your order will be delivered soon.</p>

    `
};

// Admin email send user with html content 

const adminMailOptions = {
    from: process.env.BREVO_FROM_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "New Order Received",
    html:`
    <h2>New Order Received</h2>
    <p><strong>Name:</strong>${userDetails.name}</p>
    <p><strong>Phone Number:</strong>${userDetails.phone}</p>
    <p><strong>Email:</strong>${userDetails.email}</p>
    <p><strong>Address:</strong>${userDetails.address},${userDetails.zipcode}</p>
    <p><strong>Payment Method:</strong>${userDetails.paymentMethod}</p>
    <p><strong>Order Date:</strong> ${OrderDate}</p>
    <h3>Order Details:</h3>
    <ul>
        ${orderlist}
    </ul>
    <p><strong>Subtotal:</strong> ₹${totalAmount}</p>
    <p><strong>Shipping Charge:</strong> ₹${shippingCharge}</p>
    <p><strong>Discount (10%):</strong> -₹${discount}</p>
    <h3><strong>Final Amount:</strong> ₹${finalprice}</h3>
 
     

    `
    
};




try {
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);
    res.status(200).json({success : true, message: "Order placed and emails sent successfully."});
} catch (error) {
    console.error("Email Error:",error);
    res.status(500).json({success : false, message: "Failed to send emails" , error});
}


})



//  server ping route 
app.get('/health', async (req, res) => {
  try {
    res.status(200).json({ status: 'OK', message: 'Server is working' });
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'Server has issues' });
  }
});





app.listen(PORT, '0.0.0.0', ()=>{
 console.log(`server is running on ${PORT}`)
})




