import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";
import trash from "../../../assets/trash.svg";
import Title from "../Title/Title";
import Text from "../Text/Text";
import styles from "./DropZone.module.scss";

const DropZone = ({
  maxPhotos,
  title,
  errorMessage,
  name,
  disabled,
  initialFiles = [],
}) => {
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
          disabled={disabled}
          initialFiles={initialFiles}
        />
      )}
      name={name}
      control={control}
    />
  );
};

const Drop = ({
  title,
  errorMessage,
  maxPhotos,
  name,
  onChange,
  disabled,
  initialFiles,
}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

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
    disabled: disabled,
    onDrop: handleDrop,
  });

  return (
    <div>
      {title && <Title type={"input"}>{title}</Title>}

      <div
        className={`${
          disabled
            ? styles.dropZoneDisabled
            : isFocused
            ? styles.dropZoneActive
            : styles.dropZone
        }`}
      >
        <div
          {...getRootProps({})}
          className={`${
            disabled
              ? styles.zoneDisabled
              : isDragActive
              ? styles.zoneActive
              : styles.zone
          }`}
        >
          <input {...getInputProps()} name={name} type="file" />
          <label
            htmlFor={name}
            className={
              disabled
                ? styles.addBtnDisabled
                : isFocused
                ? styles.addBtnActive
                : styles.addBtn
            }
          >
            Оберіть файли
          </label>
          <p className={styles.inputText}>Оберіть або перетягніть файли</p>
        </div>
        <aside className={styles.previews}>
          {files.length === 0
            ? null
            : files.map((file, index) => (
                <div key={`${file?.name}-${file?.preview}`}>
                  <div className={styles.previewImage}>
                    <img
                      src={file?.preview}
                      alt={`Preview ${index + 1}`}
                      onLoad={() => {
                        URL.revokeObjectURL(file?.preview);
                      }}
                    />
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(index)}
                      disabled={disabled}
                    >
                      <img src={trash} alt={`x`} />
                    </button>
                  </div>
                </div>
              ))}
        </aside>
      </div>
      {error && <Text type={"error"}>{errorMessage}</Text>}
      {errorMessage && <Text type={"error"}>{errorMessage}</Text>}
    </div>
  );
};

export default DropZone;
