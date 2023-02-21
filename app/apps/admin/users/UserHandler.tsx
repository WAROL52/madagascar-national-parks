/* eslint-disable react/no-unescaped-entities */
import SaveLoading from "@/app/components/SaveLoading";
import { Email } from "@/prisma/dto/email/entities/email.entity";
import { User } from "@/prisma/dto/user/entities/user.entity";
import { getAvatarUser } from "@/tools/tools";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import { GeneraleInfo } from "./GeneraleInfo";
import { RoleUser } from "./RoleUser";

export function UserHandler() {
  const [users, setUsers] = useState<Email[]>([]);
  const [usersFiltered, setUsersFiltered] = useState<Email[]>([]);
  const [showModalAddUser, setShowModalAddUser] = useState<boolean>(false);
  const [showModalDeleteUser, setShowModalDeleteUser] =
    useState<boolean>(false);
  const [textFiltered, setTextFiltered] = useState<string>("");
  const [idSelected, setId] = useState<number | null>(null);
  const [userSelected, setUser] = useState<Email | null>(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setUsersFiltered(
      users.filter((email) => {
        if (!textFiltered) return true;
        if (email.email.toLowerCase().includes(textFiltered.toLowerCase()))
          return true;
        if (
          email.User &&
          email.User.nom.toLowerCase().includes(textFiltered.toLowerCase())
        )
          return true;
        if (
          email.User &&
          email.User.prenom.toLowerCase().includes(textFiltered.toLowerCase())
        )
          return true;
        return false;
      })
    );
  }, [textFiltered, users]);
  const addUsers = useCallback(
    (email: Email) => {
      setUsers((oldUsers) => [...oldUsers, email]);
    },
    [setUsers]
  );
  const updateUser = useCallback(
    (email: Email) => {
      setUsers((oldUsers) => {
        return oldUsers.map((oldEmail) => {
          if (oldEmail.email === email.email) {
            return email;
          }
          return oldEmail;
        });
      });
    },
    [setUsers]
  );
  const deleteUser = useCallback(
    (email: Email) => {
      setUsers((oldUsers) => {
        return oldUsers.filter((oldEmail) => oldEmail.email !== email.email);
      });
    },
    [setUsers]
  );
  const getUserName = (user: Email) =>
    user.User ? `${user.User.nom} ${user.User.prenom}` : "Inconnue_" + user.id;
  useEffect(() => {
    setLoading(true);
    axios.get("/api/email").then(({ data }) => {
      setLoading(false);
      setUsers(data);
    });
  }, []);
  useEffect(() => {
    if (idSelected !== null) {
      setUser(users[idSelected]);
    } else {
      setUser(null);
    }
  }, [idSelected, users]);
  const onCloseModalDeleteUser = useCallback(
    () => setShowModalDeleteUser(false),
    []
  );
  return (
    <>
      <div className="app-content flex-column-fluid">
        {/*begin::Content container*/}
        <div
          id="kt_app_content_container"
          className="app-container container-xxl"
        >
          <div className="row g-7">
            {/*begin::Search*/}
            <div className="col-md-5 col-xl-3 shadow-lg">
              {/*begin::Contacts*/}
              <div className="card card-flush" id="kt_contacts_list">
                {/*begin::Card header*/}
                <div className="card-header pt-7" id="kt_contacts_list_header">
                  {/*begin::Form*/}
                  <form
                    className="d-flex align-items-center position-relative w-100 m-0"
                    autoComplete="off"
                  >
                    <input
                      type="text"
                      className="form-control form-control-solid ps-13"
                      name="search"
                      placeholder="Recherche d'email..."
                      value={textFiltered}
                      onChange={(e) => setTextFiltered(e.target.value)}
                    />
                  </form>
                  {/*end::Form*/}
                </div>
                {/*end::Card header*/}
                {/*begin::Card body*/}
                <div className="card-body" id="kt_contacts_list_body">
                  {/*begin::List*/}
                  <SaveLoading
                    textLoading="chargement..."
                    isLoading={isLoading}
                  >
                    {" "}
                  </SaveLoading>
                  <ListGroup
                    variant="flush"
                    style={{ height: "550px", overflowY: "auto" }}
                    as={"ul"}
                  >
                    {usersFiltered.map((user, index) => (
                      <ListGroup.Item
                        key={index}
                        action
                        onClick={() => setId(index)}
                        active={index === idSelected}
                        className="px-0"
                      >
                        <div className="d-flex flex-stack px-0">
                          {/*begin::Details*/}
                          <div className="d-flex align-items-center p-0">
                            {/*begin::Avatar*/}
                            <div className="symbol symbol-40px symbol-circle mx-0">
                              <span className="border p-2 rounded-circle bg-light-danger text-danger fw-bolder">
                                {user.role.slice(0, 3)}
                              </span>
                            </div>
                            {/*end::Avatar*/}
                            {/*begin::Details*/}
                            <div className=" mx-0">
                              <a
                                href="view-contact.html"
                                className="fs-6 fw-bold link-warning mb-2"
                              >
                                {getUserName(user)}
                              </a>
                              <div className="fw-semibold  text-muted">
                                {user.email}
                              </div>
                            </div>
                            {/*end::Details*/}
                          </div>
                          {/*end::Details*/}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  {/*end::List*/}
                </div>
                {/*end::Card body*/}
              </div>
              {/*end::Contacts*/}
            </div>
            <div className="col-md-7 col-xl-9 shadow-lg">
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
                    <h2>Utilisateurs</h2>
                  </div>
                  {/*end::Card title*/}
                  {/*begin::Card toolbar*/}
                  <div className="card-toolbar">
                    {/*begin::Chat*/}
                    <button
                      onClick={() => setShowModalAddUser(true)}
                      className="btn btn-sm btn-primary mx-3"
                      data-kt-drawer-show="true"
                      data-kt-drawer-target="#kt_drawer_chat"
                    >
                      {/*begin::Svg Icon | path: icons/duotune/communication/com012.svg*/}
                      <span className="svg-icon svg-icon-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="currentColor"
                          className="bi bi-person-add"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                          <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                        </svg>
                      </span>
                      {/*end::Svg Icon*/}Nouveau
                    </button>
                    {/*end::Chat*/}
                    {/*begin::Chat*/}
                    {userSelected && (
                      <a
                        href="#"
                        className="btn btn-sm btn-danger btn-active-light-primary mx-3"
                        placeholder={
                          "suprimer cette email ?: " + userSelected.email
                        }
                        onClick={() => setShowModalDeleteUser(true)}
                      >
                        <span className="svg-icon svg-icon-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </span>
                        Suprimer
                      </a>
                    )}
                  </div>
                  {/*end::Card toolbar*/}
                </div>
                {userSelected && (
                  <div className="card-body pt-5 ">
                    <div className="d-flex gap-7 align-items-center">
                      {/*begin::Avatar*/}
                      <div className="symbol symbol-circle symbol-100px">
                        <img
                          src={getAvatarUser(
                            userSelected?.User?.avatar,
                            userSelected?.User?.sexe
                          )}
                          alt="user"
                        />
                      </div>
                      {/*end::Avatar*/}
                      {/*begin::Contact details*/}
                      <div className="d-flex flex-column gap-2">
                        {/*begin::Name*/}
                        <h3 className="mb-0">{getUserName(userSelected)}</h3>
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
                            href={"mailto:" + userSelected.email}
                            className="text-muted text-hover-primary"
                          >
                            {userSelected.email}
                          </a>
                        </div>
                        {/*end::Email*/}
                        {/*begin::Phone*/}
                        {userSelected.User && (
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
                              {userSelected.User.tel1} /{" "}
                              {userSelected.User.tel2}
                            </a>
                          </div>
                        )}
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
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              fill="currentColor"
                              className="bi bi-check2-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                              <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
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
                        {userSelected.User && (
                          <GeneraleInfo user={userSelected.User} />
                        )}
                        {!userSelected.User && (
                          <h5 className={"font-monospace"}>
                            Cette utilisateur ne s'est pas encore inscrit...
                          </h5>
                        )}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="kt_contact_view_meetings"
                        role="tabpanel"
                      >
                        {userSelected && (
                          <RoleUser
                            email={userSelected}
                            updateUser={updateUser}
                          />
                        )}
                        {!userSelected && (
                          <h5 className={"font-monospace"}>
                            Cette utilisateur ne s'est pas encore inscrit...
                          </h5>
                        )}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="kt_contact_view_activity"
                        role="tabpanel"
                      >
                        {!userSelected.User && (
                          <h5 className={"font-monospace"}>
                            Cette utilisateur ne s'est pas encore inscrit...
                          </h5>
                        )}
                      </div>
                    </div>
                    {/*end::Tab content*/}
                  </div>
                )}
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
      <AddUser
        showModal={showModalAddUser}
        onClose={useCallback(() => setShowModalAddUser(false), [])}
        addUsers={addUsers}
      />

      {userSelected && (
        <DeleteUser
          deleteUsers={deleteUser}
          onClose={onCloseModalDeleteUser}
          showModal={showModalDeleteUser}
          userSelected={userSelected}
        />
      )}
    </>
  );
}
