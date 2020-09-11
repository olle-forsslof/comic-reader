const express = require('express');
require('dotenv').config();
const fs = require('fs')

const app = express();

app.use(express.static(__dirname + '/../build'))

app.get('/online-comics/titles', async (req, res) => {
  const comicFolder = await fs.readdirSync(__dirname + '/../public/comics', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .map(name => {
      return name.replace('_', ' ').replace(name.charAt(0), name.charAt(0).toUpperCase())
    })
  res.send(comicFolder)
})

// gets the pages of the requested comic in an object with the large and small version pages
app.get('/online-comics/:title', async (req, res) => {
  const comic = req.params.title
  let data = await getFileNames()
  res.send(data)

  function getFileNames() {
    return new Promise((resolve, reject) => {
      const path = __dirname + `/../public/comics/${comic}`

      // goes into the title folder which contains 2 folders "large" & "small"
      fs.readdir(path, async (err, folders) => {
        if (err) reject(err);

        let promiseArray = []

        //for each folder, create a new promise that resolves an object containing the names of all the files in that folder.
        //save the promise in the promiseArray and then await all of them to be resolved before resolving the 
        //main Promise.
        folders.forEach(folder => {
          promiseArray.push(
            new Promise((resolve, reject) => {
              fs.readdir(path + '/' + folder + '/', (err, pages) => {
                if (err) reject(err);

                resolve({
                  [folder]: pages //pages = array
                })
              })
            })
          )
        })
        let results = await Promise.all(promiseArray)
        resolve(results)
      })
    })


    // try {
    //     let images = {}
    //     await fs.readdir(__dirname + `/../public/comics/${comic}`, (err, files) => {
    //         if (err) console.log(err);

    //         files.map(file => {
    //             const name = file.toString()
    //             const pair = {name: []}

    //             fs.readdir(__dirname +`/../public/comics/${comic}` + `/${file}`, (err, pages) => {
    //                 pair.name = pages
    //                 images = {...images, ...pair}


    //                 console.log('images object = : ', images); // large & small
    //             } )
    //         })
    // console.log('newArr:', newArr);

    //         res.send(newArr)

    //     // const comicFolder = await fs.readdirSync(__dirname + '/../public/comics', {withFileTypes: true})
    //     // .filter(dirent => dirent.isDirectory())
    //     // .map(dirent => dirent.name)
    //     // .map(name => {
    //     //     console.log(name)
    //     //     return name.replace(' ', '-').toLowerCase()
    //     // })
    //     // .filter(title => title === reqName)
    //     // res.send(comicFolder)
    //     

    // })

  }
})

app.get('/api/test', (req, res) => {
  console.log('test is working');

})
//TODO: make a call that sneds back all the image file names in an array. Needs to take in device width as parameter

const serverPort = process.env.PORT || 8080;

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort} `);
})