import React, { useEffect, useState } from "react";
import Display from "../assets/icons_FEtask/Display.svg";
import down from "../assets/icons_FEtask/down.svg";
import Card from "./card";
import "./dashBoard.css";
import CustomSelect from "./CustomSelect";
import { groupingOptions, orderingOptions } from "./utils";
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
const DashBoard = () => {
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({
    grouped: "byStatus",
    order: "priority",
  });
  const [display, setDisplay] = useState(false);
  const [list, setList] = useState<Ticket[]>([]);
  const handleSelect = (value: string, type: string) => {
    setSelectedFilter((prevFilter) => ({
      ...prevFilter,
      [type]: value,
    }));
  };
  const fetchList = () => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
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
  return (
    <>
      <header className="header">
        <div className="display" onClick={() => setDisplay(!display)}>
          <div style={{ display: "flex" }}>
            <img src={Display} alt={Display} />
            Display
          </div>

          <img src={down} alt="down" />
        </div>
        {display && (
          <div className="wrap-select-container">
            <div className="wrap-select" style={{ marginBottom: "16px" }}>
              Grouping
              <CustomSelect
                options={groupingOptions}
                onSelect={handleSelect}
                type="grouped"
              />
            </div>
            <div className="wrap-select">
              Ordering{" "}
              <CustomSelect
                options={orderingOptions}
                onSelect={handleSelect}
                type="order"
              />
            </div>
          </div>
        )}
      </header>
      <section
        style={{ padding: "16px 2%", width: "100%", overflow: "scroll" }}
      >
        <div style={{ width: "auto", display: "flex" }}>
          {selectedFilter.grouped === "byStatus" && (
            <>
              {Object.keys(
                list.reduce((statuses, ticket) => {
                  // @ts-ignore
                  statuses[ticket.status] = true;
                  return statuses;
                }, {})
              ).map((status) => (
                <div className="status-column" key={status}>
                  <h2>{status}</h2>
                  {list
                    .filter((ticket) => ticket.status === status)
                    .map((ticket) => (
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
              ))}
            </>
          )}
          {selectedFilter.grouped === "byUser" && (
            <>
              {Object.keys(
                list.reduce((users, ticket) => {
                  // @ts-ignore
                  users[ticket.userId] = true;
                  return users;
                }, {})
              ).map((userId) => (
                <div className="status-column" key={userId}>
                  <h2>{userId}</h2>
                  {list
                    .filter((ticket) => ticket.userId === userId)
                    .map((ticket) => (
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
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
};
export default DashBoard;
