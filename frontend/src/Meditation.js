// import React from 'react';

// function Meditation({ goHome }) {
//   return (
//     <div style={{ padding: '2rem' }}>
//       <button onClick={goHome}>Back</button>
//       <h2>Meditation</h2>
//       <p>This is where your meditation tools/videos/etc. will go.</p>
//     </div>
//   );
// }

// export default Meditation;

import React from 'react';
import Timer from './components/timer';
import BackButton from './components/BackButton';

function Meditation({ goHome }) {
  return (
    <div style={{ padding: '2rem' }}>
      <BackButton onClick={goHome} />
      {/* <h2>Meditation</h2>
      <p>This is where your meditation tools/videos/etc. will go.</p> */}
      <Timer />
    </div>
  );
}

export default Meditation;