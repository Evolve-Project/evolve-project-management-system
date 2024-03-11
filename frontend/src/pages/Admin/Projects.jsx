import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle,CardFooter } from "@/components/ui/card";
import CircularProgressWithLabel from "@/components/ui/circularProgress";
import "@/styles/title.css";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Projects = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 2 items per row, so 4 items for 2 rows
  const [open, setOpen] = useState(false); // State for dialog
  const [selectedDescription, setSelectedDescription] = useState(""); // State for selected description
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/project_details"
        );
        setData(response.data.allTeamsNames);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="container">
        <div
          className="title"
          style={{ fontSize: "40px", marginBottom: "10px" }}
        >
          Projects
        </div>
      </div>
      <div className="flex flex-wrap justify-between ">
        {currentItems.map((item) => (
          <div key={item.id} className="w-1/2 px-5 py-3">
            {" "}
            {/* Adjusted width to 1/2 */}
            <Card className="h-[240px] shadow-lg">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {item.Project.name}
                  <CircularProgressWithLabel
                    value={50}
                    className="w-[30%] {classes.progress}"
                  />
                </CardTitle>
                <hr
                  className=" border-t-4 w-full"
                  style={{ borderColor: "#7B76F1" }}
                />
              </CardHeader>
              <CardContent className="text-sm h-20 ">
                <p>{item.Project.description}</p>
                {/* <p>{item.Project.git_repository_link}</p>
                <p>{item.Project.trello_board_link}</p> */}
              </CardContent>
              <CardFooter className="grid gap-4">
              <div className="grid grid-cols-2 gap-6 h-auto">
    <Button variant="outline"
      onClick={() =>
        window.open(item.Project.git_repository_link, "_blank")
      }
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
      </svg>
           GitHub
    </Button>
    <Button variant="outline"
      onClick={() =>
        window.open(item.Project.trello_board_link, "_blank")
      }
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trello" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
        <path d="M14.1 0H1.903C.852 0 .002.85 0 1.9v12.19A1.9 1.9 0 0 0 1.902 16h12.199A1.9 1.9 0 0 0 16 14.09V1.9A1.9 1.9 0 0 0 14.1 0M7 11.367a.636.636 0 0 1-.64.633H3.593a.633.633 0 0 1-.63-.633V3.583c0-.348.281-.631.63-.633zm6.052-3.5a.633.633 0 0 1-.64.633h-2.78A.636.636 0 0 1 9 7.867V3.583a.636.636 0 0 1 .633-.633h2.778c.35.002.631.285.631.633z"/>
      </svg>
     Trello
    </Button>
  </div>

</CardFooter>

            </Card>
  
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-2 my-4">
        <Button
          onClick={() => handleClick(currentPage > 1 ? currentPage - 1 : 1)}
          className={`${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i + 1)}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            {i + 1}
          </button>
        ))}
        <Button
          onClick={() =>
            handleClick(currentPage < totalPages ? currentPage + 1 : totalPages)
          }
          className={`${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Projects;
