import { forwardRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import api from "../../services/apiClient";
import Text from "../common/Text/Text";

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
  return (
    <div>
      <Text style={{ fontWeight: 500, marginBottom: "5px" }}>{title}</Text>
      <div>
        <Editor
          disabled={disabled}
          ref={ref}
          onInit={(evt, editor) => (ref.current = editor)}
          initialValue={initialValue}
          apiKey="vlac75sd0cbvwhdum4kibmzbu5nd31v9hnw2az9xxt8k37bb"
          init={{
            height: "65vh",
            images_file_types: "jpg,webp,png",
            file_picker_types: "image",
            automatic_uploads: false,
            images_upload_handler: (blobInfo, progress) =>
              imageUploadHandler(blobInfo, progress, imgName),
            language: "uk",
            plugins: [
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
            ],
            toolbar:
              "undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | forecolor backcolor | link image | preview fullscreen | ",
            menubar: "edit insert format",
          }}
        />
      </div>
    </div>
  );
});

export default TextEditor;
