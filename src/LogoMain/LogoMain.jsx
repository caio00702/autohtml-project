import "./LogoMain.css";

export const LogoMain = ({ className, ...props }) => {
  return (
    <div className={"logo-main " + className}>
      <img className="image-1" src="/images/logo.png" />
    </div>
  );
};
