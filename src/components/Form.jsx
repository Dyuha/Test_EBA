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

  //сабмит должен отправить текст на сервер, дождаться ответа и вставить его в поле ввода
  const submit = async (value) => {
    const text = value.text;
    const resp = await axios.post('http://localhost:8888/index.php', text);
    console.log(resp.data);
    setOutputText(marker(text.split(''), resp.data));
    formik.setFieldValue('text', value.text);
  }

  const marker = (arr, pos) => {
    let output = arr.map( (val, id) => {
      if (pos.includes(id)){
        return <b>{val}</b>
      } else {
        return <span>{val}</span>
      }
    })
    return output;
  }

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: validation,
    onSubmit: value => submit(value)
  });

  

  return (
    <form onSubmit={formik.handleSubmit}>
      <textarea
        id="text"
        name="text"
        type="textarea"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.text}
        placeholder="Введите текст для проверки..."
      />
      {formik.touched.text && formik.errors.text ? formik.errors.text : null}
      <div>
        {
          outputText.map( el => {
            return <span key={el.id}>{el}</span>
          })
        
        }
        <div>
          <button type="submit">ПРОВЕРИТЬ</button>
        </div>
      </div>
    </form>
  );
};
