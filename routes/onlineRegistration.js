var express = require('express');
var router = express.Router();
const createPDF = require('../Created_PDF/pdfCreation.js');

// const PDFDocument = require('pdfkit');
// const fs = require('fs');

// var doc = new PDFDocument;

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

router.post('/', (req, res) => {

    // console.log(createPDF)                     This shows that what I have imported from the pdfCreation.js file i.e as function
    const data = JSON.stringify(req.body)
    console.log(data)
    createPDF.createInvoice(req.body, "./Created_PDF/OnlineBooking_E_Receipt.pdf");
    res.json({Result : "PDF Made"})
});

router.get('/', (req, res) => {

    res.download('./Created_PDF/OnlineBooking_E_Receipt.pdf')
    console.log("File Sent for Download")
});

module.exports = router;