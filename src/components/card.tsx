import React from "react";
import "./card.css";
import { StatusIcon, UserIcon, PriorityIcon } from "./utils";
const Card = ({
  id,
  title,
  tag,
  userDetails,
  status,
  priority,
  selectedFilter,
}: {
  id: string;
  title: string;
  tag: string[];
  userDetails: any;
  status?: any;
  priority: any;
  selectedFilter: {
    grouped: string;
    order: string;
  };
}) => {
  return (
    <div className="container">
      <div className="wrap-id-avtar">
        <p className="user-name">{id}</p>
        {selectedFilter.grouped !== "byUser" && (
          <UserIcon userDetails={userDetails} />
        )}
      </div>
      <div className="wrap-title-status" style={{ alignItems: "baseline" }}>
        {selectedFilter.grouped !== "byStatus" && (
          <StatusIcon status={status} />
        )}
        <p className="title">{title}</p>
      </div>
      <div className="wrap-title-status">
        {selectedFilter.grouped !== "byPriority" && (
          <PriorityIcon priority={priority} />
        )}
        <div className="title">
          {tag?.map((item, ind) => {
            return (
              <div key={ind} className="feature-box">
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Card;
