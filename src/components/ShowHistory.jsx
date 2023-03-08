import React, { useState } from "react";
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
  return (
    <div className="History">
      <button onClick={() => setOpen(!open)} className="open-modal-btn">
        ✨ Открыть окно
      </button>
      <Modal open={open} setOpen={setOpen}>
        <img
          src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif"
          alt="mem"
        />
        <h3>Вери кул модал виндов</h3>
      </Modal>
    </div>
  );
};
