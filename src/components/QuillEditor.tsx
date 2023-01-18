import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//Defines options for the toolbar
const toolbarOptions = [
  ["bold", "italic", "underline", "strike", "clean"], // toggled buttons
  ["code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  ["link"],
];

interface Props {
  value: string;
  onChange: (content: string) => void;
}

import React from "react";

const QuillEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{ toolbar: toolbarOptions }}
      placeholder="Share your thoughts"
    />
  );
};

export default QuillEditor;
