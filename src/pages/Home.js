import { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { RecipeStateContext } from "../App";
import RecipeList from "../components/RecipeList";

function Home() {
  const [curDate, setCurDate] = useState(new Date());
  const [recipe, setRecipe] = useState([]);

  const recipeList = useContext(RecipeStateContext);

  useEffect(() => {
    if (recipeList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setRecipe(
        recipeList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [recipeList, curDate]);

  function increaseMonth() {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  }

  function decreaseMonth() {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  }

  return (
    <div className="home">
      <MyHeader
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        headText={`${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <RecipeList recipeList={recipe} />
    </div>
  );
}

export default Home;
