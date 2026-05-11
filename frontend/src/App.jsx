import React, { useEffect, useState } from 'react';
import RootLayout from './Components/RootLayout';
import FundraisingPage from './Components/FundraisingPage';


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (currentPath === '/fundraising') {
    return <FundraisingPage />;
  }

  return (
    <RootLayout/>
  );
}

export default App;