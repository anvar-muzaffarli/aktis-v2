import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = Yup.object().shape({
  ad: Yup.string().required("Name is required"),
  epoct: Yup.string()
    .email("Email standarltara uygun deyil")
    .required("Email is required"),
  soyad: Yup.string().required("Surname is required"),
  shifre: Yup.string().required("Password is required"),
  finkod: Yup.string().required("Fincode is required"),
  telefon: Yup.string().required("Phone number is required"),
  ixtisasproqramlari: Yup.string().required("Siz hele de ixtisas secmemisiniz")

});

const Register = () => {


  const handleSubmit = async (values, {setSubmitting}) => {
    try {
      const cavab = await fetch("http://localhost:3200/api/signup", {
        method:"POST",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(values)
      })

      if(!cavab.ok) {
        const xetalarHaqqindaMelumatBackend = await cavab.json()
        throw new Error(xetalarHaqqindaMelumatBackend.message || "Qeydiyyatdan kecme ugursuz oldu")
      }

      toast.success("Qeydiyyatdan ugurla kecdiniz")




      

      // Bura geridonush edeceyik :)

     
    }

    

    catch(err) {

    }

    finally {

    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div style={{ width: "500px" }}>
        <h1 className="text-center mb-5">Register</h1>
        <Formik
          initialValues={{
            ad: "",
            epoct: "",
            soyad: "",
            shifre: "",
            finkod: "",
            telefon: "",
            ixtisasproqramlari: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >

            {({isSubmitting}) => (
                  <Form>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <Field type="text" name="ad" className="form-control" />
                      <ErrorMessage
                        name="ad"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="surname" className="form-label">
                        Surname
                      </label>
                      <Field type="text" name="soyad" className="form-control" />
                      <ErrorMessage
                        name="soyad"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
      
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field type="email" name="epoct" className="form-control" />
                    <ErrorMessage
                      name="epoct"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field type="password" name="shifre" className="form-control" />
                    <ErrorMessage
                      name="shifre"
                      component="div"
                      className="text-danger"
                    />
                  </div>
      
                  <div className="mb-3">
                    <label htmlFor="fincode" className="form-label">
                      Fincode
                    </label>
                    <Field type="text" name="finkod" className="form-control" />
                    <ErrorMessage
                      name="finkod"
                      component="div"
                      className="text-danger"
                    />
                  </div>
      
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <Field type="text" name="telefon" className="form-control" />
                    <ErrorMessage
                      name="telefon"
                      component="div"
                      className="text-danger"
                    />
                  </div>
      
                  <div className="mb-3">
                    <Field as="select" name="ixtisasproqramlari" className="form-control">
                      <option value="">İxtisas proqramı seçin</option>
                      <option value="fullstack-it">Fullstack IT</option>
                      <option value="fullstack-programming">
                        Fullstack Proqramlaşdırma
                      </option>
                      <option value="front-end">Front-End</option>
                      <option value="backend">Backend</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="english">İngilis dili</option>
                      <option value="graphic-design">Qrafik dizayn</option>
                      <option value="office-programs">Ofis proqramları</option>
                      <option value="data-analytics">Data Analitika</option>
                    </Field>
                    <ErrorMessage
                      name="ixtisasproqramlari"
                      component="div"
                      className="text-danger"
                    />
                  </div>
      
                  <div className="d-grid">
                    <button disabled={isSubmitting} type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </Form>
            ) }
        
        </Formik>
        <div className="mt-4 mb-4 text-center">
          <p>
            Already registered? <a href="/login">Daxil ol</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
