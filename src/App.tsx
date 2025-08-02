import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="container">
      <h1 className="header text-4xl font-bold mb-8">
        Welcome to My Portfolio
      </h1>
      
      <div className="content shadow-lg">
        <p className="mb-4">
          This is a sample component demonstrating the integration of:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            <span className="highlight">React</span> with TypeScript
          </li>
          <li className="mb-2">
            <span className="highlight">SCSS</span> with nesting and variables
          </li>
          <li className="mb-2">
            <span className="highlight">Tailwind CSS</span> for utility classes
          </li>
        </ul>
        <p className="text-sm text-gray-600">
          Start editing to see some magic happen!
        </p>
      </div>
    </div>
  );
}

export default App;
