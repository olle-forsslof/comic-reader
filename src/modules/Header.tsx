import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

type HeaderProps = {
  counter: {
    currentPage: number,
    totalPages: number | undefined
  },
  titles?: string[] | undefined,
  selectedComic?: string,
  handleChange: (event: any) => void
}

const formatTitle = (title: string) => {
  return title.split('').map((l, i) => {
    if (i === 0 || title[i - 1] === ' ') return l.toUpperCase()
    else return l
  }).join('')
}

const Headers = ({ counter, titles, handleChange, selectedComic }: HeaderProps) => {
  // const [selectedTitle, setSelectedTitle] = useState<string>()

  const options = () => titles && titles.map((title, index) => {
    return (
      <option key={title + index} value={formatTitle(title)}>{title}</option>)
  })

  return (
    <header>
      <nav>
        {/* TO DO: create a custom select component */}
        <div className="custom-select">
          <select
            value={selectedComic}
            onChange={(e) => {
              handleChange(e)
            }} >
            <option value="" disabled hidden>Comics</option>
            {options()}
          </select>
        </div>
        <div className="page-count"> {counter.currentPage} / {counter.totalPages} </div>
      </nav>
    </header>
  )
}

export default Headers