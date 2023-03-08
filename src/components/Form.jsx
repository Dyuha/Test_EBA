import { useFormik } from "formik";
import * as yup from "yup";

// схема валидации формы
const validation = yup.object({
  text: yup.string().required("Required"),
});

export const Form = () => {

  //сабмит должен отправить текст на сервер, дождаться ответа и вставить его в поле ввода
  const submit = (value) => {
    console.log(value.text);
    return formik.setFieldValue('text', 'privet matharfucker')
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
        <button type="submit">ПРОВЕРИТЬ</button>
      </div>
    </form>
  );
};
