import React from 'react';

export default function Fic(props) {
  const fic = props.fic;
  return (
    <div>
      <p className={fic.status}>{fic.title}</p>
      <p>Words: {fic.currentWordcount}</p>
    </div>
  )


}
