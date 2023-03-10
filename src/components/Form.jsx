import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useState } from 'react';

// схема валидации формы
const validation = yup.object({
  text: yup.string().required("Required"),
});

export const Form = () => {
  const [outputText, setOutputText] = useState([]);
  const [submitCount, setSubmitCount] = useState(0);

  //сабмит должен отправить текст на сервер, дождаться ответа и вставить его в поле ввода
  const submit = async (value) => {
    const text = value.text;
    const resp = await axios.post('http://localhost:8888/index.php', text);
    resp.data ? setOutputText(marker(text.split(''), resp.data)) : setOutputText(text.split(''))
    setSubmitCount(1)
  }

  const marker = (arr, pos) => {
    return arr.map( (val, id) => (
      pos.includes(id)
      ?  <b>{val}</b>
      :  <span>{val}</span>
    ))
  }

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: validation,
    onSubmit: value => submit(value)
  });  

  const onBlurCustom = (e) => {
    if (submitCount > 0){
      formik.handleSubmit(e.target.value)
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <textarea
        id="text"
        name="text"
        type="textarea"
        onChange={formik.handleChange}
        onBlur={e => onBlurCustom(e)}
        value={formik.values.text}
        placeholder="Введите текст для проверки..."
        className="textarea"
      />
      {formik.touched.text && formik.errors.text ? formik.errors.text : null}
      <div>
        <div className="output">
          {
            outputText.map( el => {
              return <span key={el.id}>{el}</span>
            })
          }
        </div>
        <div>
          <button className="open-modal-btn" type="submit">ПРОВЕРИТЬ</button>
        </div>
      </div>
    </form>
  );
};
