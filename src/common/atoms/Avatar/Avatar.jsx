/**
 * size: sm, md and lg
 */

export const Avatar = ({ size = "sm", imgURL = null }) => {
  return (
    <span className={`${size}-avatar round fit-image`}>
      <img
        src={
          imgURL
            ? imgURL
            : "https://images.unsplash.com/photo-1602870049368-9c8265ff3693?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
        }
        className={`img-fit round ${size}-avatar`}
        alt=""
      />
    </span>
  );
};
