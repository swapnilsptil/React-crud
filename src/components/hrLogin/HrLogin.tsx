import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, connect } from "react-redux";
import { login } from "../../store/actions/actions";
import classes from "./HrLogin.module.css";
import firebaseApp from './../../firebase';

interface Values {
    username: string,
    password: string,
}

const HrLogin = ({ history }: any) => {
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',

            }}
            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .required('Username is required'),
                password: Yup.string()
                    .required('Password is required'),
            })}
            onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
            ) => {
                firebaseApp.auth().signInWithEmailAndPassword(values.username, values.password)
                    .then((user: any) => {
                        dispatch(login(user));
                        history.push('/')
                    }).catch(error => {
                        console.log('... error')
                    })
            }}
            render={({ errors, status, touched }) => (
                <div className={classes.candidateForm}>
                    <h4>HR Login</h4>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Username</label>
                            <Field
                                name="username"
                                type="text"
                                className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Password</label>
                            <Field
                                name="password"
                                type="password"
                                className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Login</button>
                        </div>
                    </Form>
                </div>
            )}
        />
    )
}

const mapStateToProps = (state: any) => {
    return {
        isSubscribed: state
    };
};

export default connect(mapStateToProps, null)(HrLogin);