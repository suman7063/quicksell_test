import inProgress from "../assets/icons_FEtask/in-progress.svg";
import toDo from "../assets/icons_FEtask/To-do.svg";
import backLog from "../assets/icons_FEtask/Backlog.svg";
import high from "../assets/icons_FEtask/Img - High Priority.svg";
import medium from "../assets/icons_FEtask/Img - Medium Priority.svg";
import low from "../assets/icons_FEtask/Img - Low Priority.svg";
import done from "../assets/icons_FEtask/Done.svg";
import cancel from "../assets/icons_FEtask/Cancelled.svg";
import urgent from "../assets/icons_FEtask/SVG - Urgent Priority grey.svg";
import NoPriority from "../assets/icons_FEtask/No-priority.svg";

export const groupingOptions = [
  { value: "byStatus", label: "By Status" },
  { value: "byUser", label: "By User" },
  { value: "byPriority", label: "By Priority" },
];
export const orderingOptions = [
  { value: "priority", label: "Priority" },
  { value: "title", label: "Title" },
];
export const statusData = {
  "In progress": inProgress,
  Todo: toDo,
  Backlog: backLog,
  done: done,
  cancel: cancel,
};
type StatusKey = keyof typeof statusData;

export const StatusIcon = ({ status }: { status: StatusKey }) => {
  console.log("dsdsf", status, statusData[status]);
  const Icon = statusData[status];
  return Icon ? (
    <img src={Icon} alt={`${status} icon`} style={{ marginRight: "8px" }} />
  ) : null;
};

export const PriorityData = {
  "4": urgent,
  "3": high,
  "2": medium,
  "1": low,
  "0": NoPriority,
};
export const PriorityDataName = {
  "4": "Urgent",
  "3": "High",
  "2": "Medium",
  "1": "Low",
  "0": "No Priority",
};
type PriorityKey = keyof typeof PriorityData;
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

const getRandomColor = (letter: string) => {
  if (["A", "B", "C", "D", "E"].includes(letter)) return "#3A6EA5";
  if (["F", "G", "H", "I", "J"].includes(letter)) return "#F49AC2";
  if (["K", "L", "M", "N", "O"].includes(letter)) return "#88B04B";
  if (["P", "Q", "R", "S", "T"].includes(letter)) return "#FF6F61";
  if (["U", "V", "W", "X", "Y", "Z"].includes(letter)) return "#6B5B95";
};
export const UserIcon = ({ userDetails }: { userDetails: any }) => {
  const userName = userDetails?.name?.split(" ");
  console.log(userName, "userName");
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
