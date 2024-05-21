import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AuthService from "../service/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUsersSuccess } from "../slice/auth";
import { getItem } from "../helpers/persistanceStore";

import ArticleDetail from "../pages/ArticleDetail";
import CreateArticles from "../pages/CreateArticles";
import EditArticle from "../pages/EditArticle";

function App() {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await AuthService.getUser();
      dispatch(signUsersSuccess(response.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      getUser();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "article/:slug",
          element: <ArticleDetail />,
        },
        {
          path: "create-articles",
          element: <CreateArticles />,
        },
        {
          path: "edit-article/:slug",
          element: <EditArticle />,
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
