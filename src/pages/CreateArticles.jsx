import { useState } from "react";
import ArticleForma from "../shared/ArticleForma";
import ArticleService from "../service/article";
import { useDispatch } from "react-redux";
import {
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import { useNavigate } from "react-router-dom";

function CreateArticles() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function formSubmit(e) {
    e.preventDefault();
    const article = {
      title,
      description,
      body,
    };
    dispatch(postArticleStart());
    try {
      await ArticleService.postArticle(article);
      dispatch(postArticleSuccess());
      navigate("/");
    } catch (error) {
      dispatch(postArticleFailure(error.response.data.errors));
    }
  }

  const formProps = {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    formSubmit,
  };

  return (
    <>
      <h2 className="uppercase text-center text-xl font-bold">
        create article
      </h2>

      <ArticleForma {...formProps} />
    </>
  );
}

export default CreateArticles;
