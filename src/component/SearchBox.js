import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

const SearchBox = ({ searchQuery, setSearchQuery, placeholder, field }) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get(field) || "");   // 검색어

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      setSearchQuery({ ...searchQuery, page: 1, [field]: event.target.value });   //searchQuery 업데이트
    }
  };
  return (
    <div className="search-box">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder={placeholder}
        onKeyPress={onCheckEnter}
        onChange={(event) => setKeyword(event.target.value)}
        value={keyword}
      />
    </div>
  );
};

export default SearchBox;
