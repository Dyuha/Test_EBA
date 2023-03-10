import React, { useState } from "react";
import axios from "axios";
import './history.scss'

const Modal = ({ open, setOpen, children }) => {
  return (
    <div className={`overlay animated ${open ? "show" : ""}`}>
      <div className="modal">
        <svg
          onClick={() => setOpen(!open)}
          height="200"
          viewBox="0 0 200 200"
          width="200"
        >
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
        {children}
      </div>
    </div>
  );
};

//кнопка, по нажатию летит запрос на историю проверок.
//всплывает мождальное окно со списком результатов проверок
export const ShowHistory = () => {
  const [open, setOpen] = useState(false);
  const [outputText, setOutputText] = useState([]);
  const [pos, setPos] = useState([]);
  
  const getHistory = async () => {
    setOpen(!open);
    const resp = await axios.get('http://localhost:8888/index.php');
    setOutputText(resp.data.map(el => el.text.split('')))
    console.log(resp.data);
    setPos(resp.data.map(el => el.position.split(',').map(pos => ( pos!=='' ? Number(pos) : -1))));
    // if (posArr) {
    //   for (let i=0; i<textArr.length; i++){
    //     setOutputText(marker(textArr[i], posArr[i]))
    //   }
    // }
    console.log(pos);
  }

  const marker = (arr, pos) => {
    if(pos){
      return arr.map( (val, id) => (
        pos.includes(id)
        ?  <b>{val}</b>
        :  <span>{val}</span>
      ))
    }
    return arr.map( val => <span>{val}</span> )
  }

  return (
    <div className="History">
      <button onClick={getHistory} className="open-modal-btn">
        ✨ ИСТОРИЯ
      </button>
      <Modal open={open} setOpen={setOpen}>
        <img
          src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif"
          alt="mem"
        />
        <h3>Вери кул модал виндов</h3>
        <div>
          {
            outputText.map( (arr, id) => <div>{marker(arr, pos[id])}</div>)
          }
        </div>
      </Modal>
    </div>
  );
};
