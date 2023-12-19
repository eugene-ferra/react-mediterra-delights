import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./DropZone.module.scss";
import trash from "../../../assets/trash.svg";

const DropZone = ({ maxPhotos, title, errorMessage, name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange } }) => (
        <Drop
          title={title}
          errorMessage={errorMessage}
          maxPhotos={maxPhotos}
          onChange={onChange}
          name={name}
        />
      )}
      name={name}
      control={control}
    />
  );
};

const Drop = ({ title, errorMessage, maxPhotos, name, onChange }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setError(
          "Неправильний формат файлу. Підтримуються лише картинки формату .jpg та .png!"
        );
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
    [files, maxPhotos]
  );

  useEffect(() => {
    onChange(files);
  }, [files, onChange, maxPhotos]);

  const handleDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    onDrop: handleDrop,
  });

  return (
    <div>
      <p className={styles.inputTitle}>{title}</p>

      <div className={`${isFocused ? styles.dropZoneActive : styles.dropZone}`}>
        <div
          {...getRootProps({})}
          className={`${isDragActive ? styles.zoneActive : styles.zone}`}
        >
          <input {...getInputProps()} name={name} type="file" />
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
