const express = require('express');
require('dotenv').config();
const fs = require('fs')

const app = express();

app.use(express.static(__dirname + '/../build'))

// Sends back the folder name as title-continuos-title-name. The name sent in should be title of comic with - instead of spaces.
// E.g dark-angels-of-darkness
app.get('/comics/:name', async (req, res) => {
    try {
        const reqName = req.params.name
        
        const comicFolder = await fs.readdirSync(__dirname + '/../public/comics', {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .map(name => {
            return name.replace(' ', '-').toLowerCase()
        })
        .filter(title => title === reqName)
        
    } catch(err) {
        console.error({error: err})
    }
})
//TODO: make a call that sneds back all the image file names in an array. Needs to take in device width as parameter

const serverPort = process.env.PORT || 8080; 

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort} `);
})