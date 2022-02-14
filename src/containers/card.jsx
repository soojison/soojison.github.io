import React from "react";
import { NavLink } from "react-router-dom";

// TODO: styled components
const Card = ({ name, desc, photo, link }) => {
  const image = photo?.fields?.file?.url;
  return (
    <NavLink
      to={link}
      style={{
        backgroundImage: `url("${image}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="entryContainer"
    >
      <div className="entry">{name}</div>
    </NavLink>
  );
};

export default Card;
