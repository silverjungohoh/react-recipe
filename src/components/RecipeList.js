import { useState } from "react";
import RecipeItem from "./RecipeItem";
import ControllMenu from "./ControllMenu";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const sortOptionList = [
  {
    value: "latest",
    name: "최신순",
  },
  {
    value: "oldest",
    name: "오래된 순",
  },
];

const filterOptionList = [
  {
    value: "all",
    name: "모든 레시피",
  },
  {
    value: "success",
    name: "성공한 레시피",
  },
  {
    value: "fail",
    name: "실패한 레시피",
  },
];

function RecipeList({ recipeList }) {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  function getProcessedRecipeList() {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copy = JSON.parse(JSON.stringify(recipeList));
    const filteredList =
      filter === "all"
        ? copy
        : filter === "success"
        ? copy.filter((it) => parseInt(it.taste) >= 3)
        : copy.filter((it) => parseInt(it.taste) < 3);

    const sortedList = filteredList.sort(compare);
    return sortedList;
  }

  return (
    <div className="recipe-list">
      <div className="menu-wrapper">
        <div className="left-col">
          <ControllMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControllMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right-col">
          <MyButton
            type={"positive"}
            text={"레시피 등록 +"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedRecipeList().map((it) => (
        <RecipeItem recipeItem={it} key={it.id} />
      ))}
    </div>
  );
}

RecipeList.defaultProps = {
  recipeList: [],
};

export default RecipeList;
