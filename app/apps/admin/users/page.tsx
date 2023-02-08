/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "../../../style.bundle.css";
export default function page() {
  return (
    <>
      <div id="kt_app_content" className="app-content flex-column-fluid">
        {/*begin::Content container*/}
        <div
          id="kt_app_content_container"
          className="app-container container-xxl"
        >
          {/*begin::Contacts App- View Contact*/}
          <div className="row g-7">
            {/*begin::Search*/}
            <div className="col-lg-6 col-xl-3 shadow-lg">
              {/*begin::Contacts*/}
              <div className="card card-flush" id="kt_contacts_list">
                {/*begin::Card header*/}
                <div className="card-header pt-7" id="kt_contacts_list_header">
                  {/*begin::Form*/}
                  <form
                    className="d-flex align-items-center position-relative w-100 m-0"
                    autoComplete="off"
                  >
                    {/*begin::Icon*/}
                    {/*begin::Svg Icon | path: icons/duotune/general/gen021.svg*/}
                    <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          opacity="0.5"
                          x="17.0365"
                          y="15.1223"
                          width="8.15546"
                          height={2}
                          rx={1}
                          transform="rotate(45 17.0365 15.1223)"
                          fill="currentColor"
                        />
                        <path
                          d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    {/*end::Svg Icon*/}
                    {/*end::Icon*/}
                    {/*begin::Input*/}
                    <input
                      type="text"
                      className="form-control form-control-solid ps-13"
                      name="search"
                      placeholder="Search contacts"
                    />
                    {/*end::Input*/}
                  </form>
                  {/*end::Form*/}
                </div>
                {/*end::Card header*/}
                {/*begin::Card body*/}
                <div className="card-body pt-5" id="kt_contacts_list_body">
                  {/*begin::List*/}
                  <div
                    className="scroll-y me-n5 pe-5 h-300px h-xl-auto"
                    data-kt-scroll="true"
                    data-kt-scroll-activate="{default: false, lg: true}"
                    data-kt-scroll-max-height="auto"
                    data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_contacts_list_header"
                    data-kt-scroll-wrappers="#kt_content, #kt_contacts_list_body"
                    data-kt-scroll-stretch="#kt_contacts_list, #kt_contacts_main"
                    data-kt-scroll-offset="5px"
                    style={{ maxHeight: 546 }}
                  >
                    {Array.from({ length: 10 }).map((_, index) => (
                      <>
                        <div className="d-flex flex-stack py-4">
                          {/*begin::Details*/}
                          <div className="d-flex align-items-center">
                            {/*begin::Avatar*/}
                            <div className="symbol symbol-40px symbol-circle">
                              <span className="symbol-label bg-light-danger text-danger fs-6 fw-bolder">
                                M{index}
                              </span>
                              <div className="symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n2 mt-n2" />
                            </div>
                            {/*end::Avatar*/}
                            {/*begin::Details*/}
                            <div className="ms-4">
                              <a
                                href="view-contact.html"
                                className="fs-6 fw-bold text-gray-900 text-hover-primary mb-2"
                              >
                                Melody Macy
                              </a>
                              <div className="fw-semibold fs-7 text-muted">
                                melody@altbox.com
                              </div>
                            </div>
                            {/*end::Details*/}
                          </div>
                          {/*end::Details*/}
                        </div>
                        <div className="separator separator-dashed d-none" />
                      </>
                    ))}
                  </div>
                  {/*end::List*/}
                </div>
                {/*end::Card body*/}
              </div>
              {/*end::Contacts*/}
            </div>
            <div className="col-xl-9 shadow-lg">
              <div className="card card-flush h-lg-100" id="kt_contacts_main">
                <div className="card-header pt-7" id="kt_chat_contacts_header">
                  {/*begin::Card title*/}
                  <div className="card-title">
                    {/*begin::Svg Icon | path: icons/duotune/communication/com005.svg*/}
                    <span className="svg-icon svg-icon-1 me-2">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 14H18V10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14ZM21 19V17C21 16.4 20.6 16 20 16H18V20H20C20.6 20 21 19.6 21 19ZM21 7V5C21 4.4 20.6 4 20 4H18V8H20C20.6 8 21 7.6 21 7Z"
                          fill="currentColor"
                        />
                        <path
                          opacity="0.3"
                          d="M17 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2H17C17.6 2 18 2.4 18 3V21C18 21.6 17.6 22 17 22ZM10 7C8.9 7 8 7.9 8 9C8 10.1 8.9 11 10 11C11.1 11 12 10.1 12 9C12 7.9 11.1 7 10 7ZM13.3 16C14 16 14.5 15.3 14.3 14.7C13.7 13.2 12 12 10.1 12C8.10001 12 6.49999 13.1 5.89999 14.7C5.59999 15.3 6.19999 16 7.39999 16H13.3Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    {/*end::Svg Icon*/}
                    <h2>Utilisateur</h2>
                  </div>
                  {/*end::Card title*/}
                  {/*begin::Card toolbar*/}
                  <div className="card-toolbar gap-3">
                    {/*begin::Chat*/}
                    <button
                      className="btn btn-sm btn-primary "
                      data-kt-drawer-show="true"
                      data-kt-drawer-target="#kt_drawer_chat"
                    >
                      {/*begin::Svg Icon | path: icons/duotune/communication/com012.svg*/}
                      <span className="svg-icon svg-icon-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.3"
                            d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z"
                            fill="currentColor"
                          />
                          <rect
                            x={6}
                            y={12}
                            width={7}
                            height={2}
                            rx={1}
                            fill="currentColor"
                          />
                          <rect
                            x={6}
                            y={7}
                            width={12}
                            height={2}
                            rx={1}
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      {/*end::Svg Icon*/}Nouveau
                    </button>
                    {/*end::Chat*/}
                    {/*begin::Chat*/}
                    <a
                      href="#"
                      className="btn btn-sm btn-danger btn-active-light-primary"
                    >
                      {/*begin::Svg Icon | path: icons/duotune/communication/com007.svg*/}
                      <span className="svg-icon svg-icon-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.3"
                            d="M8 8C8 7.4 8.4 7 9 7H16V3C16 2.4 15.6 2 15 2H3C2.4 2 2 2.4 2 3V13C2 13.6 2.4 14 3 14H5V16.1C5 16.8 5.79999 17.1 6.29999 16.6L8 14.9V8Z"
                            fill="currentColor"
                          />
                          <path
                            d="M22 8V18C22 18.6 21.6 19 21 19H19V21.1C19 21.8 18.2 22.1 17.7 21.6L15 18.9H9C8.4 18.9 8 18.5 8 17.9V7.90002C8 7.30002 8.4 6.90002 9 6.90002H21C21.6 7.00002 22 7.4 22 8ZM19 11C19 10.4 18.6 10 18 10H12C11.4 10 11 10.4 11 11C11 11.6 11.4 12 12 12H18C18.6 12 19 11.6 19 11ZM17 15C17 14.4 16.6 14 16 14H12C11.4 14 11 14.4 11 15C11 15.6 11.4 16 12 16H16C16.6 16 17 15.6 17 15Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      Suprimer
                    </a>
                  </div>
                  {/*end::Card toolbar*/}
                </div>
                <div className="card-body pt-5 ">
                  <div className="d-flex gap-7 align-items-center">
                    {/*begin::Avatar*/}
                    <div className="symbol symbol-circle symbol-100px">
                      <img
                        src="../../assets/media/avatars/300-6.jpg"
                        alt="image"
                      />
                    </div>
                    {/*end::Avatar*/}
                    {/*begin::Contact details*/}
                    <div className="d-flex flex-column gap-2">
                      {/*begin::Name*/}
                      <h3 className="mb-0">Emma Smith</h3>
                      {/*end::Name*/}
                      {/*begin::Email*/}
                      <div className="d-flex align-items-center gap-2">
                        {/*begin::Svg Icon | path: icons/duotune/communication/com011.svg*/}
                        <span className="svg-icon svg-icon-2">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.3"
                              d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
                              fill="currentColor"
                            />
                            <path
                              d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        {/*end::Svg Icon*/}
                        <a
                          href="view-contact.html#"
                          className="text-muted text-hover-primary"
                        >
                          smith@kpmg.com
                        </a>
                      </div>
                      {/*end::Email*/}
                      {/*begin::Phone*/}
                      <div className="d-flex align-items-center gap-2">
                        {/*begin::Svg Icon | path: icons/duotune/electronics/elc003.svg*/}
                        <span className="svg-icon svg-icon-2">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 20H19V21C19 21.6 18.6 22 18 22H6C5.4 22 5 21.6 5 21V20ZM19 3C19 2.4 18.6 2 18 2H6C5.4 2 5 2.4 5 3V4H19V3Z"
                              fill="currentColor"
                            />
                            <path
                              opacity="0.3"
                              d="M19 4H5V20H19V4Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        {/*end::Svg Icon*/}
                        <a
                          href="view-contact.html#"
                          className="text-muted text-hover-primary"
                        >
                          +6141 234 567
                        </a>
                      </div>
                      {/*end::Phone*/}
                    </div>
                    {/*end::Contact details*/}
                  </div>
                  <ul
                    className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x fs-6 fw-semibold mt-6 mb-8"
                    role="tablist"
                  >
                    {/*begin:::Tab item*/}
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link text-active-primary pb-4 active"
                        data-bs-toggle="tab"
                        href="view-contact.html#kt_contact_view_general"
                        aria-selected="true"
                        role="tab"
                      >
                        {/*begin::Svg Icon | path: icons/duotune/general/gen001.svg*/}
                        <span className="svg-icon svg-icon-4 me-1">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11 2.375L2 9.575V20.575C2 21.175 2.4 21.575 3 21.575H9C9.6 21.575 10 21.175 10 20.575V14.575C10 13.975 10.4 13.575 11 13.575H13C13.6 13.575 14 13.975 14 14.575V20.575C14 21.175 14.4 21.575 15 21.575H21C21.6 21.575 22 21.175 22 20.575V9.575L13 2.375C12.4 1.875 11.6 1.875 11 2.375Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        {/*end::Svg Icon*/}Generale
                      </a>
                    </li>
                    {/*end:::Tab item*/}
                    {/*begin:::Tab item*/}
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link text-active-primary pb-4"
                        data-bs-toggle="tab"
                        href="view-contact.html#kt_contact_view_meetings"
                        aria-selected="false"
                        role="tab"
                        tabIndex={-1}
                      >
                        {/*begin::Svg Icon | path: icons/duotune/general/gen014.svg*/}
                        <span className="svg-icon svg-icon-4 me-1">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.3"
                              d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z"
                              fill="currentColor"
                            />
                            <path
                              d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z"
                              fill="currentColor"
                            />
                            <path
                              d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        {/*end::Svg Icon*/}Rôles
                      </a>
                    </li>
                    {/*end:::Tab item*/}
                    {/*begin:::Tab item*/}
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link text-active-primary pb-4"
                        data-bs-toggle="tab"
                        href="view-contact.html#kt_contact_view_activity"
                        aria-selected="false"
                        role="tab"
                        tabIndex={-1}
                      >
                        {/*begin::Svg Icon | path: icons/duotune/general/gen056.svg*/}
                        <span className="svg-icon svg-icon-4 me-1">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.0077 19.2901L12.9293 17.5311C12.3487 17.1993 11.6407 17.1796 11.0426 17.4787L6.89443 19.5528C5.56462 20.2177 4 19.2507 4 17.7639V5C4 3.89543 4.89543 3 6 3H17C18.1046 3 19 3.89543 19 5V17.5536C19 19.0893 17.341 20.052 16.0077 19.2901Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        {/*end::Svg Icon*/}Activité
                      </a>
                    </li>
                    {/*end:::Tab item*/}
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade active show"
                      id="kt_contact_view_general"
                      role="tabpanel"
                    >
                      1
                    </div>
                    <div
                      className="tab-pane fade"
                      id="kt_contact_view_meetings"
                      role="tabpanel"
                    ></div>
                    <div
                      className="tab-pane fade"
                      id="kt_contact_view_activity"
                      role="tabpanel"
                    ></div>
                  </div>
                  {/*end::Tab content*/}
                </div>
                {/*end::Card body*/}
              </div>
              {/*end::Contacts*/}
            </div>
            {/*end::Content*/}
          </div>
          {/*end::Contacts App- View Contact*/}
        </div>
        {/*end::Content container*/}
      </div>
    </>
  );
}