import React, { useEffect, useState } from "react";
import ArticleForma from "../shared/ArticleForma";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import ArticleService from "../service/article";

function EditArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticleDetail(slug);
        setTitle(response.article.title);
        setDescription(response.article.description);
        setBody(response.article.body);
        dispatch(getArticleDetailSuccess());
      } catch (error) {
        dispatch(getArticleDetailFailure(error.response.data.errors));
      }
    };
    getArticleDetail();
  }, []);

  async function formSubmit(e) {
    e.preventDefault();
    const article = {
      title,
      description,
      body,
    };
    dispatch(postArticleStart());
    try {
      await ArticleService.editArticle(slug, article);
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
      <h2 className="uppercase text-center text-xl font-bold">edit article</h2>
      <ArticleForma {...formProps} />
    </>
  );
}

export default EditArticle;
