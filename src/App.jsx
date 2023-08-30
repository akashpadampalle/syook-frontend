import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css'

const socket = io('https://syook-listener.vercel.app:3000'); // Replace with your backend listener URL

function App() {

  const [data, setData] = useState([]);


  useEffect(() => {
    // Listen for the 'savedData' event from the backend
    socket.on('savedData', (newData) => {
      setData((prevData) => [newData, ...prevData]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Real-time Data Display</h1>
      <div>
        <h2>Received Data:</h2>
        <div className="card-container">
        {data.map(({ name, origin, destination }, index) => (
          <div className="card" key={index}>
            <h2 className='card-title'>{name}</h2>
            <p className='card-label'>origin: {origin}</p>
            <p className='card-label'>destination: {destination}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;
