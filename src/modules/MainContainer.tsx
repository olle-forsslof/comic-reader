import React from 'react'

type MainProps = {
  xPosition?: number;
  largeImages: { id: number; src: string; size: string; }[];
  smallImages: { id: number; src: string; size: string; }[];
  title: string;
}

const MainContainer = ({ xPosition, largeImages, smallImages, title }: MainProps) => {

  const mainPath = __dirname + `/../../build/comics/on_tour/`

  const makePage = () => {
    return largeImages.map((page, index) => {
      return (
        <div className="card" key={index % 2 === 0 ? page.id + index + page.src : page.id + page.src} >
          <picture>
            <source media="(min-width: 800px)" srcSet={page.src} />
            <source media="(min-width: 200px)" srcSet={smallImages[index].src} />
            <img src={page.src} loading="lazy" alt={`comic page number ${(index + 1).toString()}`} />
          </picture>
        </div>
      )
    })
  }

  return (
    <section className="container" >
      <div className="pages-container" style={{ transform: `translateX(${xPosition}vw)` }} >
        {largeImages ? makePage() : ''}
      </div>
    </section>

  )
}

export default MainContainer

/* -------------------------------------
    CSS
 ------------------------------------- */



