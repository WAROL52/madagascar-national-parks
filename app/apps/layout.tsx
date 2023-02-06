/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
// import { AppsMenu } from "./AppsMenu";
// import "https://themesbrand.com/borex-php/layouts/assets/css/app.min.css";
import "./styles.css";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { AppsMenu } from "./AppsMenu";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="layoutSidenav">
      {/* <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <a className="nav-link" href="index.html">
                Dashboard
              </a>
              <div className="sb-sidenav-menu-heading">Interface</div>
              <AppsMenu title="test">123</AppsMenu>
              <div className="sb-sidenav-menu-heading">Interface</div>
              <div className="sb-sidenav-menu-heading">Addons</div>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            Start Bootstrap
          </div>
        </nav>
      </div> */}
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <Link className="nav-link" href="apps/dashboard">
                <div className="sb-nav-link-icon">
                  <svg
                    className="svg-inline--fa fa-gauge-high"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="gauge-high"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg
                  >
                    <path
                      fill="currentColor"
                      d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 64C238.3 64 224 78.33 224 96C224 113.7 238.3 128 256 128C273.7 128 288 113.7 288 96C288 78.33 273.7 64 256 64zM256 416C291.3 416 320 387.3 320 352C320 334.6 313.1 318.9 301.9 307.4L365.1 161.7C371.3 149.5 365.8 135.4 353.7 130C341.5 124.7 327.4 130.2 322 142.3L257.9 288C257.3 288 256.6 287.1 256 287.1C220.7 287.1 192 316.7 192 352C192 387.3 220.7 416 256 416V416zM144 112C126.3 112 112 126.3 112 144C112 161.7 126.3 176 144 176C161.7 176 176 161.7 176 144C176 126.3 161.7 112 144 112zM96 288C113.7 288 128 273.7 128 256C128 238.3 113.7 224 96 224C78.33 224 64 238.3 64 256C64 273.7 78.33 288 96 288zM416 224C398.3 224 384 238.3 384 256C384 273.7 398.3 288 416 288C433.7 288 448 273.7 448 256C448 238.3 433.7 224 416 224z"
                    />
                  </svg>
                  {/* <i class="fas fa-tachometer-alt"></i> Font Awesome fontawesome.com */}
                </div>
                Dashboard
              </Link>
              <div className="sb-sidenav-menu-heading">Interface</div>
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <svg
                    className="svg-inline--fa fa-table-columns"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="table-columns"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg
                  >
                    <path
                      fill="currentColor"
                      d="M0 96C0 60.65 28.65 32 64 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96zM64 416H224V160H64V416zM448 160H288V416H448V160z"
                    />
                  </svg>
                  {/* <i class="fas fa-columns"></i> Font Awesome fontawesome.com */}
                </div>
                Suivi de projet
                <div className="sb-sidenav-collapse-arrow">
                  <svg
                    className="svg-inline--fa fa-angle-down"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="angle-down"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    data-fa-i2svg
                  >
                    <path
                      fill="currentColor"
                      d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                    />
                  </svg>
                  {/* <i class="fas fa-angle-down"></i> Font Awesome fontawesome.com */}
                </div>
              </a>
              <div
                className="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
                style={{}}
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link className="nav-link" href="/apps/projet-formation">
                    Formation
                  </Link>
                  <a className="nav-link" href="/apps/projet-excecution">
                    Excecution
                  </a>
                </nav>
              </div>
              <div className="sb-sidenav-menu-heading">Admin</div>
              <Link className="nav-link" href="apps/users-manager">
                <div className="sb-nav-link-icon">
                  <svg
                    className="svg-inline--fa fa-chart-area"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="chart-area"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg
                  >
                    <path
                      fill="currentColor"
                      d="M64 400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32C49.67 32 64 46.33 64 64V400zM128 320V236C128 228.3 130.8 220.8 135.9 214.1L215.3 124.2C228.3 109.4 251.4 109.7 263.1 124.8L303.2 171.8C312.2 182.7 328.6 183.4 338.6 173.4L359.6 152.4C372.7 139.3 394.4 140.1 406.5 154.2L472.3 231C477.3 236.8 480 244.2 480 251.8V320C480 337.7 465.7 352 448 352H159.1C142.3 352 127.1 337.7 127.1 320L128 320z"
                    />
                  </svg>
                  {/* <i class="fas fa-chart-area"></i> Font Awesome fontawesome.com */}
                </div>
                Gestion d'utilisateurs
              </Link>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            Start Bootstrap
          </div>
        </nav>
      </div>

      <div id="layoutSidenav_content">
        <main>
          <div
            className="container-fluid px-4"
            style={{ height: "100%", width: "100%" }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
