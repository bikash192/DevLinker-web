import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from './utils/appStore'
import Feed from "./components/Feed";
import Home from "./components/Home";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";


const App = () => {
  return (
    <Provider store={appStore}>
        <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
        <Route index element={<Home />} /> 
        <Route path="/feed" element={<Feed/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path="/connections" element={<Connections/>}/>
          <Route path="/request" element={<Requests/>}/>
          <Route path='/premium' element={<Premium/>}/>
          <Route path="/chat/:targetUserId" element={<Chat/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    
  );
};

export default App;
