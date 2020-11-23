import React from 'react';

import './App.scss';
import Calendar from './Calendar';

function App() {
    return (
      <div className="app">
          <h1>Welcome to Calendar App!</h1>
          <h3>Select one day of the month and add/edit your reminders!</h3>
          <div className='calendar-container'>
              <Calendar />
          </div>
      </div>
    );
}

export default App;
