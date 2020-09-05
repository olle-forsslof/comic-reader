import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import './styles.scss'

import MainContainer from './MainContainer'
import Header from './Header'
import Footer from './Footer'

const smallPages: string[] = [
    './../comics/testbilder/small/ontour-interior-5.png',
    './../comics/testbilder/small/ontour-interior-6.png',
    './../comics/testbilder/small/ontour-interior-7.png',
    './../comics/testbilder/small/ontour-interior-8.png',
    './../comics/testbilder/small/ontour-interior-9.png',
    './../comics/testbilder/small/ontour-interior-10.png',
    './../comics/testbilder/small/ontour-interior-11.png',
    './../comics/testbilder/small/ontour-interior-12.png',
    ]
    
const largePages: string[] = [
    './../comics/testbilder/large/ontour-interior-5.png',
    './../comics/testbilder/large/ontour-interior-6.png',
    './../comics/testbilder/large/ontour-interior-7.png',
    './../comics/testbilder/large/ontour-interior-8.png',
    './../comics/testbilder/large/ontour-interior-9.png',
    './../comics/testbilder/large/ontour-interior-10.png',
    './../comics/testbilder/large/ontour-interior-11.png',
    './../comics/testbilder/large/ontour-interior-12.png',
    ]

const ComicReader = () => {
    // Saves the current position of the page container
    const [xPos, setXpos] = useState(0)
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPageCount, setTotalPageCount] = useState<Number>()

    useEffect(() => {
        setTotalPageCount( largePages.length )
    }, [])
    
    // Checks the current position and translateX 100vw in either direction
    function nextPage() {
        let currentPosition = xPos
        if (currentPosition != (100 * (largePages.length-1 ))*-1 ) {
            setXpos( currentPosition - 100 )
            pageCounter('+')
        }
        return xPos
    }
    
    function previousPage() {
        let currentPosition = xPos
        if (currentPosition != 0) {
            setXpos (currentPosition + 100 )
            pageCounter('-')
        }
        return xPos
    }

    function pageCounter(operator: string) {
        const newPage = operator === "+" ? currentPage + 1 : currentPage -1;
        setCurrentPage(newPage)
    }

    return (
        <section className="comicReader">
        <Header counter={{currentPage, totalPages: totalPageCount}} />
        <MainContainer 
            xPosition={xPos} 
            largeImgs={largePages} 
            smallImgs={smallPages} />
        <Footer nextPage={nextPage} previousPage={previousPage} />
        </section>
    )
}

export default ComicReader
