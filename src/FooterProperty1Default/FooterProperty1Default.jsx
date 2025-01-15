import "./FooterProperty1Default.css";
import { LogoMain } from "../LogoMain/LogoMain.jsx";

export const FooterProperty1Default = ({
  property1 = "default",
  className,
  ...props
}) => {
  const variantsClassName = "property-1-" + property1;

  return (
    <div
      className={
        "footer-property-1-default " + className + " " + variantsClassName
      }
    >
      <LogoMain className="logo-main-instance"></LogoMain>
    </div>
  );
};
