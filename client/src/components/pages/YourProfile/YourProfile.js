import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import { Form, Row, Col } from 'react-bootstrap'

import Container from '../../Container/Container'
import Input from '../../Input/Input'
import Button from '../../Button/Button'

//Redux
import { useSelector } from 'react-redux'

//Services
import UsersServices from '../../../services/UsersServices'
import CategoriesServices from '../../../services/CategoriesServices'

import './YourProfile.css'

const YourProfile = () => {
  const [userData, setUserData] = useState()

  const [categories, setCategories] = useState([])

  const [error, setError] = useState('')

  const userId = useSelector((state) => state.user)

  useEffect(() => {
    const fetchCategories = async () => {
      const a = await getCategories()
      setCategories(a)
    }

    fetchCategories()

    const fetchData = async () => {
      const a = await getUserData(userId)
      const cleanUserData = Object.entries(a).reduce(
        (accumulator, [key, value]) => {
          return {
            ...accumulator,
            [key]: value === null || value === undefined ? '' : value,
          }
        },
        {}
      )
      setUserData(cleanUserData)
    }
    fetchData()
  }, [])

  const getUserData = async (payload) => {
    try {
      const response = await UsersServices.getUserData(payload)
      console.log(response.data)
      return response.data
    } catch (err) {
      setError(err)
    }
  }

  const getCategories = async () => {
    try {
      const response = await CategoriesServices.getCategories()
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  const onChange = (e) => {
    e.persist()
    if (e.target.name !== 'image') {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      })
    } else {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUserData({
            ...userData,
            [e.target.name]: reader.result,
          })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const history = useHistory()

  const redirect = () => {
    history.push('/')
  }

  const onSubmit = async () => {
    try {
      await UsersServices.updateUserData(userData)
      redirect()
    } catch (err) {
      console.log(err.response)
      setError(err.response.data.error)
    }
  }

  return (
    <div className="YourProfileContainer d-flex">
      <Container
        className="YourProfileTab"
        styleNumber={0}
        title={`Keep your informations updated!`}
        child={
          <div>
            <div className="YourProfileImgShadow"> </div>
            <div className="YourProfileImgContainer">
              <div className="YourProfileImg">
                <img
                  id="imagePreview"
                  src={
                    userData &&
                    (userData.image !== '' ||
                      userData.image !== null ||
                      userData.image !== undefined)
                      ? userData.image
                      : 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                  }
                />
              </div>
              <label htmlFor="BrowseImg" className="CustomBrowseImgButton">
                <i className="fa fa-plus"></i>
                <input
                  type="file"
                  name="image"
                  id="BrowseImg"
                  accept="image/*"
                  onChange={(e) => onChange(e)}
                  required={true}
                  key={
                    userData &&
                    Object.entries(userData).map(([key, value], index) => {
                      if (key === 'image') {
                        return index
                      } else {
                        return
                      }
                    })
                  }
                />
              </label>
            </div>

            <Form
              className="YourProfileForm"
              onSubmit={(e) => {
                e.preventDefault()
                onSubmit(e)
              }}
            >
              {userData &&
                categories &&
                Object.entries(userData).map(([key, value], index) => {
                  if (key === 'id') {
                    return
                  }
                  if (key === 'availability') {
                    return (
                      <div key={index} className=" inputBox mb-3">
                        <p className="YourProfileInputLabel radioLabel m-0">
                          {key}
                        </p>
                        <Form.Check
                          inline
                          label="Available"
                          type="radio"
                          id={`inline-${index}-1`}
                        />
                        <Form.Check
                          inline
                          label="Unavailable"
                          type="radio"
                          id={`inline-${index}-2`}
                        />
                      </div>
                    )
                  }
                  if (key === 'category') {
                    return (
                      <Input
                        placeholder="Category"
                        type="string"
                        value={key /*HOW DO I GET DATA FROM OPTIONS?*/}
                        name={key}
                        idNumber={index}
                        required={true}
                        onChange={(e) => onChange(e)}
                        labelClassName={'YourProfileInputLabel'}
                        label={key}
                        key={index}
                        select={true}
                        options={
                          Array.isArray(categories) ? (
                            categories.map((category) => {
                              return (
                                <option key={category.id}>
                                  {category.category}
                                </option>
                              )
                            })
                          ) : (
                            <option /*key={category.id}*/>Loading</option>
                          )
                        }
                      ></Input>
                    )
                  } else {
                    var label = key

                    if (key === 'firstName') {
                      label = 'First Name'
                    }
                    if (key === 'lastName') {
                      label = 'Last Name'
                    }

                    if (key === 'image') {
                      return
                    }

                    return (
                      <Input
                        className="YourProfileInput"
                        placeholder={`${value}`}
                        type="string"
                        value={value}
                        name={key}
                        idNumber={index}
                        onChange={(e) => onChange(e)}
                        required={true}
                        maxLength={25}
                        labelClassName={'YourProfileInputLabel'}
                        label={label}
                        key={index}
                      ></Input>
                    )
                  }
                })}
              {error && <div className="text-danger mb-3">{error}</div>}
              <Button
                onSubmit={(e) => {
                  e.preventDefault()
                  onSubmit(e)
                }}
              >
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
