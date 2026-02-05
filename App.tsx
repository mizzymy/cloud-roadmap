import React from 'react';
import { RoadmapProvider, useRoadmap } from './context/RoadmapContext';
import { RoadmapSelector } from './components/RoadmapSelector';
import { RoadmapWorkspace } from './components/RoadmapWorkspace';

const Main: React.FC = () => {
  const { activeRoadmapId, isLoading } = useRoadmap();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-aws-orange/30 border-t-aws-orange rounded-full animate-spin"></div>
      </div>
    );
  }

  // If no active roadmap is selected, show the Selector (Home Screen)
  if (!activeRoadmapId) {
    return <RoadmapSelector />;
  }

  // Otherwise, show the Workspace (Actual App)
  return <RoadmapWorkspace />;
};

const App: React.FC = () => {
  return (
    <RoadmapProvider>
      <Main />
    </RoadmapProvider>
  );
};

export default App;
