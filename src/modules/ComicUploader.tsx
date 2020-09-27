import React from 'react'
import { db } from './../../server/firebase';

interface IComic {
  title: string;
  artist: string;
  largePages: string[];
  smallPages: string[];
  length: number;
}

const sortPages = (pages: string[]) => {
  return pages.sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  })
}

const ComicUploader = () => {
  function handleSubmit(event: any) {
    event.preventDefault()
  }
  return (
    <main>
      <h1>Comic Uploader</h1>

      <form action="submit">
        <label htmlFor="artist"></label>
        <input type="text" id="artist" />

        <label htmlFor="title"></label>
        <input type="text" id="title" />

        <label htmlFor="large-images">Large pages for web</label>
        <input type="file" multiple id="large-images" placeholder="Select images" />

        <label htmlFor="small-images">Small pages for mobile</label>
        <input type="file" multiple id="small-images" placeholder="Select images" />

        <input type="submit" name="Submit" />
      </form>
    </main>
  )
}

export default ComicUploader