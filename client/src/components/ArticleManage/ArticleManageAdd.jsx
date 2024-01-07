import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import BlotFormatter from "quill-blot-formatter";
import "react-quill/dist/quill.snow.css";

const ArticleManageAdd = () => {
  Quill.register("modules/blotFormatter", BlotFormatter);
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["blockquote"],
      ["link", "image"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "bullet" }, { list: "ordered" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
    blotFormatter: {},
  };

  return (
    <div className="text-editor">
      <ReactQuill theme="snow" modules={modules}></ReactQuill>
    </div>
  );
};

export default ArticleManageAdd;
