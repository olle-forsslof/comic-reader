import React from 'react'
import styled from 'styled-components'
// import './MainContainer.scss'

type MainProps = {
    xPosition?: number;
    largeImgs: string[];
    smallImgs: string[];
}

const MainContainer = ({xPosition, largeImgs, smallImgs}: MainProps) => {
    
    const makePage = () => {
        return largeImgs.map( (page, index) => {
            return (
            <div className="card" key={page} >
                <picture>
                    <source media="(min-width: 800px)" srcSet={page} />
                    <source media="(min-width: 200px)" srcSet={smallImgs[index]} />
                    <img src={page} loading="lazy" alt={`comic page number ${index.toString()}`} />
                </picture>
            </div> 
            )
        })
    }

    return (
        <section className="container" >
            <div className="pages-container" style={ {transform: `translateX(${xPosition}vw)`} } >
                { makePage() }
            </div>   
        </section>
        
    )
}

export default MainContainer

/* -------------------------------------
    CSS
 ------------------------------------- */



