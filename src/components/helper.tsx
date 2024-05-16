import React from "react";
import add from "../assets/icons_FEtask/add.svg";
import menu from "../assets/icons_FEtask/3 dot menu.svg";
import "./healper.css";
import { PriorityDataName, PriorityIcon, StatusIcon, UserIcon } from "./utils";
export const HeaderTitle = ({
  groupBy,
  value,
  userDetails,
}: {
  groupBy: string;
  value?: string;
  userDetails: any;
}) => {
  if (groupBy === "byStatus")
    return (
      <div className="col-header">
        <div style={{ display: "flex" }}>
          <StatusIcon
            status={
              value as "In progress" | "Todo" | "Backlog" | "done" | "cancel"
            }
          />
          <h2>{value}</h2>
        </div>
        <div style={{ display: "flex" }}>
          <img src={add} alt="add" />
          <img src={menu} alt="menu" style={{ marginLeft: "16px" }} />
        </div>
      </div>
    );

  if (groupBy === "byPriority")
    return (
      <div className="col-header">
        <div style={{ display: "flex" }}>
          <PriorityIcon
            priority={value as "0" | "1" | "4" | "3" | "2"}
            noBorder
          />
          <h2>{PriorityDataName[value as "0" | "1" | "4" | "3" | "2"]}</h2>
        </div>
        <div style={{ display: "flex" }}>
          <img src={add} alt="add" />
          <img src={menu} alt="menu" style={{ marginLeft: "16px" }} />
        </div>
      </div>
    );

  if (groupBy === "byUser")
    return (
      <div className="col-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <UserIcon userDetails={userDetails} />
          <h2>{userDetails?.name}</h2>
        </div>
        <div style={{ display: "flex" }}>
          <img src={add} alt="add" />
          <img src={menu} alt="menu" style={{ marginLeft: "16px" }} />
        </div>
      </div>
    );

  return <></>;
};
