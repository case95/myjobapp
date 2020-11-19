import React, { useState, useEffect } from 'react'
import { Form, InputGroup, Row, Col } from 'react-bootstrap'

import WorkerProfile from '../../WorkerProfile/WorkerProfile'
import Input from '../../Input/Input'
import Button from '../../Button/Button'

//Services
import usersServices from '../../../services/UsersServices'
import CategoriesServices from '../../../services/CategoriesServices'

import './WorkersList.css'

const WorkersList = (state) => {
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories()
      setCategories([
        { id: '', category: 'All Categories' },
        ...fetchedCategories,
      ])
      if (state.history.location.usersList) {
        const a = state.history.location.usersList
        console.log(a)
        setSearchResult([...a])
      }
    }

    fetchData()
  }, [])

  const [categories, setCategories] = useState([])

  const [showCategory, setCategory] = useState()

  const [searchPayload, setSearchPayload] = useState({
    category: '',
    job: '',
    location: '',
  })

  const { category, job, location } = searchPayload

  const [error, setError] = useState()

  const onSubmit = async () => {
    try {
      const response = await usersServices.getUsers(searchPayload)
      console.log(response.data)
      if (!response.data.error) {
        setError()
        setSearchResult(response.data)
      } else {
        setCategory()
        setSearchResult()
        setError(response.data.error)
      }
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  const onChange = (e) => {
    setSearchPayload({
      ...searchPayload,
      [e.target.name]: e.target.value,
    })
    console.log(searchPayload)
  }

  const getCategories = async () => {
    try {
      const response = await CategoriesServices.getCategories()
      return response.data
    } catch (err) {
      console.log(err)
      setError('No results were found')
    }
  }

  return (
    <div className="my-background">
      <Row className="mx-0 d-block d-sm-none my-searchbar-container">
        <Form
          className="mx-auto"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(e)
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
                spacer={false}
                onChange={onChange}
                select={true}
                options={
                  Array.isArray(categories) ? (
                    categories.map((category) => {
                      if (category.category === 'All Categories') {
                        return (
                          <option key={category.id} value={2}>
                            {category.category}
                          </option>
                        )
                      } else {
                        return (
                          <option key={category.id}>{category.category}</option>
                        )
                      }
                    })
                  ) : (
                    <option key={category.id}>Loading</option>
                  )
                }
              ></Input>
              <Input
                className="mb-3"
                placeholder="Job"
                type="string"
                value={job}
                name="job"
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
                type={'submit'}
                style={{ height: '100%' }}
                child={
                  <p className="m-0">
                    Search <i className="fa fa-search" aria-hidden="true"></i>
                  </p>
                }
              ></Button>
            </Col>
          </Row>
        </Form>
      </Row>

      <Row className="mx-3 py-3 d-none d-sm-block my-searchbar-container">
        <Form
          className="mx-auto"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(e)
          }}
        >
          <Row className="my-searchbar mx-0">
            <Col>
              <Input
                placeholder="Category"
                value={category}
                name="category"
                idNumber={0}
                spacer={false}
                onChange={(e) => {
                  setCategory(e.target.value)
                  onChange(e)
                }}
                prepend={true}
                select={true}
                options={
                  Array.isArray(categories) ? (
                    categories.map((category) => {
                      if (category.category === 'All Categories') {
                        return (
                          <option key={category.id} value={''}>
                            {category.category}
                          </option>
                        )
                      } else {
                        return (
                          <option key={category.id}>{category.category}</option>
                        )
                      }
                    })
                  ) : (
                    <option key={category.id}>Loading</option>
                  )
                }
              ></Input>
            </Col>

            <Col>
              <Input
                placeholder="Job"
                type="string"
                value={job}
                name="job"
                idNumber={0}
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
                spacer={false}
                onChange={(e) => onChange(e)}
                prepend={true}
                append={true}
                child={
                  <div>
                    <InputGroup.Append>
                      <Button
                        type={'submit'}
                        append={true}
                        style={{ height: '100%' }}
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

      <div className="container-fluid p-3">
        <div className="row">
          <div className="col">
            <p className="h2 text-primary">{showCategory}</p>
          </div>
        </div>

        <div id=" contactList">
          {Array.isArray(searchResult) && searchResult.length > 0 ? (
            searchResult.map((worker) => (
              <WorkerProfile
                location={worker.location}
                name={worker.firstName}
                lastName={worker.lastName}
                job={worker.job}
                img={worker.image}
                skills={worker.skills}
                key={worker.id}
                id={worker.id}
                bio={worker.bio}
                availability={worker.availability}
                phone={worker.phone}
                website={worker.website}
              ></WorkerProfile>
            ))
          ) : (
            <Row>
              {error ? (
                <div className="h3 text-danger mb-3 mx-auto">{error}</div>
              ) : (
                <div className="h2 mx-auto">Search workers :)</div>
              )}
            </Row>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkersList
