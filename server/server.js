import express from "express";
import { config } from "dotenv";
import { connection } from "./database/db.js";
import DefaultData from "./default.js";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import crypto from 'crypto';
import { v4 as uuidv4 } from "uuid";


const app = express(); 

config({ path: "./config/config.env" });

const PORT = process.env.PORT || 8000;

const URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

///PHONEPE
app.use(express.json());

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", Router);

connection(URL);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


/// PHONEPE GATEWAY ////


const MERCHANT_KEY = "96434309-7796-489d-8924-ab56988a6076";
const MERCHANT_ID = "PGTESTPAYUAT86";

// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status"

const MERCHANT_BASE_URL =
  "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const MERCHANT_STATUS_URL =
  "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status";

// const redirectUrl = "http://localhost:8000/status";
const redirectUrl = "status";

const successUrl = "http://localhost:3000";
const failureUrl = "http://localhost:3000";

app.post("/create-order", async (req, res) => {
  const { name, mobileNumber, amount } = req.body;
  const orderId = uuidv4();

  //payment
  const paymentPayload = {
    merchantId: MERCHANT_ID,
    merchantUserId: name,
    mobileNumber: mobileNumber,
    amount: amount * 100,
    merchantTransactionId: orderId,
    redirectUrl: `${redirectUrl}/?id=${orderId}`,
    redirectMode: "POST",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const payload = Buffer.from(JSON.stringify(paymentPayload)).toString(
    "base64"
  );
  const keyIndex = 1;
  const string = payload + "/pg/v1/pay" + MERCHANT_KEY;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  const option = {
    method: "POST",
    url: MERCHANT_BASE_URL,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: payload,
    },
  };
  try {
    const response = await axios.request(option);
    console.log(response.data.data.instrumentResponse.redirectInfo.url);
    res
      .status(200)
      .json({
        msg: "OK",
        url: response.data.data.instrumentResponse.redirectInfo.url,
      });
  } catch (error) {
    console.log("error in payment", error);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
});

app.post("/status", async (req, res) => {
  const merchantTransactionId = req.query.id;

  const keyIndex = 1;
  const string =
    `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  const option = {
    method: "GET",
    url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": MERCHANT_ID,
    },
  };

  axios.request(option).then((response) => {
    if (response.data.success === true) {
      return res.redirect(successUrl);
    } else {
      return res.redirect(failureUrl);
    }
  });
});






app.listen(PORT, () => console.log(`Server is listening ${PORT} 🤣🤣🤣!`));

DefaultData();




// export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
// export let paytmParams = {};

// paytmParams["MID"] = process.env.PAYTM_MID;
// paytmParams["WEBSITE"] = process.env.PAYTM_WEBSITE;
// paytmParams["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
// paytmParams["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID;
// paytmParams["ORDER_ID"] = uuid();
// paytmParams["CUST_ID"] = process.env.PAYTM_CUST_ID;
// paytmParams["TXT_AMOUNT"] = "100";
// // paytmParams["CALLBACK_URL"] = "http://localhost:8000/callback";
// paytmParams["CALLBACK_URL"] = "callback";
// paytmParams["EMAIL"] = "nishadgaurav2017@gmail.com";
// paytmParams["MOBILE_NO"] = "1234567890";
