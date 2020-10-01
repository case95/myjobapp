import React from 'react'
import Nav from 'react-bootstrap/Nav'

const CategoriesTabs = () => {
  return (
    <div>
      
      <Nav variant="tabs" defaultActiveKey="/home">
      
        <div id="carouselExampleControls" className="carousel" data-ride="carousel">
          <div className="carousel-inner">
            
            <div className="carousel-item active">
              <Nav.Item>
                <Nav.Link e>ITEM 1</Nav.Link>
              </Nav.Item>
            </div>
            
            <div className="carousel-item">
              <Nav.Item>
                <Nav.Link e>ITEM 2</Nav.Link>
              </Nav.Item>
            </div>
            
            <div className="carousel-item">
              <Nav.Item>
                <Nav.Link e>ITEM 3</Nav.Link>
              </Nav.Item>
            </div>
            
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
