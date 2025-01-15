import "./EditDeleteProperty1Front.css";

export const EditDeleteProperty1Front = ({
  property1 = "front",
  className,
  ...props
}) => {
  const variantsClassName = "property-1-" + property1;

  return (
    <div
      className={
        "edit-delete-property-1-front " + className + " " + variantsClassName
      }
    >
      <div className="rectangle-2"></div>
      <div className="frame-4">
        <div className="frame-1">
          <img className="vector" src="vector0.svg" />
          <div className="deletar">deletar </div>
        </div>
        <div className="frame-5">
          <img className="vector2" src="vector1.svg" />
          <div className="editar">Editar </div>
        </div>
      </div>
    </div>
  );
};
