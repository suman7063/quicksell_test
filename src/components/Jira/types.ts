import inProgress from "../../assets/icons_FEtask/in-progress.svg";
import toDo from "../../assets/icons_FEtask/To-do.svg";
import backLog from "../../assets/icons_FEtask/Backlog.svg";
import high from "../../assets/icons_FEtask/Img - High Priority.svg";
import medium from "../../assets/icons_FEtask/Img - Medium Priority.svg";
import low from "../../assets/icons_FEtask/Img - Low Priority.svg";
import done from "../../assets/icons_FEtask/Done.svg";
import cancel from "../../assets/icons_FEtask/Cancelled.svg";
import urgent from "../../assets/icons_FEtask/SVG - Urgent Priority grey.svg";
import NoPriority from "../../assets/icons_FEtask/No-priority.svg";

export const defaultStatusData={
    "In progress": [],
    "Todo": [],
    "Backlog": [],
    "done": [],
    "cancel": [],
}

export const defaultPriorityData={
    "0": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
}

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
  export type StatusKey = keyof typeof statusData;
  
  
  
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
  export type PriorityKey = keyof typeof PriorityData;