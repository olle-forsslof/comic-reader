import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import './styles.scss'

import MainContainer from './MainContainer'
import Header from './Header'
import Footer from './Footer'

// const smallPages = [
//     './../comics/testbilder/small/ontour-interior-5.png',
//     './../comics/testbilder/small/ontour-interior-6.png',
//     './../comics/testbilder/small/ontour-interior-7.png',
//     './../comics/testbilder/small/ontour-interior-8.png',
//     './../comics/testbilder/small/ontour-interior-9.png',
//     './../comics/testbilder/small/ontour-interior-10.png',
//     './../comics/testbilder/small/ontour-interior-11.png',
//     './../comics/testbilder/small/ontour-interior-12.png',
//     ]

// const largePages = [
//     './../comics/testbilder/large/ontour-interior-5.png',
//     './../comics/testbilder/large/ontour-interior-6.png',
//     './../comics/testbilder/large/ontour-interior-7.png',
//     './../comics/testbilder/large/ontour-interior-8.png',
//     './../comics/testbilder/large/ontour-interior-9.png',
//     './../comics/testbilder/large/ontour-interior-10.png',
//     './../comics/testbilder/large/ontour-interior-11.png',
//     './../comics/testbilder/large/ontour-interior-12.png',
//     ]

// export interface Ipages {
//   pages: [
//     { large: string[] },
//     { small: string[] }
//   ],
//   title: string
// }

interface Ipages {
  large: { id: number; src: string; size: string; }[]
  small: { id: number; src: string; size: string; }[]
  title: string
}

const ComicReader = () => {
  // Saves the current position of the page container
  const [xPos, setXpos] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPageCount, setTotalPageCount] = useState(0)
  const [titleMenu, setTitleMenu] = useState<string[]>([])
  const [selectedComic, setSelectedComic] = useState("") // "Name Name"
  const [comicPages, setComicPages] = useState<Ipages>()

  //fetches comic titles for the select menu
  useEffect(() => {
    const fetchTitles = async () => {
      await fetch('http://localhost:3000/online-comics/titles')
        .then(response => response.json())
        .then(response => {
          setTitleMenu(response)
        })
    }
    fetchTitles()
  }, [])

  useEffect(() => {
    let comicLength = comicPages ? comicPages.large.length : 0
    setTotalPageCount(comicLength)
  }, [comicPages])

  // fetch the comic pages of selected title -> store images names in state
  useEffect(() => {
    const fetchPages = async () => {
      await fetch(`http://localhost:3000/online-comics/${formatTitleToLowerCase(selectedComic)}`)
        .then(response => response.json())
        .then(response => {
          const large = extractPages(response[0].large, 'large')
          const small = extractPages(response[1].small, 'small')

          setComicPages({
            large: large,
            small: small,
            title: selectedComic
          })
        })
    }
    fetchPages()
  }, [selectedComic])

  function extractPages(array: string[], size: string) {
    const pages = array.map((page, index) => {
      return { id: index, src: `./../comics/${formatTitleToLowerCase(selectedComic)}/${size}/${page}`, size: size }
    })

    // sorts the objects based on the page numbers within the string!
    return pages.sort((a, b) => {
      return a.src.localeCompare(b.src, undefined, {
        numeric: true,
        sensitivity: 'base'
      })
    })
  }

  function formatTitleToLowerCase(string: string) {
    return string.toLowerCase().replace(' ', '_')
  };

  // Checks the current position and translateX 100vw in either direction
  function nextPage() {
    let currentPosition = xPos
    if (currentPosition != (100 * (totalPageCount - 1)) * -1) {
      setXpos(currentPosition - 100)
      pageCounter('+')
    }
    return xPos
  }

  function previousPage() {
    let currentPosition = xPos
    if (currentPosition != 0) {
      setXpos(currentPosition + 100)
      pageCounter('-')
    }
    return xPos
  }

  function pageCounter(operator: string) {
    const newPage = operator === "+" ? currentPage + 1 : currentPage - 1;
    setCurrentPage(newPage)
  }

  function handleSelectedTitle(event: any) {
    event.preventDefault();
    setSelectedComic(event.target.value) // title_title
  }

  return (
    <section className="comicReader">
      <Header
        counter={{ currentPage, totalPages: totalPageCount }}
        titles={titleMenu}
        handleChange={handleSelectedTitle}
        selectedComic={selectedComic} />

      {comicPages &&
        <MainContainer
          xPosition={xPos}
          largeImages={comicPages.large}
          smallImages={comicPages.small}
          title={comicPages.title} />
      }

      <Footer
        nextPage={nextPage}
        previousPage={previousPage} />
    </section>
  )
}

export default ComicReader
