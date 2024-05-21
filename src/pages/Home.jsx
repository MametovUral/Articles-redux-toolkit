import { useDispatch, useSelector } from "react-redux";
import ArticleCards from "../shared/ArticleCards";
import Loader from "../shared/Loader";
import {
  getArticlesFailure,
  getArticlesStart,
  getArticlesSuccess,
} from "../slice/article";
import { useEffect } from "react";
import ArticleService from "../service/article";

function Home() {
  const { articles, isLoading } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  const getArticles = async () => {
    dispatch(getArticlesStart());
    try {
      const response = await ArticleService.getArticles();
      dispatch(getArticlesSuccess(response.articles));
    } catch (error) {
      dispatch(getArticlesFailure(error.response.data.error));
    }
  };

  const deleteArticle = async (slug) => {
    try {
      await ArticleService.deleteArticle(slug);
      getArticles();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex justify-center flex-wrap gap-5">
        {articles.map((item) => (
          <ArticleCards
            key={item.id}
            data={item}
            deleteArticle={deleteArticle}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
