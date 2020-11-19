import React from 'react'

//import custom components
import Container from '../Container/Container'

import './WorkerProfile.css'

const WorkerProfile = ({
  location,
  name,
  lastName,
  job,
  img,
  skills,
  id,
  bio,
  availability,
  phone,
  website,
}) => {
  return (
    <Container
      styleNumber={1}
      className="my-profile-container"
      child={
        <div>
          <div className=" profileRow row m-0">
            <div className="col col-md-10 p-0 d-sm-flex flex-row">
              <div className="imgSectionContainer mx-auto mx-sm-0">
                <div className="imgContainer">
                  <img src={img} alt={`${name} ${lastName}'s profile`} />
                </div>

                <label
                  className={`AvailabilityDot ${
                    availability ? `bg-success` : `bg-danger`
                  }`}
                ></label>
              </div>

              <div className="workerInfo text-center text-sm-left ml-sm-3">
                <p className="location mb-0 mx-auto mx-sm-0 text-uppercase">
                  {location}
                </p>

                <p className="fullName mb-0 mx-auto mx-sm-0 h5 text-capitalize">
                  {name} {lastName}
                </p>
                <p className="jobTitle mb-0 mx-auto mx-sm-0 h6">{job}</p>

                <div className="d-md-flex mt-1 flex-row">
                  {skills.split(',').map((skill, index) => (
                    <span
                      className="badge badge-pill badge-primary mr-1"
                      key={index}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  className="d-block d-md-none mx-auto mx-sm-0"
                  type="button"
                  data-toggle="collapse"
                  data-target={`#ex${id}`}
                  aria-expanded="false"
                  aria-controls={`ex${id}`}
                >
                  Show more <i className="fa fa-sort-down"></i>
                </button>
              </div>
            </div>
            <div className="col d-md-block d-none d-md-block p-0 my-auto">
              <button
                className="float-right showMoreLg"
                type="button"
                data-toggle="collapse"
                data-target={`#ex${id}`}
                aria-expanded="false"
                aria-controls={`ex${id}`}
              >
                Show more <i className="fa fa-sort-down"></i>
              </button>
            </div>
          </div>

          <div className="collapse " id={`ex${id}`}>
            <div className="pt-3">{bio}</div>
            {phone ? (
              <p className="m-0">
                Phone: <a href={`tel:${phone}`}>{phone}</a>
              </p>
            ) : null}
            {website ? (
              <p className="m-0">
                Website: <a href={`${website}`}>{website}</a>
              </p>
            ) : null}
          </div>
        </div>
      }
    ></Container>
  )
}

export default WorkerProfile
