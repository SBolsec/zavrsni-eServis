import axiosInstance from "../../helpers/axiosInstance";
import {
  UPLOAD_PROFILE_PICTURE_ERROR,
  UPLOAD_PROFILE_PICTURE_LOADING,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
} from "../../constants/actionTypes";

const uploadProfilePicture = ({ userId, picture }) => (dispatch) => {
  if (!picture) {
    console.log("no picture");
    return;
  }

  dispatch({ type: UPLOAD_PROFILE_PICTURE_LOADING });

  const formData = new FormData();
  formData.append("picture", picture);

  axiosInstance()
    .post(`/users/upload-picture/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
        dispatch({ type: UPLOAD_PROFILE_PICTURE_SUCCESS, payload: res.data.url });
    })
    .catch((err) => {
        dispatch({ type: UPLOAD_PROFILE_PICTURE_ERROR });
    });
};

export default uploadProfilePicture;
