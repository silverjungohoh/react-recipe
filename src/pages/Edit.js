import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeStateContext } from "../App";
import RecipeEditor from "../components/RecipeEditor";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [origin, setOrigin] = useState();
  const recipeList = useContext(RecipeStateContext);

  useEffect(() => {
    if (recipeList.length >= 1) {
      const targetRecipe = recipeList.find(
        (it) => parseInt(id) === parseInt(it.id)
      );

      if (targetRecipe) {
        setOrigin(targetRecipe);
      } else {
        window.alert("존재하지 않는 레시피입니다!");
        navigate("/", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, recipeList]);

  return <div>{origin && <RecipeEditor isEdit={true} origin={origin} />}</div>;
}

export default Edit;
