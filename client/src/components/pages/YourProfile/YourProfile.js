import React, { useState, useEffect} from "react";

import { useHistory} from "react-router-dom";

import { Form, Row, Col } from "react-bootstrap";

import Container from "../../Container/Container";
import Input from '../../Input/Input'
import Button from '../../Button/Button'

//Redux
import {useSelector} from 'react-redux'

//Services
import UsersServices from "../../../services/UsersServices"
import CategoriesServices from "../../../services/CategoriesServices"

import './YourProfile.css'

const YourProfile = () => {
  
  const [userData, setUserData] = useState()
  
  const [categories, setCategories] = useState([])
  
  const [error, setError] = useState('')
  
  const userId = useSelector((state) => state.user);
  
  useEffect( ()=>{
    
    const fetchCategories = async () => {
      const a = await getCategories();
      setCategories(a);
    };
 
    fetchCategories();
    
    const fetchData = async () => {
      
      
      
      const a = await getUserData(userId);
      const cleanUserData = Object.entries(a).reduce(  (accumulator, [key, value]) => {
        if (key === 'firstName'){
          return {...accumulator, 'first name' : (value === null || value === undefined ? '' : value)}
        }
        if (key === 'lastName'){
          return {...accumulator, 'last name' : (value === null || value === undefined ? '' : value)}
        }
        
        return {...accumulator, [key] : (value === null || value === undefined ? '' : value)}
      }, {}
      )
      setUserData(cleanUserData)
    }
    fetchData();
  },[])
  
  const getUserData = async (payload) => {
    try {
      const response = await UsersServices.getUserData(payload)
      console.log(response.data)
      return response.data
    }
    catch(err){
      setError(err)
    }
  }
  
  const getCategories = async () => {
    try {
      const response = await CategoriesServices.getCategories()
      return response.data
    }
    catch(err){
      console.log(err)
    }
  }
  
  const onChange = (e) => {
    e.persist();
    
    setUserData ({
      ...userData,
      [e.target.name]:e.target.value
    })
  }
  
  const history = useHistory();

  const redirect = () => {
    history.push("/");
  };
  
  const onSubmit = async () => {
    try {
        await UsersServices.updateUserData(userData);
        redirect();
    } catch (err) {
      console.log(err);
      setError( err.response.data.error);
    }
  };
  
  return(
    <div className="YourProfileContainer d-flex">
      <Container
        className="YourProfileTab"
        styleNumber={0}
        title={`Don't miss it, be part of our community!`}
        child={
          <div>
            <div className="YourProfileImgShadow"> </div>
            <div className="YourProfileImg"> 
              <label className="CustomBrowseImgButton">
                <i className="fa fa-plus"></i>
                <input type="file" id="BrowseImg" name="myfile"/>
              </label>
            </div>
            <Form
            className="YourProfileForm"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
            }}>
              {userData && categories && Object.entries(userData).map(([key, value], index) =>{ 
              
              if (key==='category'){ return <Input
                className="mb-3"
                placeholder="Category"
                type="string"
                value ={value = null||undefined ? '' : value}
                name={key}
                idNumber={index}
                required={true}
                onChange={(e) =>onChange(e)}
                labelClassName={'YourProfileInputLabel'}
                label={key}
                key={index}
                select={true}
                options={
                  Array.isArray(categories) ? categories.map(category => {
                    return(<option key={category.id}>
                        {category.category}
                      </option>)}) : <option /*key={category.id}*/>Loading</option>
                  }
              ></Input>
              }
              
              return <Input
                className="YourProfileInput"
                placeholder={`${value}`}
                type="string"
                value={value = null||undefined ? 'ole' : value}
                name={key}
                idNumber={index}
                onChange={(e) => onChange(e)}
                required={true}
                maxLength={25}
                labelClassName={'YourProfileInputLabel'}
                label={key}
                key={index}
                ></Input>
              }
            
              )}
              {error && <div className="text-danger mb-3">{error}</div>}
              <Button
              onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
              }}>
              Submit
            </Button>
            </Form>
          </div>
        }
      ></Container>
    </div>
  )
  
}

export default YourProfile