import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ArticleCards({ data, deleteArticle }) {
  const { loggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="w-96 h-[350px]  bg-white border border-gray-200 rounded-lg shadow ">
      <div className="h-[150px] bg-gray-500"></div>
      <div className="p-5 h-[200px] flex flex-col justify-between  ">
        <div>
          <a>
            <h5 className="mb-2 text-2xl font-bold tracking-tight line-clamp-1 text-gray-900">
              {data.title}
            </h5>
          </a>
          <p className="mb-3  font-normal line-clamp-2  ">{data.description}</p>
        </div>

        <div className="flex justify-between   items-center ">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => navigate(`/article/${data.slug}`)}
              type="button"
              className="px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg  hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
            >
              View
            </button>
            {loggedIn && user.username === data.author.username && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={() => navigate(`/edit-article/${data.slug}`)}
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                >
                  Edite
                </button>
                <button
                  onClick={() => deleteArticle(data.slug)}
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-red-500 bg-transparent border border-red-500 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                >
                  Delete
                </button>
              </>
            )}
          </div>

          <span className="capitalize">{data.author.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ArticleCards;
