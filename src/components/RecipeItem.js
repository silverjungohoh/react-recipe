import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

function RecipeItem({ recipeItem }) {
  const navigate = useNavigate();

  return (
    <div className="recipe-item">
      <div className={`taste-img-wrapper taste-${recipeItem.taste}`}>
        <img
          src={process.env.PUBLIC_URL + `assets/taste${recipeItem.taste}.png`}
          alt={`taste-img-${recipeItem.taste}`}
          onClick={() => navigate(`/recipe/${recipeItem.id}`)}
        />
      </div>
      <div className="info-wrapper">
        <div className="recipe-date">
          {new Date(parseInt(recipeItem.date)).toLocaleDateString()}
        </div>
        <div className="recipe-content-title">{recipeItem.title}</div>
      </div>
      <div className="btn-wrapper">
        <MyButton
          text={"Edit"}
          onClick={() => navigate(`/edit/${recipeItem.id}`)}
        />
      </div>
    </div>
  );
}

export default RecipeItem;
