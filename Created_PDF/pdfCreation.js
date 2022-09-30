const fs = require('fs');
const { image, text, fontSize } = require('pdfkit');
const PDFDocument = require('pdfkit');

function createInvoice(invoice, path) {

    const doc = new PDFDocument({ margin: 50, size: "A4" });

    doc.pipe(fs.createWriteStream(path));

    // doc.font("Times-Roman")
    // .fontSize(10)
    // // .text(`Issued Time: ${invoice.registerTime}`, {align: "center"})
    // // .text(`Issue Date: ${invoice.currentDate}`,{align: "left", continued: true})
    // // .text(`Expiry Date: ${invoice.expiryDate}`,{align: "right"})
    // // .moveDown(4);

    doc
    .font("Times-Roman").fontSize(10)
    .image("./images/MetaMask_Fox.png",70,70,{scale: 0.25}) //scale : 0.44
    .font("Courier-Bold").fontSize(15).fillColor("#484848").text("M E T A M A S K",50,150)
    .font("Times-Roman")
    // .fillColor("blue")
    // .fontSize(20)
    // .text('Cancer Care')
    // .fontSize(10).text("Hospital & Research Center")
    .image('./images/formLogo.png',220,50, {scale: 0.60}) //scale : 0.53
    .fillColor("black")
    .fontSize(12)
    .text('Off Rohi Nala Bypass', 200, 90, { align: 'right' })
    .text('Lahore, Punjab', 200, 110, { align: 'right' })
    .font("Times-Bold").text("(042) 111-224-224", 200, 130, {align: "right"})
    .moveDown();

    doc.fillColor("green")
    .fontSize(25).font("Times-Bold").text("Online Booking",32,190,{underline:true, align: "center"})
    .moveDown()
    .rect(50, 240, 490, 30).fillAndStroke('#C8C8C8',"#606060")
    .fillColor('black').fontSize(20).font("Times-Bold").text("Invoice",{align:"center"})
    // .fillColor("black")
    // .font("Times-Bold").fontSize(20).text("Invoice", 50, 230, {align: "left"})
    // .fontSize(10)
    // .text("__________________________________________________________________________________________________",{align: "justify"})
    .moveDown();

    doc.font("Times-Roman")
    .font("Times-Bold").fontSize(13).text("Name",100,300).font("Times-Roman").fillColor("#787878").text(`${invoice.Name}`,300,300)
    .fillColor("black")
    .font("Times-Bold").fontSize(13).text("CNIC",100,330).font("Times-Roman").fillColor("#787878").text(`${invoice.CNICNumber}`,300,330)
    .fillColor("black")
    .font("Times-Bold").fontSize(13).text("Phone Number",100,360).font("Times-Roman").fillColor("#787878").text(`${invoice.Contact}`,300,360);
    // .moveDown();

    if(!invoice.Appointment.localeCompare("Others")) ///////////////////////////////////////// Other Appointment
    {
        doc.fillColor("black")
        .font("Times-Bold").fontSize(13).text("Appintment Type",100,390).font("Times-Roman").fillColor("red").text(`${invoice.Appointment}`,300,390)
        .font("Times-Roman").fillColor("#787878").text("-----------------------------------------------------------------------------------------",100,415)
        .moveDown()
        .font("Times-BoldItalic").fontSize(11).fillColor("#787878").text("Description", 115, 435)
        .font("Times-BoldItalic").fontSize(10).fillColor("#0000FF").text(`${invoice.Description}`,300,435,{align:"left"})
        .moveDown()
        .font("Times-Roman").fillColor("#787878").text("--------------------------------------------------------------------------------------------------------------------",100,460)
        .moveDown(2)
        // .moveDown()
        .fillColor("black").font("Times-Bold").text("_________________________________________________________________________________________________",50,480,{align:"justify"})
        .fontSize(13).font("Times-Roman")
        .text("Valid From: ",70,500,{continued:true, align:"left"}).font("Times-Bold").text(`${invoice.currentDate}`,90,500)
        .font("Times-Roman")
        .text("Issued Time: ",370,500,{continued: true}).text(`${invoice.registerTime}`,380,500)
        .text("Valid Till: ",70,520,{continued:true, align:"left"}).font("Times-Bold").fillColor("red").text(`${invoice.expiryDate}`,100,520)
        .font("Times-Roman")
        .fillColor("black").text("Expiry Time: ",370,520,{continued: true}).fillColor("red").text("23:59:59",380,520)
        .moveDown()
        .fillColor("black").text("____________________________________________________________________________",50,530)
        .text("Amount ",300,570,{continued: true, align:"left"}).font("Times-Bold").text(`${invoice.Amount}`,350,570)
        .font("Times-Roman")
        .text("VAT / Tax",300,600,{continued: true, align: "left"}).font("Times-Bold").text("None",340,600)
        .font("Times-Roman")
        .text("___________________",300,620)
        .moveDown()
        .font("Times-Roman")
        .text("Total ",300,650,{continued: true,align:"left"}).font("Times-Bold").text(`${invoice.Amount}`,360,650,{underline:true})
        .font("Times-Roman")
        .text("Payment Method",240,680,{continued: true, align: "left"}).font("Times-Bold").fillColor("#787878").text("MetaMask",300,680)
        .font("Times-Roman").fillColor("black")
        .text("Status",300,710,{continued: true, align: "left"}).font("Times-Bold").fillColor("green").text("PAID",360,710)
        .fillColor("black")
        .moveDown(3);
        // .font("Times-Bold").text("This is an electronical invoice and DO NOT require any Signatures",100,745)
        // .text(`____________________________________________________________________________`,50,750)
        // .font("Times-Roman")
        // .text("https://www.cch-rc.com      |       info@cch-rc.com",150,777);
    }
    else  /////////////////////////////////////////////////////////////////////////////////////////////////////////// Except Others Appointment 
    {
        doc.fillColor("black")
        .font("Times-Bold").fontSize(13).text("Appointment Type",100,390).fillColor("red").text(`${invoice.Appointment}`,300,390)
        .font("Times-Roman")
        .fillColor("black").text("____________________________________________________________________________",50,420,{align:"justify"})
        .fontSize(13)
        .text("Valid From: ",70,450,{continued:true, align:"left"}).font("Times-Bold").text(`${invoice.currentDate}`,90,450)
        .font("Times-Roman")
        .text("Issued Time: ",370,450,{continued: true}).text(`${invoice.registerTime}`,380,450)
        .text("Valid Till: ",70,470,{continued:true, align:"left"}).font("Times-Bold").fillColor("red").text(`${invoice.expiryDate}`,100,470)
        .font("Times-Roman")
        .fillColor("black").text("Expiry Time: ",370,470,{continued: true}).fillColor("red").text("23:59:59",380,470)
        .moveDown()
        .fillColor("black").text("____________________________________________________________________________",50,undefined)
        .text("Amount ",300,550,{continued: true, align:"left"}).font("Times-Bold").text(`${invoice.Amount}`,350,550)
        .font("Times-Roman")
        .text("VAT / Tax",300,580,{continued: true, align: "left"}).font("Times-Bold").text("None",340,580)
        .font("Times-Roman")
        .text("___________________",300,600)
        .moveDown()
        .font("Times-Roman")
        .text("Total ",300,630,{continued: true,align:"left"}).font("Times-Bold").text(`${invoice.Amount}`,360,630,{underline:true})
        .font("Times-Roman")
        .text("Payment Method",240,660,{continued: true, align: "left"}).font("Times-Bold").fillColor("#787878").text("MetaMask",300,660)
        .font("Times-Roman").fillColor("black")
        .text("Status",300,690,{continued: true, align: "left"}).font("Times-Bold").fillColor("green").text("PAID",360,690)
        .fillColor("black")
        .moveDown(3);
        // .font("Times-Bold").text("This is an electronical invoice and DO NOT require any Signatures",100,745)
        // .text(`____________________________________________________________________________`,50,750)
        // .font("Times-Roman")
        // .text("https://www.cch-rc.com      |       info@cch-rc.com",150,777)
    }
    // console.log(doc.x,doc.y)
    doc
    .font("Times-Bold").text("This is an electronical invoice and DO NOT require any Signatures",100,745)
    .text(`____________________________________________________________________________`,50,750)
    .font("Times-Roman")
    .text("https://www.cch-rc.com      |       info@cch-rc.com",150,777);
    // .rect(50, 300, 490, 40).fillAndStroke('#C8C8C8',"#606060")
    // .fillColor('black').fontSize(20).font("Times-Bold").text("Invoice",{align:"center"})
    // .text(`Invoice Date: ${new Date()}`, 50, 215)
    // .text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 130)

    // .text(shipping.name, 300, 200)
    // .text(shipping.address, 300, 215)
    // .text(
    //     `${shipping.city}, ${shipping.state}, ${shipping.country}`,
    //     300,
    //     130,
    // )
    // .moveDown();

    // doc.fontSize(
    //     10,
    // ).text(
    //     'Payment is due within 15 days. Thank you for your business.',
    //     50,
    //     780,
    //     { align: 'center', width: 500 },
    // );

    // generateHeader(doc);
    // generateCustomerInformation(doc, invoice);
    // generateInvoiceTable(doc, invoice);
    // generateFooter(doc);

    doc.end();
}

module.exports = { createInvoice };