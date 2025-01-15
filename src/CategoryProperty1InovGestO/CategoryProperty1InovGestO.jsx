import "./CategoryProperty1InovGestO.css";
import { TitleCategory } from "../TitleCategory/TitleCategory.jsx";

export const CategoryProperty1InovGestO = ({
  property1 = "backend",
  className,
  ...props
}) => {
  const variantsClassName = "property-1-" + property1;

  return (
    <div
      className={
        "category-property-1-inov-gest-o " + className + " " + variantsClassName
      }
    >
      <TitleCategory className="category-instance"></TitleCategory>
    </div>
  );
};
