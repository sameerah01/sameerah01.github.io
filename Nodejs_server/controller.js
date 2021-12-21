const fs  = require('fs');

exports.getData = (req, res) => {
    fs.readFile('./Data.json', 'utf8', (error, fileContents) => {
        if(error) {
            console.log("Error reading file");
        } else {
            const data = JSON.parse(fileContents);
            res.send(data); 
        }
    })
}

    
