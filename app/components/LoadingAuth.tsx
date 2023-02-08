import React from "react";

export default function LoadingAuth() {
  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block text-bg-warning">
                  <img src="/images/belou.png" width="100%" alt="" srcSet="" />
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div
                      className="spinner-border spinner-border-sm text-warning shadow"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Loading...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
