import React from 'react'
import Nav from 'react-bootstrap/Nav'

const NavItem = (index, category, ...otherProps) => {
  return (
    <Nav.Item>
      <Nav.Link eventKey={`link-${index}`} {...otherProps} >
        {category}
      </Nav.Link>
    </Nav.Item>
  )
}

export default NavItem


//onClick={() => setCategory({category:category})}