export function ReglageRoleSuperAdmin() {
  return (
    <>
      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center experience border-bottom ">
          <span>Parametre de rôle</span>
          <span className="border px-3 p-2 add-experience text-bg-warning">
            SuperAdmin
          </span>
        </div>
        <br />
        <div className="col-md-12">
          <label className="labels">Experience in Designing</label>
          <input
            type="text"
            className="form-control"
            placeholder="experience"
          />
        </div>{" "}
        <br />
        <div className="col-md-12">
          <label className="labels">Additional Details</label>
          <input
            type="text"
            className="form-control"
            placeholder="additional details"
          />
        </div>
      </div>
    </>
  );
}
