import ReactQuill, { Quill } from "react-quill";
import BlotFormatter from "quill-blot-formatter";
import "react-quill/dist/quill.snow.css";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./Editor.module.scss";

Quill.register("modules/blotFormatter", BlotFormatter);

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ align: null }, { align: "center" }, { align: "right" }, { align: "justify" }],
    ["blockquote"],
    ["link", "image"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "bullet" }, { list: "ordered" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    ["clean"],
  ],
  blotFormatter: {},
};

const QuillEditor = ({ onChange, title, errorText, disabled, defaultValue }) => {
  return (
    <div className={styles.editorBlock}>
      <p className={styles.title}>{title}</p>
      <div className="text-editor">
        <ReactQuill
          theme="snow"
          modules={modules}
          onChange={(content) => onChange(content)}
          readOnly={disabled}
          defaultValue={defaultValue}
        />
      </div>
      <p className={styles.error}>{errorText}</p>
    </div>
  );
};

const Editor = ({ name, title, errorText, disabled, defaultValue }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange } }) => (
        <QuillEditor
          onChange={onChange}
          title={title}
          errorText={errorText}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      )}
      name={name}
      control={control}
    />
  );
};

export default Editor;
