import { Form, Formik, Field } from "formik"
import { IAuth } from "../types"
import { useState } from "react"
import { authValidation } from "../validations/validations"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const initialValues: IAuth = {
    email: '',
    password: '',
    rememberMe: false,
  }

  const handleSubmit = (values: IAuth) => {
    console.log(values)
    if (values.rememberMe) {
      localStorage.setItem('auth', JSON.stringify(values))
    } else {
      localStorage.removeItem('auth')
    }
    if (values) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <img src='/assets/logo.png' alt="logo" className="h-[20rem]" />
      <div>
        <h1 className="text-3xl font-bold text-center mb-4">{isLogin ? 'Login' : 'Register'}</h1>
        <Formik initialValues={initialValues} validationSchema={authValidation} onSubmit={(values) => {
          handleSubmit(values)
        }} className="flex flex-col space-y-4">
          {({ errors, touched }) => (
            <Form className="flex flex-col space-y-4">
              <Field name="email">
                {({ field }: { field: any }) => (
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      {...field}
                    />
                    {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                  </div>
                )}
              </Field>
              <Field name="password">
                {({ field }: { field: any }) => (
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      {...field}
                    />
                    {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
                  </div>
                )}
              </Field>
              <Field name="rememberMe">
                {({ field }: { field: any }) => (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      {...field}
                    />
                    <label>Remember Me</label>
                  </div>
                )}
              </Field>
              <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-full">Submit</button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-10">
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          <button className="text-blue-500 ml-2" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth
