const express = require('express');
require('dotenv').config();
const fs = require('fs')

const app = express();

app.use(express.static(__dirname + '/../build'))

// Sends back the folder name as title-continuos-title-name. The name sent in should be title of comic with - instead of spaces.
// E.g dark-angels-of-darkness
app.get('/comics/:title', async (req, res) => {
    
    const comic = req.params.title
    console.log(comic);
    
    // try {
        
    //     // const comicFolder = await fs.readdirSync(__dirname + '/../public/comics', {withFileTypes: true})
    //     // .filter(dirent => dirent.isDirectory())
    //     // .map(dirent => dirent.name)
    //     // .map(name => {
    //     //     console.log(name)
    //     //     return name.replace(' ', '-').toLowerCase()
    //     // })
    //     // .filter(title => title === reqName)
    //     // res.send(comicFolder)
    //     await fs.readdir(__dirname + `/../public/comics/${reqName}`, (err, files) => {
    //         if (err) console.log(err);
    //         let newArr = files.forEach(file => {
    //             console.log('files: ', file);
    //             return file
    //         })
    //         console.log('newArr:', newArr);
            
    //         res.send(newArr)
            
    //     })

    // } catch(err) {
    //     console.error({error: err})
    // }
})

app.get('/api/test', (req, res) => {
    console.log('test is working');
    
})
//TODO: make a call that sneds back all the image file names in an array. Needs to take in device width as parameter

const serverPort = process.env.PORT || 8080; 

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort} `);
})