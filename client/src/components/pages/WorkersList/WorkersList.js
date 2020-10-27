import React, { useState, useEffect} from "react";
import { Form, InputGroup, Row, Col} from "react-bootstrap";

import WorkerProfile from "../../WorkerProfile/WorkerProfile";
import Input from '../../Input/Input'
import Button from '../../Button/Button'

//Services
import usersServices from "../../../services/UsersServices"
import CategoriesServices from "../../../services/CategoriesServices"

import './WorkersList.css'

//CHANGE THIS WITH THE RESULT OF THE GET REQUEST
import data from '../../../models/models'

const WorkersList = () => {
  
  
  useEffect( ()=>{
    
    const fetchData = async () => {
      const a = await getCategories();
      setCategories(a);
    };
 
    fetchData();
    
  },[])
  
  const [categories, setCategories] = useState([])
  
  const [showCategory, setCategory] = useState()
  
  const [searchPayload, setSearchPayload] = useState({category:'', position:'', location:''})
  
  const {category, position, location} = searchPayload
  
  const [error, setError] = useState()
  
  
  const onSubmit = async () => {
    try {
      const response = await usersServices.getUsers(searchPayload)
      console.log(response)
    }
    catch(err){
      setError(err)
    }
  }
  
  
  
  const onChange = async ( e ) => {
    await(
    setSearchPayload({
      ...searchPayload,
      [e.target.name]: e.target.value
    })
    )
  }
  
  
  
  const filterUsers = (list) => {
    const filteredList = list.filter(
      (worker) => worker.category === showCategory
    );

    return filteredList.map((worker) => (
      <WorkerProfile
        location={worker.address.city}
        name={worker.firstName}
        lastName={worker.lastName}
        jobTitle={worker.jobTitle}
        img={worker.image.img}
        alt={worker.image.alt}
        skills={worker.skills}
        key={worker.id}
      ></WorkerProfile>
    ));
  };
  
  
  
  
  const getCategories = async () => {
    try {
      const response = await CategoriesServices.getCategories()
      return response.data
    }
    catch(err){
      console.log(err)
    }
  }
  
  
  
  
  return (
    <div className='my-background'>
        
      <Row className="mx-0 d-block d-sm-none">
        <Form
          className="mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
          >
          <Row className="my-searchbar mx-0">
            <Col className="p-3">
              <Input
                className="mb-3"
                placeholder="Category"
                value={category}
                name="category"
                idNumber={0}
                required={true}
                spacer={false}
                onChange={(e) =>{ setCategory(e.target.value); onChange(e)}}
                select={true}
                options={
                  Array.isArray(categories) ? categories.map((category) => {
                    return(
                      <option key={category.id}>
                        {category.category}
                      </option>
                      )
                    }) : <option key={category.id}>Loading</option>
                  }
              ></Input>
              <Input
                className="mb-3"
                placeholder="Position"
                type="string"
                value={position}
                name="position"
                idNumber={0}
                spacer={false}
                onChange={(e) => onChange(e)}
              ></Input>
              <Input
                className="mb-3"
                placeholder="Location"
                type="string"
                value={location}
                name="location"
                idNumber={0}
                spacer={false}
                onChange={(e) => onChange(e)}
              ></Input>
              <Button
                type={"submit"}
                style={{ height: "100%" }}
                child={
                  <p className='m-0'>Search <i className="fa fa-search" aria-hidden="true"></i></p>
                }
              ></Button>
            {error && <div className="text-danger mb-3">{error}</div>}
            </Col>
          </Row>
        </Form>
      </Row>
        
        <Row className="mx-3 py-3 d-none d-sm-block">
          <Form
              className="mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
              }}
            >
              <Row className="my-searchbar mx-0">
                <Col>
                  <Input
                    placeholder="Category"
                    value={category}
                    name="category"
                    idNumber={0}
                    required={true}
                    spacer={false}
                    onChange={(e) =>{ setCategory(e.target.value); onChange(e)}}
                    prepend={true}
                    select={true}
                    options={
                      Array.isArray(categories) ? categories.map((category) => {
                        return(
                          <option key={category.id}>
                            {category.category}
                          </option>
                          )
                        }) : <option key={category.id}>Loading</option>
                      
                    }
                  ></Input>
                
                </Col>
                
                <Col>
                  <Input
                    placeholder="Position"
                    type="string"
                    value={position}
                    name="position"
                    idNumber={0}
                    required={true}
                    spacer={false}
                    onChange={(e) => onChange(e)}
                    prepend={true}
                    append={true}
                  ></Input>
                </Col>
                
                <Col>
                  <Input
                    placeholder="Location"
                    type="string"
                    value={location}
                    name="location"
                    idNumber={0}
                    required={true}
                    spacer={false}
                    onChange={(e) => onChange(e)}
                    prepend={true}
                    append={true}
                    child={
                      <div>
                        <InputGroup.Append>
                          <Button
                            type={"submit"}
                            append={true}
                            style={{ height: "100%" }}
                            child={
                              <i className="fa fa-search" aria-hidden="true"></i>
                            }
                          ></Button>
                        </InputGroup.Append>
                      </div>
                    }
                  ></Input>
                </Col>
              </Row>
            </Form>
          </Row>
            
          <div
            className="container-fluid p-3"
          >
            <div className="row">
              <div className="col">
                <p className="h2 text-primary">{showCategory}</p>
              </div>
            </div>

            <div id=" contactList">{showCategory ? 
              filterUsers(data.workers) : 
              <Row><h1 className="mx-auto">Search workers :)</h1></Row>}
              {error && <div className="text-danger mb-3">{error}</div>}
            </div>
          </div>
      </div>
  )
}

export default WorkersList





/*

<Nav variant="tabs" >
              {Array.isArray(categories) ? categories.map((category, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    eventKey={`link-${index}`}
                    onClick={() => setCategory(category.category)}
                  >
                    {category.category}
                  </Nav.Link>
                </Nav.Item>
                )) :
                <h1>'...is Loading'</h1>
              }
            </Nav>




export class WorkersList extends Component {
  state = {
    category: data.categories[0],
  };

  filterUsers = (list) => {
    const filteredList = list.filter(
      (worker) => worker.category === this.state.category
    );

    return filteredList.map((worker) => (
      <WorkerProfile
        location={worker.address.city}
        name={worker.firstName}
        lastName={worker.lastName}
        jobTitle={worker.jobTitle}
        img={worker.image.img}
        alt={worker.image.alt}
        skills={worker.skills}
      ></WorkerProfile>
    ));
  };

  render() {
    return (
      <div className='my-background'>
        
        <Row>
          <Form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
              }}
            >
              <Input
                placeholder="Browse"
                type="string"
                value={value}
                name="Browse"
                idNumber={0}
                required={true}
                spacer={false}
                onChange={(e) => onChange(e)}
                prepend={true}
                child={
                  <div>
                    <InputGroup.Append>
                      <Button
                        type={"submit"}
                        append={true}
                        style={{ height: "100%" }}
                        child={
                          <i className="fa fa-search" aria-hidden="true"></i>
                        }
                      ></Button>
                    </InputGroup.Append>
                    {error && <div className="text-danger mb-3">{error}</div>}
                  </div>
                }
              ></Input>
            </Form>
          </Row>
        
        
          <Nav variant="tabs" defaultActiveKey="link-0">
            {data.categories.map((category, index) => (
              <Nav.Item key={{ index }}>
                <Nav.Link
                  eventKey={`link-${index}`}
                  onClick={() => this.setState({ category: category })}
                >
                  {category}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          
          
          
          
          
          
          <div
            className="container-fluid p-3"
            style={{ backgroundColor: "#fff", width: "100%" }}
          >
            <div className="row">
              <div className="col">
                <p className="h2 text-primary">{this.state.category}</p>
              </div>
            </div>

            <div id=" contactList">{this.filterUsers(data.workers)}</div>
          </div>
      </div>
    );
  }
}

export default WorkersList; */
