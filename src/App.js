import React, { useState } from "react";
import "./App.css";

function App() {
  const [movie, setMovie] = useState({
    title: "",
    rating: "",
    medium_cover_image: "",
  });
  let jsonMovie = JSON.stringify(movie);
  console.log(jsonMovie);

  let objectMovie = JSON.parse(jsonMovie);
  console.log(objectMovie); //다시 오브젝트로 만들때
  //json으로 보내기
  //1. 전개연산자
  //2. Computed property names 문법 -> [e.target.name] 너무좋다
  function inputHandle(e) {
    //console.log(e.target.value);
    setMovie({ ...movie, [e.target.name]: e.target.value });
    console.log(movie);
  }

  function submitMovie(e) {
    e.preventDefault(); //submit 되지마라
    fetch("http://10.100.102.2:8000/api/movie", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: jsonMovie,
    })
      .then((res) => res.text())

      .then((res) => {
        if (res === "ok") {
          alert("영화가 저장되었습니다");
        }
      });

    //fetch
  }
  function reset(e) {
    e.preventDefault();
    setMovie({
      title: "",
      rating: "",
      medium_cover_image: "",
    });
    console.log(movie);
  }

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={inputHandle}
          name="title"
          value={movie.title}
          placeholder="title를 입력하세요"
        ></input>
        <br />
        <input
          type="text"
          name="rating"
          value={movie.rating}
          onChange={inputHandle}
          placeholder="rating를 입력하세요"
        ></input>
        <br />
        <input
          type="text"
          onChange={inputHandle}
          name="medium_cover_image"
          value={movie.medium_cover_image}
          placeholder="medium_cover_image를 입력하세요"
        ></input>
        <br />
        <button onClick={submitMovie}>전송</button>
        <button onClick={reset}>리셋</button>
      </form>
    </div>
  );
}

export default App;
