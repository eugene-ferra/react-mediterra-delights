import { forwardRef, useContext, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import api from "../../../services/apiClient";
import Text from "../../common/Text/Text";
import ThemeContext from "../../context/ThemeContext";

const plugins = [
  "advlist",
  "accordion",
  "autolink",
  "link",
  "image",
  "lists",
  "preview",
  "searchreplace",
  "wordcount",
  "fullscreen",
  "table",
  "charmap",
  "emoticons",
];

const toolbar =
  "undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | " +
  "bullist numlist outdent indent | forecolor backcolor | link image | preview fullscreen | ";

const menubar = "edit insert format";

const imageUploadHandler = (blobInfo, progress, name) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", blobInfo.blob(), blobInfo.filename());
    formData.append("name", name());

    api
      .post("http://localhost:5000/api/articles/images", formData, {})
      .then((response) => {
        resolve(response.location);
      })
      .catch((err) => reject(err));
  });
};

const TextEditor = forwardRef(function TextEditor(
  { title, disabled, initialValue, imgName },
  ref
) {
  const { isDark } = useContext(ThemeContext);
  const [markup, setMarkup] = useState("");
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    setSaved(markup);
  }, [isDark]);

  return (
    <>
      {isDark && (
        <div>
          <Text style={{ fontWeight: 500, marginBottom: "5px" }}>{title}</Text>
          <div>
            <Editor
              disabled={disabled}
              ref={ref}
              onEditorChange={(value) => setMarkup(value)}
              onInit={(evt, editor) => {
                ref.current = editor;
              }}
              initialValue={saved || initialValue}
              apiKey={`${import.meta.env.VITE_TINYMCE_API_KEY}`}
              init={{
                height: "65vh",
                images_file_types: "jpg,webp,png",
                file_picker_types: "image",
                automatic_uploads: false,
                images_upload_handler: (blobInfo, progress) =>
                  imageUploadHandler(blobInfo, progress, imgName),
                language: "uk",
                plugins,
                toolbar,
                menubar,
                skin: "oxide-dark",
                content_css: "tinymce-5-dark",
              }}
            />
          </div>
        </div>
      )}
      {!isDark && (
        <div>
          <Text style={{ fontWeight: 500, marginBottom: "5px" }}>{title}</Text>
          <div>
            <Editor
              disabled={disabled}
              ref={ref}
              onEditorChange={(value) => setMarkup(value)}
              onInit={(evt, editor) => {
                ref.current = editor;
              }}
              initialValue={saved || initialValue}
              apiKey={`${import.meta.env.VITE_TINYMCE_API_KEY}`}
              init={{
                height: "65vh",
                images_file_types: "jpg,webp,png",
                file_picker_types: "image",
                automatic_uploads: false,
                images_upload_handler: (blobInfo, progress) =>
                  imageUploadHandler(blobInfo, progress, imgName),
                language: "uk",
                plugins,
                toolbar,
                menubar,
                skin: "oxide",
                content_css: "default",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
});

export default TextEditor;
