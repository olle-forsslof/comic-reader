// const {db, storageRef} = require('./firebase');
import {db, storageRef} from './firebase'
const express = require('express');
require('dotenv').config();
const fs = require('fs');
const app = express();

app.use(express.static(__dirname + '/../build'))
// app.use(fileUpload())
// app.use(express.json());

app.get('/api/titles', async (req, res) => {
  const comicFolder = await fs.readdirSync(__dirname + '/../public/comics', {withFileTypes: true}).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name).map(name => {
    return name.replace('_', ' ').replace(name.charAt(0), name.charAt(0).toUpperCase())
  })
  res.send(comicFolder)
})

app.get('/api/:title/:size/:page/', async (req, res) => {
  const title = req.params.title
  const size = req.params.size
  const page = req.params.page

  // const storageRef = storage.ref(`comics/${title}/${size}/${page}`)
})

// gets the pages of the requested comic in an object with the large and small version pages
app.get('/api/:title', async (req, res) => {
  const comic = req.params.title
  let data = await getFileNames()
  res.send(data)

  function getFileNames() {
    return new Promise((resolve, reject) => {
      const url = __dirname + `/../public/comics/${comic}`

      // goes into the title folder which contains 2 folders "large" & "small"
      fs.readdir(url, async (err, folders) => {
        if (err) 
          reject(err);
        


        let promiseArray = []

        // for each folder, create a new promise that resolves an object containing the names of all the files in that folder.
        // save the promise in the promiseArray and then await all of them to be resolved before resolving the
        // main Promise.
        folders.forEach(folder => {
          promiseArray.push(new Promise((resolve, reject) => {
            fs.readdir(url + '/' + folder + '/', (err, pages) => {
              if (err) 
                reject(err);
              


              resolve({
                [folder]: pages // pages = array
              })
            })
          }))
        })
        let results = await Promise.all(promiseArray)
        resolve(results)
      })
    })
  }
})

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/../build/index.html')
})

// app.post('/api/addComic', async (req, res) => {
// const title = req.body.title;
// const artist = req.body.artist;
// const webPages = null;


// db.collection("comics").doc(`${title}`).set({
//     title: title,
//     artist: artist,
//     webPages: [],
//     mobilePages: [],
//     length,
// })
//     .then(function (docRef) {
//     })
//     .catch(function (error) {
//       console.error("Error adding document: ", error);
//     });
// })

const serverPort = process.env.PORT || 8080;

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort} `);
})

