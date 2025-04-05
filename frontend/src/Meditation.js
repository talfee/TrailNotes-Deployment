import React from 'react';
import Timer from './components/timer';
import BackButton from './components/BackButton';
import backgroundImage from './images/Generated_Meditation.jpeg';

function Meditation({ goHome }) {
    const pageStyle = {
        padding: '2rem',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
      };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <button onClick={goHome}>Back</button>
//       {/* <h2>Meditation</h2>
//       <p>This is where your meditation tools/videos/etc. will go.</p> */}
//       <Timer />
//     </div>
//   );
return (
    <div style={pageStyle}>
      <BackButton onClick={goHome} />
      <Timer />
    </div>
  );
}

export default Meditation;