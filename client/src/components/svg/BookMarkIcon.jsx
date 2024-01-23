const BookMarkIcon = ({ full }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={full ? "#3B8AE4" : "none"}
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
      strokeWidth="1.2"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M15.75 5H8.25C7.55964 5 7 5.58763 7 6.3125V19L12 15.5L17 19V6.3125C17 5.58763 16.4404 5 15.75 5Z"
          stroke={full ? "var(--secondary-color)" : "#3B8AE4"}
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export default BookMarkIcon;
