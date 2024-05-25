import { useEffect, useState, useRef } from "react";
import Card from "./card";
import { HeaderTitle } from "./helper";
import CustomSelect from "./CustomSelect";
import {
  defaultPriorityData,
  defaultStatusData,
  groupingOptions,
  orderingOptions,
} from "./types";

import "./dashBoard.css";
import Display from "../../assets/icons_FEtask/Display.svg";
import down from "../../assets/icons_FEtask/down.svg";
interface Ticket {
  id: string;
  title: string;
  tag: string[];
  userDetails: {};
  userId: string;
  status: string;
  priority: number;
}
interface SelectedFilter {
  grouped: string;
  order: string;
}
interface ModifiedData {
  [key: string]: Ticket[];
}
const DashBoard = () => {
  const getInitialFilter = () => {
    const savedFilter = localStorage.getItem("selectedFilter");
    return savedFilter
      ? JSON.parse(savedFilter)
      : { grouped: "byStatus", order: "priority" };
  };

  const displayRef = useRef<any>(null);
  const [modifiedData, setModifiedData] = useState<ModifiedData>({});
  const [selectedFilter, setSelectedFilter] =
    useState<SelectedFilter>(getInitialFilter);
  const [display, setDisplay] = useState(false);
  const [list, setList] = useState<Ticket[]>([]);

  const handleSelect = (value: string, type: string) => {
    setSelectedFilter((prevFilter) => {
      const newFilter = { ...prevFilter, [type]: value };
      localStorage.setItem("selectedFilter", JSON.stringify(newFilter));
      return newFilter;
    });
  };

  //To close the box if clicked outside
  const handleClickOutside = (e: any) => {
    if (!displayRef?.current?.contains(e?.target)) {
      setDisplay(false);
    }
  };

  const fetchList = async () => {
    await fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((data) => data.json())
      .then((val) => {
        const tickets = val.tickets;
        const users = val.users;
        const ticketsWithUserDetails = tickets.map((ticket: any) => {
          const userDetails = users.find(
            (user: any) => user.id === ticket.userId
          );
          return { ...ticket, userDetails };
        });
        setList(ticketsWithUserDetails);
      });
  };
  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // To update the UI based on the selected values
  useEffect(() => {
    if (list.length < 0) {
      return;
    }
    let modifiedObject: ModifiedData = {};

    //Step -1 grouping
    if (selectedFilter.grouped === "byStatus") {
      modifiedObject = { ...defaultStatusData };
      list.forEach((item) => {
        modifiedObject[item.status] = [...modifiedObject[item.status], item];
      });
    } else if (selectedFilter.grouped === "byUser") {
      list.forEach((item) => {
        if (!modifiedObject[item.userId]) {
          modifiedObject[item.userId] = [item];
        } else {
          modifiedObject[item.userId] = [...modifiedObject[item.userId], item];
        }
      });
    } else if (selectedFilter.grouped === "byPriority") {
      modifiedObject = { ...defaultPriorityData };
      list.forEach((item) => {
        modifiedObject[item.priority] = [
          ...modifiedObject[item.priority],
          item,
        ];
      });
    }

    //Step-2 ordering
    Object.keys(modifiedObject).forEach((item) => {
      if (selectedFilter.order === "priority") {
        modifiedObject[item].sort((a: any, b: any) => b.priority - a.priority);
      }
      if (selectedFilter.order === "title") {
        modifiedObject[item].sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );
      }
    });

    setModifiedData(modifiedObject);
  }, [selectedFilter, list]);

  return (
    <>
      <header className="header">
        <div
          className="display"
          onClick={() => setDisplay(true)}
          ref={displayRef}
        >
          <div style={{ display: "flex" }}>
            <img src={Display} alt={Display} />
            Display
          </div>
          {display && (
            <div className="wrap-select-container">
              <div className="wrap-select" style={{ marginBottom: "16px" }}>
                Grouping
                <CustomSelect
                  options={groupingOptions}
                  onSelect={handleSelect}
                  type="grouped"
                  selectedFilter={selectedFilter}
                />
              </div>
              <div className="wrap-select">
                Ordering{" "}
                <CustomSelect
                  options={orderingOptions}
                  onSelect={handleSelect}
                  type="order"
                  selectedFilter={selectedFilter}
                />
              </div>
            </div>
          )}
          <img src={down} alt="down" />
        </div>
      </header>
      <section className="section">
        <div style={{ width: "auto", display: "flex" }}>
          {Object.keys(modifiedData).map((category, ind) => (
            <div className="status-column" key={ind}>
              <HeaderTitle
                groupBy={selectedFilter.grouped}
                userDetails={
                  selectedFilter.grouped === "byUser" &&
                  modifiedData[category]?.[0]?.userDetails
                }
                value={category}
              />
              {modifiedData[category].map((ticket: any) => (
                <Card
                  key={ticket.id}
                  id={ticket.id}
                  title={ticket.title}
                  tag={ticket.tag}
                  userDetails={ticket.userDetails}
                  status={ticket.status}
                  priority={ticket.priority}
                  selectedFilter={selectedFilter}
                />
              ))}
            </div>
            // <div key={ind}>
            //   <h2>{item}</h2>
            // </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default DashBoard;
