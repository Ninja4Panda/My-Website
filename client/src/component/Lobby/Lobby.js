import React from 'react';
import './Lobby.css';

export default function Lobby({io, roomid}) {

  return (
    <div className="container">
      <div className="left">
        <div className="box">
          <div className="fakeimg" style={{height:"160px", width:"160px"}}>Image</div>
          <div className="fakeimg" style={{height:"160px", width:"160px"}}>Image</div>
          <div className="fakeimg" style={{height:"160px", width:"160px"}}>Image</div>
          <div className="fakeimg" style={{height:"160px", width:"160px"}}>Image</div>

          <div className="fakeimg" style={{height:"160px", width:"160px"}}>Image</div>
          <div className="fakeimg" style={{height:"160px", width:"160px"}}>Image</div>
          <div className="fakeimg" style={{height:"160px", width:"160px"}}>Image</div>
          <div className="fakeimg" style={{height:"160px", width:"160px"}}>Image</div>
        </div>
      </div>
      <div className="right">
        <p>Room id: {roomid}</p>
        <input className="button" type="submit" value="Start Game"/>
      </div>
    </div>
  );
}
