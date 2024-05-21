import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleService from "../service/article";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import Loader from "../shared/Loader";
import moment from "moment";

function ArticleDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { articleDetail, isLoading } = useSelector((state) => state.article);

  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart());
    try {
      const response = await ArticleService.getArticleDetail(slug);
      dispatch(getArticleDetailSuccess(response.article));
    } catch (error) {
      dispatch(getArticleDetailFailure(error.response.data.errors));
    }
  };

  useEffect(() => {
    getArticleDetail();
  }, [slug]);

  return isLoading ? (
    <Loader />
  ) : (
    articleDetail !== null && (
      <>
        {isLoading && <Loader />}
        <section className="bg-white">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
            <div className="bg-gray-50  border border-gray-200  rounded-lg p-8 md:p-12 mb-8">
              <a className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md  mb-2">
                {articleDetail.author.username}
              </a>
              <h1 className="text-gray-900  text-3xl md:text-5xl font-extrabold mb-2">
                {articleDetail.title}
              </h1>
              <p className="text-lg font-normal text-gray-500  mb-6">
                {articleDetail.body}
              </p>
              <a className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md  mb-2">
                <span className="font-bold mr-2">Created at:</span>
                {moment(articleDetail.createdAt).format("MMM Do YY")}
              </a>
            </div>
          </div>
        </section>
      </>
    )
  );
}

export default ArticleDetail;
