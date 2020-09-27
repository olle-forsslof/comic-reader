import React, { useState, useEffect } from 'react'
import { useWindowDimensions } from './useWindowDimensions'
import styled from 'styled-components'
import './styles.scss'

import MainContainer from './MainContainer'
import Header from './Header'
import Footer from './Footer'
import ComicUploader from './ComicUploader'

interface Ipages {
  large: { id: number; src: string; size: string; }[]
  small: { id: number; src: string; size: string; }[]
  title: string
}

const ComicReader = () => {
  // Saves the current position of the page container
  const [xPos, setXpos] = useState(0)
  const [pageWidth, setPageWidth] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPageCount, setTotalPageCount] = useState(0)
  const [titleMenu, setTitleMenu] = useState<string[]>([])
  const [selectedComic, setSelectedComic] = useState("") // "Name Name"
  const [comicPages, setComicPages] = useState<Ipages>()

  const { width, height } = useWindowDimensions()

  //fetches comic titles for the select menu
  useEffect(() => {
    const fetchTitles = async () => {
      await fetch('http://localhost:3000/api/titles')
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
    const size = width >= 800 ? 'large' : 'small';
    const fetchPages = async () => {
      await fetch(`http://localhost:3000/api/${formatTitleToLowerCase(selectedComic)}`)
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
      <p>{width} x {height}</p>
      <Header
        counter={{ currentPage, totalPages: totalPageCount }}
        titles={titleMenu}
        handleChange={handleSelectedTitle}
        selectedComic={selectedComic} />

      {comicPages ? 
        <MainContainer
          xPosition={xPos}
          largeImages={comicPages.large}
          smallImages={comicPages.small}
          title={comicPages.title} />
        : <ComicUploader />
        }

      <Footer
        nextPage={nextPage}
        previousPage={previousPage} />
    </section>
  )
}

export default ComicReader
