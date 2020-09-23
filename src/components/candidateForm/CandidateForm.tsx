import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useDispatch, connect } from "react-redux";
import * as Yup from 'yup';
import classes from "./CandidateForm.module.css";
import { addCandidate } from "../../store/actions/actions";
import { Link } from "react-router-dom";
import firebaseApp from './../../firebase';
import Axios from "axios";

interface Values {
    name: string,
    email: string,
    position: string,
    age: number,
    reasonToApply: string,
    status: string
}

const CandidateForm = ({history}: any) => {

    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                position: '',
                age: 0,
                reasonToApply: '',
                status: ''
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                position: Yup.string()
                    .required('Position is required'),
                age: Yup.number()
                    .required('Age is required'),
                reasonToApply: Yup.string()
                    .required('Reason is required')
            })}
            onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
            ) => {
                values.status = 'Pending';
                firebaseApp.database().ref().child('candidate').push(
                    values,
                    error => {
                        if (error) {
                            console.log('.... error', error);
                        }
                    }
                );
                Axios.post('http://localhost:5000/v1/text-mail',{
                        to: values.email,
                        name: values.name,
                }).then((response): any => {
                    alert(`Form Submitted successfully. Confirmation mail send to ${values.email}`);
                    dispatch(addCandidate(values));
                    history.push('/');
                }).catch(error => {
                    console.log(error);
                })
                
            }}
            render={({ errors, status, touched }) => (
                <div className={classes.candidateForm}>
                    <h4>Candidate Form</h4>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Name</label>
                            <Field
                                name="name"
                                type="text"
                                className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                name="email"
                                type="text"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <Field
                                name="age"
                                type="number"
                                className={'form-control' + (errors.age && touched.age ? ' is-invalid' : '')} />
                            <ErrorMessage name="age" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Position</label>
                            <Field
                                name="position"
                                component="select"
                                className={'form-control' + (errors.position && touched.position ? ' is-invalid' : '')}>
                                <option value="Position 1">Position 1</option>
                                <option value="Position 2">Position 2</option>
                                <option value="Position 3">Position 3</option>
                            </Field>
                            <ErrorMessage name="position" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reasonToApply">Reasons to apply</label>
                            <Field
                                name="reasonToApply"
                                component="textarea"
                                className={'form-control' + (errors.reasonToApply && touched.reasonToApply ? ' is-invalid' : '')} />
                            <ErrorMessage name="reasonToApply" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Register</button>
                        </div>
                        <Link to={"/home"} className={classes.btnRed}>Home</Link>
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

export default connect(mapStateToProps, null)(CandidateForm);
