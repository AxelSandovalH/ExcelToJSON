let express = require('express');
let multer = require('multer');
let xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const upload = multer({
    dest: "uploads/"
});

let app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/exceltojson', upload.single('file'), (req, res) => {
    console.log(req.file.path);
    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheetNames = workbook.SheetNames;

        const allData = sheetNames.reduce((acc, sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(worksheet);

            // Adding 'url_imagen' field to each item in jsonData
            const jsonDataWithImage = jsonData.map(item => ({
                ...item,
                url_imagen: "" // Placeholder for image URL
            }));

            acc[sheetName] = jsonDataWithImage;
            return acc;
        }, {});

        const jsonContent = JSON.stringify(allData, null, 2);
        const outputPath = path.join(__dirname, "uploads", "output.json");

        fs.writeFileSync(outputPath, jsonContent, "utf-8");

        // Download the file
        res.download(outputPath, "output.json", (err) => {
            if (err) {
                console.log(err);
            } else {
                fs.unlinkSync(req.file.path);
                fs.unlinkSync(outputPath);
            }
        });

    } catch (error) {
        console.log(error);
    }
});

app.listen(5000, () => {
    console.log("App is listening at port 5000");
});
