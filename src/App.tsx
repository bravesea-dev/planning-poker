import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { PlanningPoker } from './components/PlanningPoker';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="size-full">
      {!isAuthenticated ? (
        <LandingPage onAuthenticated={handleAuthenticated} />
      ) : (
        <PlanningPoker />
      )}
    </div>
  );
}