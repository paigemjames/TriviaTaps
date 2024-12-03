import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import P_Navbar from "./components/P_Navbar";
import H_GameStats from "./components/H_GameStats";
import H_Leaderboard from "./components/H_Leaderboard";
import H_Login from "./components/H_LogIn";
import H_LogOut from "./components/H_LogOut";
import H_QuestionRelease from "./components/H_QuestionRelease";
import H_QuizCatagories from "./components/H_QuizCatagories";
import H_QuizEnd from "./components/H_QuizEnd"
import H_QuizSelection from "./components/H_QuizSelection";
import H_QuizStart from "./components/H_QuizStart";
import H_SignUp from "./components/H_SignUp";
import H_Winners from "./components/H_Winners";
import H_CreateQuiz from "./components/H_CreateQuiz";
import P_Leaderboard from "./components/P_Leaderboard";
import P_Login from "./components/P_Login";
import P_LogOut from "./components/P_LogOut";
import P_Profile from "./components/P_Profile";
import P_QuizCatagories from "./components/P_QuizCatagories";
import P_QuizQuestions from "./components/P_QuizQuestion";
import P_QuizSelection from "./components/P_QuizSelection";
import P_QuizStart from "./components/P_QuizStart";
import P_QuizSubmit from "./components/P_QuizSubmit";
import P_SignUp from "./components/P_SignUp";
import RoleSelection from "./components/RoleSelection";
import A_Login from "./components/A_Login";
import A_SignUp from "./components/A_SignUp";
// import A_QuizManagement from " ./components/A_QuizManagement";
//  import A_UserManage from "./components/A_UserManage";


import "./index.css";


const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />
  },
  {
    path: "/RoleSelection", 
    element: <RoleSelection />
  },
  {
    path: "/HostGameStats", 
    element: <H_GameStats/>
  },
  {
    path: "/HostLeaderboard", 
    element: <H_Leaderboard/>
  },
  {
    path: "/HostLogin", 
    element: <H_Login/>
  },
  {
    path: "/HostLogOut", 
    element: <H_LogOut/>
  },
  {
    path: "/HostQuestionRelease", 
    element: <H_QuestionRelease/>
  },
  {
    path: "/HostQuizCatagories", 
    element: <H_QuizCatagories/>
  },
  {
    path: "/HostQuizEnd", 
    element: <H_QuizEnd/>
  },
  {
    path: "/HostQuizSelection", 
    element: <H_QuizSelection/>
  },
  {
    path: "/HostQuizStart", 
    element: <H_QuizStart/>
  },
  {
    path: "/HostQuizStart/:id",
    element: <H_QuizStart/>
  },
  {
    path: "/HostSignUp", 
    element: <H_SignUp/>
  },
  {
    path: "/HostCreateQuiz",
    element: <H_CreateQuiz/>
  },
  {
    path: "/Winners", 
    element: <H_Winners/>
  },
  {
    path: "/ParticipantLeaderboard", 
    element: <P_Leaderboard/>
  },
  {
    path: "/ParticipantLogOut", 
    element: <P_LogOut/>
  },
  {
    path: "/ParticipantProfile", 
    element: <P_Profile/>
  },
  {
    path: "/ParticipantQuizCatagories", 
    element: <P_QuizCatagories/>
  },
  {
    path: "/ParticipantQuizQuestions", 
    element: <P_QuizQuestions/>
  },
  {
    path: "/ParticipantQuizSelection", 
    element: <P_QuizSelection/>
  },
  {
    path: "/ParticipantQuizStart", 
    element: <P_QuizStart/>
  },
  {
    path: "/ParticipantQuizSubmit", 
    element: <P_QuizSubmit/>
  },
  {
    path: "/ParticipantSignUp", 
    element: <P_SignUp/>
  },
  {
    path: "/ParticipantLogin", 
    element: <P_Login/>
  }, 
  {
    path: "/AdminLogin", 
    element: <A_Login/>
  },
  {
    path: "/AdminSignUp", 
    element: <A_SignUp/>
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
