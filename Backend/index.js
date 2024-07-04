const express = require("express");
const multer = require("multer");
const cors = require("cors");
const docxToPDF = require("docx-pdf");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

const app = express();
const port = 3000;
app.use(cors());

// setting up the file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/convertFile", upload.single("file"), (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }
        // Defining output file path
        let outputPath = path.join(
            __dirname,
            "files",
            `${req.file.originalname}.pdf`
        );
        docxToPDF(req.file.path, outputPath, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Error converting docx to pdf",
                });
            }
            res.download(outputPath, () => {
                console.log("file downloaded");
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.post("/convertImageToPDF", upload.single("file"), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }
        
        // Load a PDFDocument
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        
        // Load the image bytes into the PDFDocument
        const imgBytes = fs.readFileSync(req.file.path);
        const img = await pdfDoc.embedJpg(imgBytes);
        
        // Get the image dimensions
        const { width, height } = img.scale(1);
        
        // Set the dimensions of the PDF page to the dimensions of the image
        page.setSize(width, height);
        page.drawImage(img, {
            x: 0,
            y: 0,
            width,
            height
        });

        // Serialize the PDFDocument to bytes
        const pdfBytes = await pdfDoc.save();

        // Defining output file path
        let outputPath = path.join(
            __dirname,
            "files",
            `${req.file.originalname}.pdf`
        );
        
        // Write the PDF to a file
        fs.writeFileSync(outputPath, pdfBytes);
        
        res.download(outputPath, () => {
            console.log("file downloaded");
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
