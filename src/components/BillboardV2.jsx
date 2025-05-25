

const BillboardV2 = () => {
  return (
    <div>
      <h2>THIS IS BILLBOARD V2</h2>

      <button className="btn btn-success" type="button" disabled>
        <span
          className="spinner-border"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>

      {/* Lone spinner */}
      {/* <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> */}

    </div>
  );
};

export default BillboardV2;
