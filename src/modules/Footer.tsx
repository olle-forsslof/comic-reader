import React from 'react'
import styled from 'styled-components'

type FooterProps = {
    nextPage: () => number;
    previousPage: () => number;
}

const Footer = ( {nextPage, previousPage}: FooterProps ) => {
    return (
        <footer>
            <div className="button-container">
                <button className="previous"
                onClick={() => previousPage()}>Previous page</button>
                <button className="next"
                onClick={() => nextPage()} > Next page </button>
            </div>
        </footer>
    )
}

export default Footer
