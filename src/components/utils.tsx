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
  inProgress: inProgress,
  Todo: toDo,
  Backlog: backLog,
  done: done,
  cancel: cancel,
};
type StatusKey = keyof typeof statusData;

export const StatusIcon = ({ status }: { status: StatusKey }) => {
  const Icon = statusData[status];
  return Icon ? (
    <img src={Icon} alt={`${status} icon`} style={{ marginRight: "8px" }} />
  ) : null;
};

export const PriorityData = {
  4: urgent,
  3: high,
  2: medium,
  1: low,
  0: NoPriority,
};
type PriorityKey = keyof typeof PriorityData;
export const PriorityIcon = ({ priority }: { priority: PriorityKey }) => {
  const Icon = PriorityData[priority];
  return Icon ? (
    <div
      style={{
        border: "1px solid #8080809e",
        borderRadius: "8px",
        display: "grid",
        placeItems: "center",
        width: "40px",
        height: "44px",
        marginRight: "8px",
      }}
    >
      <img src={Icon} alt={`${Icon} icon`} style={{ width: "24px" }} />{" "}
    </div>
  ) : null;
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export const UserIcon = ({ userDetails }: { userDetails: any }) => {
  const user_img = userDetails.id.split("-");
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
        backgroundColor: getRandomColor(),
        position: "relative",
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
          backgroundColor: userDetails?.available ? "green" : "grey",
        }}
      ></div>
      U_{user_img[1]}
    </div>
  );
};
