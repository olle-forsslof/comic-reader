import React from 'react'
import styled from 'styled-components'

type HeaderProps = {
    counter: {
        currentPage: Number,
        totalPages: Number | undefined
    }
}

const Headers = ({ counter }: HeaderProps) => {
    return (
        <header>
            <nav>
                <div className="custom-select">
                    <select defaultValue="">
                        <option value="" disabled hidden>Comics</option>
                        <option value="1" >On Tour - Moa Romanova</option>
                        <option value="2" >Long ass title bitch - Me</option>
                    </select>
                </div>
                <div className="page-count"> {counter.currentPage} / {counter.totalPages} </div>
            </nav>
        </header>
    )
}

export default Headers