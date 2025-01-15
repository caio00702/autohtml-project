import "./NavBarProperty1Home.css";
import { LogoMain } from "../LogoMain/LogoMain.jsx";
import { ButtonProperty1Selected } from "../ButtonProperty1Selected/ButtonProperty1Selected.jsx";
import { ButtonProperty1Default } from "../ButtonProperty1Default/ButtonProperty1Default.jsx";

export const NavBarProperty1Home = ({
  property1 = "home",
  className,
  ...props
}) => {
  const variantsClassName = "property-1-" + property1;

  return (
    <div
      className={
        "nav-bar-property-1-home " + className + " " + variantsClassName
      }
    >
      <LogoMain className="logo-main-instance"></LogoMain>
      <div className="frame-3">
        <ButtonProperty1Selected
          property1="selected"
          className="button-instance"
        ></ButtonProperty1Selected>
        <ButtonProperty1Default className="button-instance"></ButtonProperty1Default>
      </div>
    </div>
  );
};
