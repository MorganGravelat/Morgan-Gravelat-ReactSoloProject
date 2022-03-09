// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BusinessBrowser from "./components/BusinessBrowser";
import "./index.css"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className = 'main-page-container-div'>
        <div className='main-page-navbar-div'>
            <Navigation isLoaded={isLoaded} />
        </div>
            {isLoaded && (
              <BusinessBrowser />
            )}
    </div>
  );
}

export default App;
