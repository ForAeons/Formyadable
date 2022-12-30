import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import PostFC from "./PostFC";
import { Post } from "../../../types/type";
import { BACKEND_URL } from "../../../utility/helper";
import "../../../App.css";

interface OutletContext {
  jwtToken: string;
  setAlertMessage: (errMsg: string) => void;
  setDisplay: (display: boolean) => void;
}

const Home: React.FC = () => {
  const { jwtToken, setAlertMessage, setDisplay } =
    useOutletContext() as OutletContext;
  const [page, setPage] = useState(1);
  const [postArr, setPostArr] = useState<Post[]>([]);

  let postsArr: Post[] = [];
  useEffect(() => {
    if (!jwtToken) return;

    fetch(`${BACKEND_URL}posts/latest/${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data: Post[] | Error) => {
        if (data instanceof Error) throw new Error(data.message);
        else {
          setPostArr(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setAlertMessage(err.message);
        setDisplay(true);
      });
  }, [page, jwtToken, setAlertMessage, setDisplay]);
  return (
    <div>
      {!jwtToken ? (
        <h1>Please login</h1>
      ) : (
        <div>
          <div>Search bar</div>
          <ul>
            {postArr.map((post) => (
              <li key={post.id}>
                <PostFC post={post} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
