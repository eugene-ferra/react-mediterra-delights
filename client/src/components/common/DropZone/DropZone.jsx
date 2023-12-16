import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./DropZone.module.scss";
import trash from "../../../assets/trash.svg";

const DropZone = ({ title, errorMessage, maxPhotos, name }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setError("Неправильний формат файлу. Підтримуються лише картинки!");
      } else if (files.length + acceptedFiles.length <= maxPhotos) {
        setFiles((prevFiles) =>
          prevFiles.concat(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        );
        setError(null);
      } else {
        setError(`Максимальна допустима кількість файлів - ${maxPhotos} !`);
      }
    },
  });

  const handleDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div>
      <p className={styles.inputTitle}>{title}</p>

      <div className={`${isFocused ? styles.dropZoneActive : styles.dropZone}`}>
        <div
          {...getRootProps({})}
          className={`${isDragActive ? styles.zoneActive : styles.zone}`}
        >
          <input {...getInputProps()} name={name} />
          <label
            htmlFor={name}
            className={isFocused ? styles.addBtnActive : styles.addBtn}
          >
            Оберіть файли
          </label>
          <p className={styles.inputText}>Оберіть або перетягніть файли</p>
        </div>
        <aside className={styles.previews}>
          {files.map((file, index) => (
            <div key={`${file.name}-${file.preview}`}>
              <div className={styles.previewImage}>
                <img
                  src={file.preview}
                  alt={`Preview ${index + 1}`}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(index)}
                >
                  <img src={trash} alt={`x`} />
                </button>
              </div>
            </div>
          ))}
        </aside>
      </div>
      {error && <p className={styles.inputError}>{error}</p>}
      <p className={styles.inputError}>{errorMessage}</p>
    </div>
  );
};

export default DropZone;
