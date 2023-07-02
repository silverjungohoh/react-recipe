import { useContext, useEffect, useRef, useState } from "react";
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

function RecipeEditor({ isEdit, origin }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [taste, setTaste] = useState(3);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleRef = useRef();
  const contentRef = useRef();

  const { onCreate, onEdit } = useContext(RecipeDispatchContext);

  function handleClickTaste(taste) {
    setTaste(taste);
  }
  function handleSubmit() {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }

    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    const confirmed = window.confirm(
      isEdit ? "레시피를 수정하시겠습니까?" : "레시피를 등록하시겠습니까?"
    );
    if (confirmed) {
      isEdit
        ? onEdit(origin.id, date, title, content, taste)
        : onCreate(date, title, content, taste);
      window.alert(isEdit ? "수정되었습니다!" : "등록되었습니다!");
      navigate("/", { replace: true });
    }
  }

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(origin.date))));
      setTaste(origin.taste);
      setTitle(origin.title);
      setContent(origin.content);
    }
  }, [isEdit, origin]);

  return (
    <div className="recipe-editor">
      <div>
        <MyHeader
          headText={isEdit ? "레시피 수정" : "레시피 등록"}
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
