import React from 'react'

import './WorkerProfile.css'

const WorkerProfile = ({location, name, lastName, jobTitle, img, alt, skills}) => {
  return (
    <div className=" profile p-3">
      <div className=" profileRow row p-3">
        <div className="col p-0 d-sm-flex flex-row"
        >
          
          <div className="imgContainer mx-auto mx-sm-0">
            <img 
            src={img}
            alt={alt}
              />
          </div>
          <div className="workerInfo text-center text-sm-left ml-sm-3">
            
            <p className="location mb-0 mx-auto mx-sm-0 text-uppercase">
              {location}
            </p>
            
            <p className="fullName mb-0 mx-auto mx-sm-0 h5 text-capitalize">
              {name} {lastName}
            </p>
            <p className="jobTitle mb-0 mx-auto mx-sm-0 pb-2 h6"
            
            >
              {jobTitle}
            </p>
            
            <a className="d-block d-md-none "
            type="button" data-toggle="collapse" data-target={`#${lastName}`} aria-expanded="false" aria-controls={lastName}>
              Show more <i className="fas fa-sort-down"></i>
            </a>
            
          </div>
        </div>
        <div className="col d-md-block d-none d-md-block p-0 ">
          <a className="float-right showMoreLg"
           type="button" data-toggle="collapse" data-target={`#${lastName}`} aria-expanded="false" aria-controls={lastName}>
              Show more <i className="fas fa-sort-down"></i>
          </a>
        </div>
      </div>
      
      <div className=" profileAccordion row">
        <div className="col px-0">
          <div className="collapse pb-3 pr-3 pl-3" id={lastName}>
            <div className="d-md-flex flex-row">
              
              {
                skills.map(skill => (
                  <span className="badge badge-pill badge-primary mr-1">{skill}</span>
                ))
              }
              
            <span className="badge badge-pill badge-primary">Primary</span>
            
            </div>
            <div className="pb-3">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default WorkerProfile