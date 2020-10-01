import React, {useState, useEffect}from 'react'
import Nav from 'react-bootstrap/Nav'
import data from '../models/models'
import NavItem from './NavItem'

const CategoriesTabs = () => {
  
  
  const [category, setCategory] = useState(data.categories[0]);
  

    useEffect(() => {
      data.categories.reduce(
        function(accumulator, currentValue, currentIndex, array) {
          if (currentIndex % 4 === 0){
            console.log(array.slice(currentIndex, currentIndex + 4))
            const myTab = document.createElement('div')
            myTab.className = 'carousel-item'
            myTab.id=('item' + currentIndex/4)
            
            
              
              array.slice(currentIndex, currentIndex + 4).map((category, index) => {
                
                const navItem =(`
                  <NavItem index = ${index} category = $Z{category}>
                    
                  </NavItem>`)
                console.log(navItem)
                myTab.innerHTML = navItem;
                document.getElementById("myNavBar").appendChild(myTab)
              }
                
              )
          }
          
        }, []
      )
    }, [])
  
  
  return (
    <div className="mx-auto p-5" style={{backgroundColor:"#ddd"}}>
      
      <Nav variant="tabs" defaultActiveKey="/home">
      
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          
          <div className="carousel-inner" id="myNavBar">
            
          </div>
          
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon bg-primary" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon bg-primary" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        
      </Nav>
        
    </div>
  )
}

export default CategoriesTabs
