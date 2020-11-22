import moment from 'moment';
import React from 'react';

import './App.scss';
import Calendar from './Calendar';

function App() {
    return (
      <div className="App">
          <h1>Welcome to Calendar App!</h1>
          <h3>Select one day of the month and add/edit your tasks!</h3>
          <div>Remenber that today is {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
          <div className='calendar-container'>
              <Calendar />
          </div>
      </div>
    );
}

export default App;