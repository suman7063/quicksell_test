import "./helper.css";

import add from "../assets/icons_FEtask/add.svg";
import menu from "../assets/icons_FEtask/3 dot menu.svg";

import {
  PriorityData,
  PriorityDataName,
  PriorityKey,
  StatusKey,
  statusData,
} from "./types";

export const getRandomColor = (letter: string) => {
  if (["A", "B", "C", "D", "E"].includes(letter)) return "#3A6EA5";
  if (["F", "G", "H", "I", "J"].includes(letter)) return "#F49AC2";
  if (["K", "L", "M", "N", "O"].includes(letter)) return "#88B04B";
  if (["P", "Q", "R", "S", "T"].includes(letter)) return "#FF6F61";
  if (["U", "V", "W", "X", "Y", "Z"].includes(letter)) return "#6B5B95";
};

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

export const UserIcon = ({ userDetails }: { userDetails: any }) => {
  const userName = userDetails?.name?.split(" ");
  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "100%",
        display: "flex",
        alignItems: "center",
        fontSize: "12px",
        justifyContent: "center",
        color: "#fff",
        backgroundColor: getRandomColor(userName?.[0]?.[0]),
        position: "relative",
        textTransform: "uppercase",
        marginRight: "8px",
      }}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "100%",
          position: "absolute",
          left: "22px",
          top: "21px",
          backgroundColor: userDetails?.available ? "lightGreen" : "red",
        }}
      ></div>
      {userName?.[0]?.[0]}
      {userName?.[1]?.[0]}
    </div>
  );
};

export const StatusIcon = ({ status }: { status: StatusKey }) => {
  const Icon = statusData[status];
  return Icon ? (
    <img src={Icon} alt={`${status} icon`} style={{ marginRight: "8px" }} />
  ) : null;
};
export const PriorityIcon = ({
  priority,
  noBorder,
}: {
  priority: PriorityKey;
  noBorder?: boolean;
}) => {
  const Icon = PriorityData[priority];
  return Icon ? (
    <div
      style={{
        border: noBorder ? "" : "1px solid #8080809e",
        borderRadius: "8px",
        display: "grid",
        placeItems: "center",
        width: "40px",
        height: noBorder ? "unset" : "44px",
        marginRight: "8px",
      }}
    >
      <img src={Icon} alt={`${Icon} icon`} style={{ width: "19px" }} />{" "}
    </div>
  ) : null;
};
