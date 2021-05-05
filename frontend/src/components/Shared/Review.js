import React from "react";
import Rating from "@material-ui/lab/Rating";

const Review = ({ review }) => {
  return (
    <div className="mb-4">
      <div className="d-flex flex-row justify-content-start align-items-center">
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
            defaultValue={review.score}
            precision={0.5}
            readOnly
          />
        </div>
      </div>
      <p className="my-2">{review.content}</p>
    </div>
  );
};

export default Review;
