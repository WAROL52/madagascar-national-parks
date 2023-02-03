import React from "react";

export default function Formulaire2() {
  return (
    <div
      className="shadow text-bg-light p-3 border rounded overflow-auto"
      style={{ height: 500 }}
    >
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <section className="container">
            <h5 className="py-2">Date de receptioin de la plainte</h5>
            <div className="row">
              <div className="col">
                <div className="input-group date" id="datepicker">
                  <input
                    type="text"
                    name="date_de_reception_de_la_plainte"
                    className="form-control date_reception"
                    tabIndex={-1}
                  />
                  <span className="input-group-append">
                    <span className="input-group-text bg-light d-block">
                      <i className="fa fa-calendar" />
                    </span>
                  </span>
                  <div className="qs-datepicker-container qs-hidden">
                    <div className="qs-datepicker">
                      <div className="qs-controls">
                        <div className="qs-arrow qs-left" />
                        <div className="qs-month-year">
                          <span className="qs-month">February</span>
                          <span className="qs-year">2023</span>
                        </div>
                        <div className="qs-arrow qs-right" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="col-md-4 col-sm-12">
          <section className="container">
            <h5 className="py-2">Date de la 1ere communication</h5>
            <div className="row">
              <div className="col">
                <div className="input-group date " id="datepicker">
                  <input
                    type="text"
                    name="date_de_la_1ere_communication"
                    className="form-control date_1er_communication"
                    tabIndex={-1}
                  />
                  <span className="input-group-append">
                    <span className="input-group-text bg-light d-block">
                      <i className="fa fa-calendar" />
                    </span>
                  </span>
                  <div className="qs-datepicker-container qs-hidden">
                    <div className="qs-datepicker">
                      <div className="qs-controls">
                        <div className="qs-arrow qs-left" />
                        <div className="qs-month-year">
                          <span className="qs-month">February</span>
                          <span className="qs-year">2023</span>
                        </div>
                        <div className="qs-arrow qs-right" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="col-md-4 col-sm-12">
          <section className="container">
            <h5 className="py-2">Date de fermeture</h5>
            <div className="row">
              <div className="col">
                <div className="input-group date" id="datepicker">
                  <input
                    type="text"
                    name="date_de_fermeture"
                    className="form-control date_fermeture"
                    tabIndex={-1}
                  />
                  <span className="input-group-append">
                    <span className="input-group-text bg-light d-block">
                      <i className="fa fa-calendar" />
                    </span>
                  </span>
                  <div className="qs-datepicker-container qs-hidden">
                    <div className="qs-datepicker">
                      <div className="qs-controls">
                        <div className="qs-arrow qs-left" />
                        <div className="qs-month-year">
                          <span className="qs-month">February</span>
                          <span className="qs-year">2023</span>
                        </div>
                        <div className="qs-arrow qs-right" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="row">
        <div className="col pl-4">
          <h5>Mode de reception :</h5>
          <div className="d-flex justify-content-around">
            <div>
              <input
                type="checkbox"
                name="mode_de_reception.telephone"
                id="mode_reception_telephone"
                tabIndex={-1}
              />
              <label htmlFor="mode_reception_telephone">Télephone</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="mode_de_reception.email"
                id="mode_reception_courier"
                tabIndex={-1}
              />
              <label htmlFor="mode_reception_courier">email</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="mode_de_reception.autre"
                id="mode_reception_autre"
                tabIndex={-1}
              />
              <label htmlFor="mode_reception_autre">
                Autre :
                <input
                  type="text"
                  name="mode_reception_autre_input"
                  id="mode_reception_autre_input"
                  tabIndex={-1}
                />{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col pl-4">
          <h5>
            Nom et unité administrative du responsable du traitement de la
            plainte :
          </h5>
          <textarea
            className="form-control"
            name="nom_et_unite_administrative_du_responsable_du_traitement_de_la_plainte"
            rows={8}
            tabIndex={-1}
            defaultValue={""}
          />
        </div>
      </div>
    </div>
  );
}
