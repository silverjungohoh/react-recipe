import { useContext, useRef, useState } from "react";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import { useNavigate } from "react-router-dom";
import TasteItem from "./TasteItem";
import { RecipeDispatchContext } from "../App";

const tasteList = [
  {
    tasteId: 1,
    tasteImg: process.env.PUBLIC_URL + `/assets/taste1.png`,
    tasteDesc: "Worst",
  },
  {
    tasteId: 2,
    tasteImg: process.env.PUBLIC_URL + `/assets/taste2.png`,
    tasteDesc: "Bad",
  },
  {
    tasteId: 3,
    tasteImg: process.env.PUBLIC_URL + `/assets/taste3.png`,
    tasteDesc: "Normal",
  },
  {
    tasteId: 4,
    tasteImg: process.env.PUBLIC_URL + `/assets/taste4.png`,
    tasteDesc: "Good",
  },
  {
    tasteId: 5,
    tasteImg: process.env.PUBLIC_URL + `/assets/taste5.png`,
    tasteDesc: "Best",
  },
];

function getStringDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}

function RecipeEditor() {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [taste, setTaste] = useState(3);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleRef = useRef();
  const contentRef = useRef();

  const { onCreate } = useContext(RecipeDispatchContext);

  function handleClickTaste(taste) {
    setTaste(taste);
  }
  function handleSubmit(e) {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }

    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    const confirmed = window.confirm("레시피를 등록하시겠습니까?");
    if (confirmed) {
      onCreate(date, title, content, taste);
      window.alert("등록되었습니다!");
      navigate("/", { replace: true });
    }
  }

  return (
    <div className="recipe-editor">
      <div>
        <MyHeader
          headText={"새로운 레시피"}
          leftChild={<MyButton text={"< 뒤로"} onClick={() => navigate(-1)} />}
        />
      </div>
      <div>
        <section>
          <h4>Today is...?</h4>
          <div className="input-box">
            <input
              className="input-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>Today's Taste</h4>
          <div className="input-box taste-list-wrapper">
            {tasteList.map((it) => (
              <TasteItem
                key={it.tasteId}
                tasteItem={it}
                onClick={handleClickTaste}
                isSelected={it.tasteId === taste}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>Today's Baking</h4>
          <div className="input-box title-wrapper">
            <input
              placeholder="무엇을 만들었나요?"
              type="text"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>Today's Recipe</h4>
          <div className="input-box content-wrapper">
            <textarea
              placeholder="어떤 재료를 사용했나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control-box">
            <MyButton
              type={"negative"}
              text={"취소"}
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton type={"positive"} text={"등록"} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default RecipeEditor;
