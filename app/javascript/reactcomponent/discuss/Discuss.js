import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'

export default function Discuss() {
  const [list, setList] = useState([])
  const [initPage, setInitPage] = useState(1)
  const listAmount = initPage * 10
  const currentListAmount = list.slice(listAmount - 10, listAmount)
  const currentList = currentListAmount.map((list) => {
    return <SearchDisplayList key={ list.id } id={ list.id } title={ list.title } content={ list.content } /> 
  })

  useEffect(() => {
    fetch('/jsons/data')
    .then(res => res.json())
    .then(post => setList(post))    
  }, [])

  function CurrentPageNumber() {
    const nextPage = number => listAmount < list.length && setInitPage(initPage + number)
    const previousPage = () => initPage > 1 && setInitPage(initPage - 1)
    const jumpPage = number => initPage > 0 && setInitPage(initPage - number)
    const searchPage = (event) => {
      if(event.key == 'Enter'){
        if(Number(event.target.value) && Number(event.target.value) * 10 <= list.length + 10){
          setTimeout(() => { setInitPage(Number(event.target.value)) }, 300)
        }
      }
    }

    return(
      <div className="pagination">
        <button onClick={ previousPage }>上一頁</button>
        { initPage > 2 ? <button onClick={ jumpPage.bind(this, 2) }>{ initPage - 2 }</button> : null }
        { initPage > 1 ? <button onClick={ jumpPage.bind(this, 1) }>{ initPage - 1 } </button> : null }
        <button>{ initPage}</button>
        { initPage * 10 < list.length ? <button onClick={ nextPage.bind(this, 1) }>{ initPage + 1 }</button> : null }
        { initPage * 10 + 10 < list.length ? <button onClick={ nextPage.bind(this, 2) }>{ initPage + 2 }</button> : null }
        <button onClick={ nextPage.bind(this, 1) }>下一頁</button>
        <input type="text" onKeyDown={ searchPage } placeholder={ "目前在第"+initPage+"頁" } />
        <button onClick={ () => setInitPage(1) }>回首頁</button>
      </div>
    )
  }
  
  const searchList = (event) => {
    const searchValue = []
    const searchInput = document.getElementById('searchListInput')
    if(event.key == 'Enter'){
      fetch('/jsons/data')
      .then(res => res.json())
      .then((post) => {
          list.splice(0, list.length)
          post.map(el => list.push(el))
      })

      setTimeout(() => {
        searchValue.push(event.target.value) 
        searchInput.value = ''
      }, 0)

      setTimeout(() => { setList([]) }, 300) 
      setTimeout(() => {       
        const currentSearch = list.filter(hash => hash.title.includes(searchValue.join())) 
        setList(currentSearch)
        setInitPage(1)
      }, 700)
    }      
  }

  const resetDiscuss = () => {  
    setInitPage(1)
    setTimeout(() => {
      fetch('/jsons/data')
      .then(res => res.json())
      .then(post => setList(post)) 
    }, 400)       
  }
  
  return(
  <div>
      <div className="discuss">
        <a href="#">All Interview Quesions</a>
        <a href="#">System Design</a>
        <a href="#">Operating System</a>
        <a href="#">Object-Oriented Design</a>
      </div>
      <div className="discuss">
          <div>
            <a href="#">Hot</a>
            <a href="#">Newest to Oidest</a>
            <a href="#">Most Votes</a>
            <a href="#">文章數量 { list.length }</a>
          </div>
          <div>
            <input type="text" placeholder="Search topics or comments" id="searchListInput" onKeyPress={ searchList } />
            <button onClick={ resetDiscuss }>Reset</button>
          </div>
      </div>
        { currentList }
      <CurrentPageNumber />
  </div>
  )
}

function SearchDisplayList(props) {
  const { title, content, id } = props
  return(
    <div className="discuss">
      <img src="https://picsum.photos/50/50?grayscale" alt="jpg" />
      <div>      
          <h2><a href={ "posts/"+id }>{ title }</a></h2>
          <h3>{ content }</h3>
      </div>
    </div>
  )
}