const schemas = require("../../mongodb/schemas/schemas");
const pdf = require("html-pdf");
const fs = require("fs");
const ejs = require("ejs");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const path = require('path');
const sendEmail = require("../../middleware/mailingService")

const createInvoice = async (req, res) => {
    try {
        let {
            discount,
            billType,
            client_id,
            services,
            gst,
        } = req.body;



        const client = await schemas.Client.findOne({ client_id: client_id });
        const convertDateFormat = (dateString) => {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString;
            }
            let day = date.getDate().toString().padStart(2, '0');
            let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
            let year = date.getFullYear().toString().slice(-2);

            return `${day}-${month}-${year}`;
        };

        let subtotal = 0;
        const formattedServices = services.map(service => {
            const serviceTotal = service.unitPrice * service.quantity;
            subtotal += serviceTotal;
            return {
                ...service,
                startDate: convertDateFormat(service.startDate),
                endDate: convertDateFormat(service.endDate),
            };
        });
        const discountAmount = (subtotal * discount) / 100;
        const totalBeforeGST = subtotal - discountAmount;
        const gstAmount = (totalBeforeGST * gst) / 100;
        const total = totalBeforeGST + gstAmount;
        console.log(client.brandName)

        const invoice = new schemas.Invoice({
            client_id,
            services: formattedServices,
            gst,
            discount,
            billType,
            subtotal,
            total,
            brandName: client.brandName,
        });


        const invoices = await invoice.save();



        let addressParts = [client.billingAddress, client.state, client.city, client.pincode];
        let validAddressParts = addressParts.filter(part => part && part != null && part.trim() !== '' && part != undefined);
        let addressString = validAddressParts.join(', ');


        const htmlContent = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            padding: 100px 80px;
        }

        b {
            font-weight: 800;
        }

        .top_hr {
            height: 8px;
            width: 100%;
            background: royalblue;
        }

        .header {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
        }

        .right {
            display: flex;
            flex-direction: column;
            align-items: end;
        }

        .right .text {
            font-size: 18px;
            font-weight: 900 !important;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }

        .info {
            margin-top: 20px;
            display: flex;
            gap: 20px;
            justify-content: space-between;
            align-items: end;
        }

        .info .right,
        .info .left {
            width: 50%;
        }

        table {
            margin-top: 50px;
            width: 100%;
        }

        thead th {
            text-align: left;
            color: #fff;
            padding: 5px;
            border: 1px solid #000;
        }

        table td {
            padding: 5px;
            border: 1px solid #000;
        }

        tr td:nth-child(3),
        tr td:nth-child(4),
        tr td:nth-child(5) {
            background: rgb(235, 235, 235);
            text-align: center;
            min-width: 70px;
        }

        .bottom_hr {
            margin-top: 40px;
            height: 3px;
            width: 100%;
            background: royalblue;
        }
    </style>
</head>

<body>
    <div class="font_container">
        <hr class="top_hr" />
        <div class="header">
            <img src="https://raw.githubusercontent.com/yashpapa6969/erp-crm/main/controllers/Invoice/long.png" height="38px" width="317px" alt="">
            <div class="right">
                <div class="text">Combined Proforma Invoice</div>
                <div class="date">
                    ${invoices.date1}
                </div>
            </div>
        </div>
        <div class="info">
            <div class="left">
                <div>
                    <b>Address:</b> 416, Laxmi Tower, Commercial Complex,
                    Azadpur, Delhi - 110033
                </div>
                <div>
                    <b>Call us on:</b> (+91) 9818222713 | 9999197095
                </div>
                <div>
                    <b>Write us at:</b> accounts@adsversify.com
                </div>
                <div>
                    <b>Visit us a:</b> www.adsversify.com
                </div>
            </div>
            <div class="right">
                <div style="text-align: right;">
                    <b>BILL TO</b>
                    <p><b>${client.clientName}</b></p>
                </div>
                <div>
                ${client.brandNameName},                        </div>
                <div style="text-align: right;"> ${addressString}
                
            
                    </div>
            </div>
        </div>

        <table>
            <thead style="background: royalblue;">
                <th>SN.</th>
                <th>Service Description</th>
                <th>Qty.</th>
                <th>Unit Price</th>
                <th>Total</th>
            </thead>
            <tbody>
         
          
            ${services.map((service, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>
                    ${service.serviceDescription}
                    <p>Duration: ${service.duration}</p>
                </td>
                <td>${service.quantity}</td>
                <td>&#x20b9;${service.unitPrice}</td>
                <td><b>&#x20b9;${service.unitPrice * service.quantity}</b></td>
            </tr>
            `).join('')}
            <tr style="background: rgb(191, 191, 191);">
            <td colspan="4" style="text-align: right;">Sub Total</td>
            <td>&#x20b9;${subtotal}</td>
        </tr>
                <tr style="background: rgb(235, 235, 235);">
                    <td colspan="4" style="text-align: right;">GST</td>
                    <td>&#x20b9;${gstAmount}</td>
                </tr>
                <tr style="background: rgb(191, 191, 191);">
                    <td colspan="4" style="text-align: right;">Total</td>
                    <td>&#x20b9;${total}</td>
                </tr>
                <tr style="margin: 50px 0px;">
                <tr>
                    <td style="border: none;"></td>
                </tr>
                <tr>
                    <th colspan="2" rowspan="3" style="text-align: left;">
                        <p style="max-width: 350px; font-weight: 800;">
                            Thankyou for contributing to our business growth.
                            Hope you had a great experience working with us.
                        </p>
                        <br>
                        <p style="font-weight: 900;">
                            ~ Team Adsversify
                        </p>
                    </th>
                    <td colspan="2" style="background: rgb(231, 189, 196); text-align: right;">Less: Amt. Received</td>
                    <td style="background: rgb(231, 189, 196); text-align: center;">&#x20b9;0</td>
                </tr>
                <tr>
                    <td style="border: none;"></td>
                </tr>
                <tr>
                    <td colspan="2" style="background: rgb(191, 191, 191); text-align: right;">Balance Amount</td>
                    <td style="background: rgb(191, 191, 191); text-align: center;">&#x20b9;${total}</td>
                </tr>
            </tbody>
        </table>
        <hr class="bottom_hr" />
    </div>
</body>

</html>
`


        const pdfBuffer = await generatePdf(htmlContent);

        res.set({
            "Content-Disposition": 'attachment; filename="invoice_slip.pdf"',
            "Content-Type": "application/pdf",
        });
        const emailSubject = `Invoice Created`;
        const emailHtmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Task Notification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                }
                .task-detail {
                    margin-top: 20px;
                }
                .task-detail dt {
                    font-weight: bold;
                }
                .task-detail dd {
                    margin: 0 0 10px 0;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Invoice Notification</h1>
                <p>You have a new Invoice update:</p>
                <dl class="task-detail">
               
                </dl>
                <p>Please check your  dashboard for more details.</p>
            </div>
        </body>
        </html>
        
        `;

        await sendEmail(client.email1, emailSubject, "", emailHtmlContent);
        res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Error generating PDF" });
    }
};

// Function to generate PDF from HTML content
function generatePdf(htmlContent) {
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent, {
            childProcessOptions: {
                env: {
                    OPENSSL_CONF: '/dev/null',
                },
            }
        }).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
}

module.exports = createInvoice;


