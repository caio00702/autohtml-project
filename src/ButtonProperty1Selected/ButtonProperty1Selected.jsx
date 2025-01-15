import "./ButtonProperty1Selected.css";

export const ButtonProperty1Selected = ({
  property1 = "default",
  className,
  ...props
}) => {
  const variantsClassName = "property-1-" + property1;

  return (
    <div
      className={
        "button-property-1-selected " + className + " " + variantsClassName
      }
    >
      <div className="background"></div>
      <div className="content">selected </div>
    </div>
  );
};
