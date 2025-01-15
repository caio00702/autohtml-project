import "./TitleCategory.css";

export const TitleCategory = ({ className, ...props }) => {
  return (
    <div className={"title-category " + className}>
      <div className="backgrond-title"></div>
      <div className="front-end">Front End </div>
    </div>
  );
};
