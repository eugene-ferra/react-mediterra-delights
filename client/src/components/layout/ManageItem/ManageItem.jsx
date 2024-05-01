import Loader from "../../common/Loader/Loader";

import styles from "./ManageItem.module.scss";

const ManageItem = ({
  columns = [],
  rowsData = [],
  isLoading,
  isError,
  error,
  children,
  rowOnClick,
}) => {
  return (
    <>
      {isError && <div className={styles.wrapper}>{error}</div>}

      {isLoading && (
        <div className={styles.wrapper}>
          <Loader type={"global"} />
        </div>
      )}

      {!isError && !isLoading && rowsData && (
        <div className={styles.wrapper}>
          <table className={styles.table}>
            <thead className={styles.head}>
              <tr className={styles.row}>
                {columns.map((item) => (
                  <th key={item} className={styles.cell}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.body}>
              {rowsData.map((item, i) => {
                return (
                  <tr key={i} className={styles.row} onClick={() => rowOnClick(i)}>
                    {item.map((data, i) => {
                      return (
                        <td className={styles.cell} key={i}>
                          {data}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {children}
    </>
  );
};

export default ManageItem;
