import React from "react";
import { type Box } from "~/types/clarifai.types";

const FaceAIBox = ({ boundigBox, imageHeight, imageWidth }: Box) => {
  const box = {
    left: boundigBox.left_col * imageWidth,
    top: boundigBox.top_row * imageHeight,
    right: imageWidth - boundigBox.right_col * imageWidth,
    bottom: imageHeight - boundigBox.bottom_row * imageHeight,
  };
  if (imageWidth === 0 || imageHeight === 0) return <></>;
  return (
    <div
      className="absolute flex cursor-pointer flex-wrap justify-center border-4 border-primary-focus"
      style={{
        ...box,
      }}
    />
  );
};

export default FaceAIBox;
