import "./VideoCard.css";

export const VideoCard = ({ className, ...props }) => {
  return (
    <div className={"video-card " + className}>
      <img className="image-7" src={props.thumbnail} />
    </div>
  );
};
