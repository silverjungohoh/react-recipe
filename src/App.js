import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Recipe from "./pages/Recipe";
import React, { useEffect, useReducer, useRef } from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("recipe", JSON.stringify(newState));
  return newState;
};

export const RecipeStateContext = React.createContext();
export const RecipeDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem("recipe");
    if (localData) {
      const recipeList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(recipeList[0].id) + 1;
      dispatch({ type: "INIT", data: recipeList });
    }
  }, []);

  // create
  const onCreate = (date, title, content, taste) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        title,
        content,
        taste,
      },
    });
    dataId.current += 1;
  };

  // remove
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };

  // edit
  const onEdit = (targetId, date, title, content, taste) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        title,
        content,
        taste,
      },
    });
  };

  return (
    <RecipeStateContext.Provider value={data}>
      <RecipeDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RecipeDispatchContext.Provider>
    </RecipeStateContext.Provider>
  );
}

export default App;
