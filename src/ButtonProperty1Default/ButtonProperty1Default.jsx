import "./ButtonProperty1Default.css";

export const ButtonProperty1Default = ({
  property1 = "default",
  className,
  ...props
}) => {
  const variantsClassName = "property-1-" + property1;

  return (
    <div
      className={
        "button-property-1-default " + className + " " + variantsClassName
      }
    >
      <div className="background"></div>
      <div className="content">button </div>
    </div>
  );
};
