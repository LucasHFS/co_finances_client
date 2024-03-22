import Head from "next/head";
import { Button, TextField } from "@mui/material";
import styles from "./Login.module.scss";
import { useFormik } from "formik";
import { useAuth } from "@/modules/auth";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";

export const LoginPage = () => {
  const { signIn, isLoading, errors } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      await signIn(values);
    },
  });

  return (
    <div className={styles.content}>
      <Head>
        <title>Co-Finance - Login</title>
      </Head>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
          <TextField
            label="Email"
            name="email"
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoFocus
            required
          />

          <TextField
            label="Senha"
            name="password"
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            minLength='6'
            required
          />

          <Button disabled={isLoading || formik.isSubmitting} variant="contained" type="submit">
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

        {errors && <ErrorMessage messages={errors} />}
      </form>
    </div>
  );
};
