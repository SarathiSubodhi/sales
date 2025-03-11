import React from "react";
import VehicleListing from "./components/VehicleListing";

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header"></header>
      <main>
        <VehicleListing />
      </main>
      <footer className="app-footer">
        <p>© 2025 Vehicle Listing App</p>
      </footer>
    </div>
  );
};

export default App;
