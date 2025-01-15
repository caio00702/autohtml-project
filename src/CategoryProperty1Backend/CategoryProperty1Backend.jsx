import "./CategoryProperty1Backend.css";
import { TitleCategory } from "../TitleCategory/TitleCategory.jsx";

export const CategoryProperty1Backend = ({
  property1 = "backend",
  className,
  ...props
}) => {
  const variantsClassName = "property-1-" + property1;

  return (
    <div
      className={
        "category-property-1-backend " + className + " " + variantsClassName
      }
    >
      <TitleCategory className="category-instance"></TitleCategory>
    </div>
  );
};
