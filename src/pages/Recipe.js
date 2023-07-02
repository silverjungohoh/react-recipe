import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import MyButton from "../components/MyButton";
import { tasteList } from "../util/taste";

function Recipe() {
  const { id } = useParams();
  const recipeList = useContext(RecipeStateContext);
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState();

  useEffect(() => {
    if (recipeList.length >= 1) {
      const targetRecipe = recipeList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetRecipe) {
        setRecipe(targetRecipe);
      } else {
        window.alert("존재하지 않는 레시피입니다!");
        navigate("/", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, recipeList]);

  if (!recipe) {
    return "Loading...";
  } else {
    const curTaste = tasteList.find(
      (it) => parseInt(it.tasteId) === parseInt(recipe.taste)
    );

    return (
      <div className="recipe-page">
        <MyHeader
          leftChild={<MyButton text={"< 뒤로"} onClick={() => navigate(-1)} />}
          rightChild={
            <MyButton
              text={"수정"}
              type={"negative"}
              onClick={() => navigate(`/edit/${recipe.id}`)}
            />
          }
          headText={`${getStringDate(new Date(recipe.date))} 기록`}
        />
        <article>
          <section>
            <h4>Today's Taste</h4>
            <div className="recipe-img-wrapper">
              <img
                src={curTaste.tasteImg}
                alt={`taste-img-${curTaste.tasteId}`}
              />
              <div className="taste-desc">{curTaste.tasteDesc}</div>
            </div>
          </section>
          <section>
            <h4>Today's Baking</h4>
            <div className="recipe-title-wrapper">
              <p>{recipe.title}</p>
            </div>
          </section>
          <section>
            <h4>Today's Recipe</h4>
            <div className="recipe-content-wrapper">
              <p>{recipe.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default Recipe;
