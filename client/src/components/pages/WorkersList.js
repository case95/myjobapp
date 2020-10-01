import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import data from '../../models/models'
import WorkerProfile from '../WorkerProfile/WorkerProfile'

export class WorkersList extends Component {
  
  
  state = {
    category:data.categories[0],
  }
  
  
  filterUsers = (list) => {
    
    const filteredList = list.filter((worker) => worker.category === this.state.category)
    
    return (
      filteredList.map((worker) => 
        (
          <WorkerProfile
          location={worker.address.city}
          name={worker.firstName}
          lastName={worker.lastName}
          jobTitle={worker.jobTitle}
          img= {worker.image.img}
          alt= {worker.image.alt}
          skills= {worker.skills}>
          </WorkerProfile>
          
          
          
          
          
        )
      )
      
    )
  }
  
  render() {
    return (
      <div>
        <div className="mx-auto p-5" style={{backgroundColor:"#ddd"}}>
          <Nav variant="tabs" defaultActiveKey="link-0">
            
            {
              data.categories.map((category, index) => (
                
                <Nav.Item>
                  <Nav.Link eventKey={`link-${index}`} onClick={() => this.setState({category:category})} >{category}</Nav.Link>
                </Nav.Item>
              ))
            }
          
          </Nav>
          <div className="container-fluid p-3" style={{backgroundColor:"#fff", width:"100%"}}>
            <div className="row">
              <div className="col">
                <p className='h2 text-primary'>{this.state.category}</p>
              </div>
            </div>
            
            <div id=" contactList" >
              {this.filterUsers(data.workers)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WorkersList
