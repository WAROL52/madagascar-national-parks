import React from "react";

export default function page() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto mb-4">
            <div className="section-title text-center ">
              <h3 className="top-c-sep">Lorem ipsum dolor sit amet.</h3>
              <p>
                Lorem ipsum dolor sit detudzdae amet, rcquisc adipiscing elit.
                Aenean socada commodo ligaui egets dolor. Nullam quis ante tiam
                sit ame orci eget erovtiu faucid.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 card-margin">
            <div className="card search-form">
              <div className="card-body p-0">
                <form id="search-form">
                  <div className="row">
                    <div className="col-12">
                      <div className="row no-gutters">
                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                          >
                            <option>Location</option>
                            <option>London</option>
                            <option>Boston</option>
                            <option>Mumbai</option>
                            <option>New York</option>
                            <option>Toronto</option>
                            <option>Paris</option>
                          </select>
                        </div>
                        <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            id="search"
                            name="search"
                          />
                        </div>
                        <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                          <button type="submit" className="btn btn-base">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-search"
                            >
                              <circle cx="11" cy="11" r="8"></circle>
                              <line
                                x1="21"
                                y1="21"
                                x2="16.65"
                                y2="16.65"
                              ></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex flex-column flex-md-row mb-3 mb-md-0">
                <nav
                  className="mr-auto d-flex align-items-center"
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="active breadcrumb-item" aria-current="page">
                      <a href="/">
                        <i className="fa fa-home"></i>
                      </a>
                    </li>
                    <li className="active breadcrumb-item" aria-current="page">
                      Liste des plaintes déposées
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
