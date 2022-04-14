import React, { useState } from "react";
import { RepositoriesData } from "./interface";
import Pagination from "./Pgination";
import "./App.css";

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages] = useState(10);
  const [reposData, setReposData] = useState<RepositoriesData[]>([]);

  const handlePrevPage = (prevPage: number) => {
    setPage((prevPage) => prevPage - 1);
    fetchData();
  };

  const handleNextPage = (nextPage: number) => {
    setPage((nextPage) => nextPage + 1);
    fetchData();
  };

  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  const fetchData = async () => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchInput}&page=${page}&per_page=5&sparkline=false`
    );
    const result = await response.json();
    setReposData(result.items);
    if (page === 1) {
      setPage(2);
    }
  };

  let paginationBar;
  if (reposData !== undefined && reposData.length === 0) {
    paginationBar = (
      <div className="alert" role="alert">
        No results available. Please Search
      </div>
    );
  } else {
    paginationBar = (
      <div className="pagination">
        <Pagination
          totalPages={totalPages}
          currentPage={page - 1}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </div>
    );
  }

  return (
    <>
      <div className="repo-header">
        <h1 className="header-h1">Search Github Repositories</h1>
        <div>
          <input
            type="text"
            placeholder="SearchBar"
            value={searchInput}
            onChange={handleChange}
          ></input>
          <button className="button3" onClick={fetchData}>
            Search
          </button>
        </div>
      </div>
      {reposData.map((repo) => {
        return (
          <div className="border" id={repo.id} key={repo.id}>
            <div className="margin">
              <div className="">
                <div className="">
                  <a className="href" href={repo.html_url}>
                    {repo.full_name}
                  </a>
                </div>
              </div>
              <p className="desc-margin">{repo.description}</p>
              <div>
                <div className="d-flex flex-wrap text-small color-fg-muted">
                  <div className="mr-3">
                    <span className="">
                      <span className="repo-language-color"></span>
                      <span className="programmingLanguage">
                        Language : {repo.language}
                      </span>
                    </span>
                  </div>
                  <div className="mr-3">
                    Updated <span>{repo.updated_at}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {paginationBar}
    </>
  );
};

export default App;
