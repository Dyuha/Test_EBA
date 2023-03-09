import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';

// схема валидации формы
const validation = yup.object({
  text: yup.string().required("Required"),
});

export const Form = () => {

  let checked = [];
  //сабмит должен отправить текст на сервер, дождаться ответа и вставить его в поле ввода
  const submit = async (value) => {
    const resp = await axios.post('http://localhost:8888/index.php', value.text);
    console.log(resp.data);
    for (let i = 0; i < value.text.length; i++) {
      resp.data.includes(i) ? checked.push(`<b>${value.text[i]}</b>`) : checked.push(value.text[i])
    }

    // resp.data.map(pos => value.text.replace(value.text.at(pos), 
    //                                         `<b>${value.text.at(pos)}</b>`))

    // const checked = value.text.map((id, el) => {
    //   return (resp.data.includes(id) ? el.bold() : el);
    // })
    formik.setFieldValue('text', value.text);
    // console.log(value.text);
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
        <p>{checked.map(el=>el)}</p>
        <button type="submit">ПРОВЕРИТЬ</button>
      </div>
    </form>
  );
};
