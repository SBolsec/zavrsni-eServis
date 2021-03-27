import { Button } from "@material-ui/core";
import React, { useState } from "react";
import uploadProfilePicture from "../../actions/auth/uploadProfilePicture";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../Utils/Spinner";

const SetProfilePicture = () => {
  const { auth, dispatch } = useAuth();
  const [picture, setPicture] = useState();
  const [preview, setPreview] = useState();

  const changePicture = (e) => {
    e.preventDefault();

    setPicture(e.target.files[0]);

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadPicture = () => {
    uploadProfilePicture({ userId: auth.data.userId, picture })(dispatch);
  };

  return (
    <div className="d-flex flex-column bg-white justify-content-center align-items-center">
      <div className="my-4">
        <img
          src={preview ? preview : auth.data.profilePictureURL}
          alt="avatar"
          className="rounded-circle ml-2"
          style={{ width: "90px", height: "90px" }}
        />
      </div>
      <div className="w-100 mb-4 mt-2 d-flex flex-column flex-sm-row justify-content-center align-items-center">
        <Button
          variat="contained"
          size="small"
          className="bg-lightGray text-dark no-round font-weight-bold m-2 px-4 text-center"
          component="label"
        >
          Odaberi sliku
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={changePicture}
            hidden
          />
        </Button>
        <Button
          variant="contained"
          size="small"
          className="bg-blueAccent text-white no-round font-weight-bold m-2 px-4 text-center"
          onClick={uploadPicture}
        >
          Promijeni sliku
        </Button>
      </div>
      {auth.loading && <Spinner />}
    </div>
  );
};

export default SetProfilePicture;
