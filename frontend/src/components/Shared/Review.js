import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { faEdit, faSave, faTrashAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "react-bootstrap/esm/Button";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { TextField } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";

const validationSchema = yup.object({
  content: yup
    .string('Unesite recenziju')
    .required('Unesite recenziju'),
  score: yup
    .number('Odaberite ocjenu')
    .min(1, 'Najmanja ocjena može biti 1')
    .required('Obavezno je odabrati ocjenu'),
});

const Review = ({ review, updateReview, deleteReview }) => {
  const { auth } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const formik = useFormik({
    initialValues: {
      content: review.content,
      score: review.score,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // setLoading(true);
      updateReview({
        ...review,
        ...values
      });
      setEditMode(false);
    },
  });

  return (
    <>
      {!editMode &&
        <div className="mb-4">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <img
                src={review.author.profilePicture.url}
                alt="company"
                className="rounded-circle my-2"
                style={{
                  height: "75px",
                  width: "75px",
                  border: "1px solid lightGray",
                }}
              />
              <div className="ml-2">
                <h5>{review.author.firstName + " " + review.author.lastName}</h5>
                <Rating
                  className="text-blueAccent"
                  value={review.score}
                  precision={1}
                  readOnly
                />
              </div>
            </div>
            {review.author.userId === auth.data.userId &&
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  variant="white" className="no-round text-uppercase"
                  onClick={() => setEditMode(true)}
                >
                  <FontAwesomeIcon icon={faEdit} className="bg-white text-blueAccent fa-1x" />
                </Button>
                <Button
                  variant="white" className="no-round text-uppercase"
                  onClick={() => deleteReview(review)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="bg-white text-blueAccent fa-1x" />
                </Button>
              </div>
            }
          </div>
          <p className="my-2">{review.content}</p>
        </div>
      }

      {editMode &&
        <div className="">
          <form onSubmit={formik.handleSubmit}>
            <TextField
              className="mt-2 mb-1"
              fullWidth
              variant="outlined"
              id="content"
              name="content"
              label="Komentiraj..."
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
            <div className="my-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center flex-wrap">
                <span className="text-gray mb-1">Ocjena: </span>
                <Rating
                  className="text-blueAccent"
                  fullWidth
                  variant="outlined"
                  id="score"
                  name="score"
                  value={formik.values.score}
                  onChange={(_, value) => formik.setFieldValue('score', value ? value : review.score)}
                  error={formik.touched.score && Boolean(formik.errors.score)}
                  helperText={formik.touched.score && formik.errors.score}
                  precision={1}
                />
              </div>

              <div>
                <Button
                  variant="white" className="no-round text-uppercase"
                  onClick={() => setEditMode(false)}
                >
                  <FontAwesomeIcon icon={faUndo} className="bg-white text-blueAccent fa-1x" />
                </Button>
                <Button
                  variant="white" className="no-round text-uppercase"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faSave} className="bg-white text-blueAccent fa-1x" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      }
    </>
  );
};

export default Review;
