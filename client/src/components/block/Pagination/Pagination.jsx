import PrevIcon from "../../svg/PrevIcon";
import NextIcon from "../../svg/NextIcon";
import styles from "./Pagination.module.scss";

const Pagination = ({ totalCount, siblingCount = 2, currPage = 1, onLink }) => {
  let currentPage = +currPage;
  const pages = totalCount;
  const maxPagesToDisplay = siblingCount * 2 + 3;
  let pagination = [];

  if (currentPage > pages) currentPage = pages;
  if (currentPage < 1) currentPage = 1;

  if (pages <= maxPagesToDisplay) {
    pagination = Array.from({ length: pages }, (_, i) => {
      return { page: i + 1, link: i + 1 };
    });
  } else {
    const halfPages = Math.floor(maxPagesToDisplay / 2);
    const pagesBetween = Math.floor(maxPagesToDisplay / 2) - 2;

    if (currentPage - halfPages >= 1 && currentPage + halfPages <= pages) {
      const leftPages = Array.from({ length: pagesBetween }, (_, i) => {
        return { page: currentPage - i - 1, link: currentPage - i - 1 };
      }).reverse();

      const rightPages = Array.from({ length: pagesBetween }, (_, i) => {
        return { page: i + 1 + currentPage, link: i + 1 + currentPage };
      });

      pagination.push(
        { page: 1, link: 1 },
        { page: "...", link: leftPages[0].link - 1 },
        ...leftPages,
        { page: currentPage, link: currentPage },
        ...rightPages,
        { page: "...", link: rightPages[rightPages.length - 1].link + 1 },
        { page: pages, link: pages }
      );
    } else if (currentPage - halfPages < 1 && currentPage + halfPages <= pages) {
      const leftPages = Array.from({ length: currentPage }, (_, i) => {
        return { page: currentPage - i, link: currPage - i };
      }).reverse();

      const rightPages = Array.from(
        { length: maxPagesToDisplay - leftPages.length - 2 },
        (_, i) => {
          return { page: i + 1 + currentPage, link: i + 1 + currentPage };
        }
      );

      pagination.push(
        ...leftPages,
        ...rightPages,
        { page: "...", link: rightPages[rightPages.length - 1].link + 1 },
        { page: pages, link: pages }
      );
    } else if (currentPage - halfPages >= 1 && currentPage + halfPages >= pages) {
      const rightPages = Array.from({ length: pages - currentPage + 1 }, (_, i) => {
        return { page: i + currentPage, link: i + currentPage };
      });
      const leftPages = Array.from(
        { length: maxPagesToDisplay - rightPages.length - 2 },
        (_, i) => {
          return { page: currentPage - i - 1, link: currentPage - i - 1 };
        }
      ).reverse();

      pagination.push(
        { page: 1, link: 1 },
        { page: "...", link: leftPages[0].link - 1 },
        ...leftPages,
        ...rightPages
      );
    }
  }

  return (
    <div className={styles.pagination}>
      {totalCount > 1 ? (
        <>
          <button
            onClick={() => onLink({ page: currentPage - 1 })}
            key={"prev"}
            className={currentPage === 1 ? styles.buttonDisable : styles.button}
          >
            <PrevIcon />
          </button>

          <div className={styles.pages}>
            {pagination.map((item) => (
              <button
                onClick={() => onLink({ page: item.link })}
                key={item.link}
                className={item.page === currentPage ? styles.linkActive : styles.link}
              >
                {item.page}
              </button>
            ))}
          </div>
          <button
            onClick={() => onLink({ page: currentPage + 1 })}
            key={"next"}
            className={currentPage === totalCount ? styles.buttonDisable : styles.button}
          >
            <NextIcon />
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Pagination;
