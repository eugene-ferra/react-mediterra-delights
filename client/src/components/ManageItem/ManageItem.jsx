import styles from "./ManageItem.module.scss";

const ManageItem = ({ columns = [], rowsData = [] }) => {
  return (
    <div className={styles.box}>
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
              <tr key={i} className={styles.row}>
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
  );
};

export default ManageItem;
