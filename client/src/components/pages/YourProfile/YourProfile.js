import React, { useState, useEffect } from 'react'

import { Form } from 'react-bootstrap'

import Container from '../../Container/Container'
import Input from '../../Input/Input'
import Button from '../../Button/Button'

import { useHistory } from 'react-router-dom'

import sessionStorage from '../../../store/sessionStorage'
import { SET_USER } from '../../../store/actions'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Services
import UsersServices from '../../../services/UsersServices'
import CategoriesServices from '../../../services/CategoriesServices'

import './YourProfile.css'

const YourProfile = () => {
  const dispatch = useDispatch()
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
      const fetchedData = await getUserData(userId)
      if (typeof fetchedData === 'object' && fetchedData !== null) {
        const cleanUserData = Object.entries(fetchedData).reduce(
          (accumulator, [key, value]) => {
            if (key === 'skills') {
              return {
                ...accumulator,
                [key]:
                  value === null || value === undefined || ''
                    ? ['', '', '', '', '']
                    : value.split(','),
              }
            }
            return {
              ...accumulator,
              [key]: value === null || value === undefined ? '' : value,
            }
          },
          {}
        )
        setUserData(cleanUserData)
      }
    }
    fetchData()
  }, [])

  const getUserData = async (payload) => {
    try {
      const response = await UsersServices.getUserData(payload)
      return response.data
    } catch (err) {
      console.log(err)
      setError('There was a problem retrieving your informations')
    }
  }

  const getCategories = async () => {
    try {
      const response = await CategoriesServices.getCategories()
      return response.data
    } catch (err) {
      console.log('There was a problem with the server')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === ',') {
      e.preventDefault()
    }
  }

  const onChange = (e, index) => {
    e.persist()
    if (e.target.name === 'image') {
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
      return
    }
    if (e.target.name === 'availability') {
      setUserData({
        ...userData,
        [e.target.name]: !userData[e.target.name],
      })
      return
    }
    if (e.target.name === 'skill') {
      if (e.target.value.includes(',')) {
        e.target.value = e.target.value.replace(',', '')
      }

      const newArray = userData.skills
      newArray[index] = e.target.value

      setUserData({
        ...userData,
        skills: newArray,
      })
      return
    }

    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
    return
  }

  const redirect = useHistory()

  const onSubmit = async () => {
    const skillsString = userData.skills.join()
    const cleanUserData = {
      ...userData,
      skills: skillsString,
    }
    try {
      await UsersServices.updateUserData(cleanUserData)
      redirect.push('/')
    } catch (err) {
      console.log(err.response)
      setError(
        'There was a problem updating your informations. Your image might be too heavy.'
      )
    }
  }

  const onDelete = async () => {
    console.log(userData.id)
    try {
      await UsersServices.deleteUser(userData.id)
      sessionStorage.remove('jwt')
      dispatch({ type: SET_USER, payload: null })
      redirect.push('/')
    } catch (err) {
      console.log(err)
      setError('There was a problem deleting your profile.')
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
                  alt="profile avatar"
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
                  if (key === 'id' || key === 'image') {
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
                          label={
                            userData && userData.availability
                              ? 'Available'
                              : 'Unavailable'
                          }
                          type="switch"
                          id={`switch`}
                          name="availability"
                          checked={userData && userData.availability}
                          onChange={(e) => {
                            onChange(e)
                          }}
                        />
                      </div>
                    )
                  }
                  if (key === 'category') {
                    return (
                      <Input
                        placeholder="Category"
                        type="string"
                        value={value}
                        name={key}
                        required={true}
                        onChange={(e) => {
                          onChange(e)
                        }}
                        labelClassName={'YourProfileInputLabel'}
                        label={key}
                        key={`skill${index}`}
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
                  }
                  if (key === 'website') {
                    return (
                      <Input
                        className="YourProfileInput"
                        placeholder={`${value}`}
                        type="string"
                        value={value}
                        name={key}
                        idNumber={index}
                        onChange={(e) => onChange(e)}
                        required={false}
                        maxLength={25}
                        labelClassName={'YourProfileInputLabel'}
                        label={key}
                        key={index}
                      ></Input>
                    )
                  }
                  if (key === 'skills') {
                    return (
                      <div style={{ display: 'flex' }}>
                        <p className="YourProfileInputLabel skillsLabel m-0 ">
                          Skills
                        </p>
                        <div
                          className="d-flex skillsContainer"
                          key="skill-list"
                        >
                          {userData &&
                            value.map((val, index) => {
                              return (
                                <Input
                                  id={`skill-${index + 1}`}
                                  className="YourProfileInput"
                                  placeholder={`${val}`}
                                  type="string"
                                  value={val}
                                  name="skill"
                                  onChange={
                                    ((e) => handleKeyDown(e),
                                    (e) => onChange(e, index))
                                  }
                                  required={false}
                                  maxLength={12}
                                  labelClassName={'YourProfileInputLabel'}
                                  key={index}
                                />
                              )
                            })}
                        </div>
                      </div>
                    )
                  } else {
                    var label = key

                    if (key === 'firstName') {
                      label = 'First Name'
                    }
                    if (key === 'lastName') {
                      label = 'Last Name'
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
              <Button type="submit">Submit</Button>
              <Button
                type="button"
                onClick={() => {
                  onDelete()
                }}
                child={'Delete Profile'}
              ></Button>
            </Form>
          </div>
        }
      ></Container>
    </div>
  )
}

export default YourProfile
