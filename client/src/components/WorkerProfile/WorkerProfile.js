import React from "react";

//import custom components
import Container from '../Container/Container'

import "./WorkerProfile.css";

const WorkerProfile = ({
  location,
  name,
  lastName,
  jobTitle,
  img,
  alt,
  skills,
}) => {
  return (
    
    <Container styleNumber={1} className="my-profile-container"
    child={
      <div>
        <div className=" profileRow row m-0">
          <div className="col p-0 d-sm-flex flex-row">
            <div className="imgContainer mx-auto mx-sm-0">
              <img src={img} alt={alt} />
            </div>
            <div className="workerInfo text-center text-sm-left ml-sm-3">
              <p className="location mb-0 mx-auto mx-sm-0 text-uppercase">
                {location}
              </p>

              <p className="fullName mb-0 mx-auto mx-sm-0 h5 text-capitalize">
                {name} {lastName}
              </p>
              <p className="jobTitle mb-0 mx-auto mx-sm-0 h6">{jobTitle}</p>
              
              <div className="d-md-flex mt-1 flex-row">
                {skills.map((skill, index) => (
                  <span className="badge badge-pill badge-primary mr-1" key={index}>
                    {skill}
                  </span>
                ))}
              </div>
              
              <button
                className="d-block d-md-none mx-auto mx-sm-0"
                type="button"
                data-toggle="collapse"
                data-target={`#${lastName}`}
                aria-expanded="false"
                aria-controls={lastName}
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
              data-target={`#${lastName}`}
              aria-expanded="false"
              aria-controls={lastName}
            >
              Show more <i className="fas fa-sort-down"></i>
            </button>
          </div>
        </div>

        <div className=" profileAccordion row">
          <div className="col px-0">
            <div className="collapse pb-3 pr-3 pl-3" id={lastName}>
              <div className="pt-3">
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    >
      
    </Container>
  )
};

export default WorkerProfile;
