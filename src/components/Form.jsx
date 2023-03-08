import { useFormik } from "formik";
import * as yup from "yup";

const validation = yup.object({
  text: yup.string().required("Required"),
});

export const Form = ({ submit }) => {

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: validation,
    onSubmit: (values) => formik.setFieldValue('text', 'privet matharfucker'),
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
