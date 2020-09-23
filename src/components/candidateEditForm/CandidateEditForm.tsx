import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { connect } from "react-redux";
import * as Yup from 'yup';
import classes from "./CandidateEditForm.module.css";
import firebaseApp from '../../firebase';

interface Values {
    name: string,
    email: string,
    position: string,
    reasonToApply: string,
    age: number,
    status: string
}

const CandidateEditForm = ({ location, history }: any) => {

    const { state: { candidate } } = location;

    const onDelete = (item: any) => {
        const { name, id } = item;
        if (window.confirm(`Are you sure to delete candidate ${name}`)) {
            firebaseApp.database().ref().child(`candidate/${id}`).remove(
                error => {
                    if (error) {
                        console.log('.... error', error);
                    }
                }
            )
            history.push('/');
        }
    }

    return (
        <Formik
            initialValues={{
                name: candidate.name,
                email: candidate.email,
                position: candidate.position,
                reasonToApply: candidate.reasonToApply,
                status: candidate.status,
                age: candidate.age
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                position: Yup.string()
                    .required('Position is required'),
                reasonToApply: Yup.string()
                    .required('Reason is required'),
                status: Yup.string()
                    .required('Status is required'),
                age: Yup.number()
                    .required('Age is required')
            })}
            onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
            ) => {
                firebaseApp.database().ref().child(`candidate/${candidate.id}`).set(
                    values,
                    error => {
                        if (error) {
                            console.log('.... error', error);
                        }
                    }
                );
                alert('Candidate Updated');

                history.replace('/candidate_data', null);
                // dispatch(addCandidate(values));
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
                                <option value="position1">Position 1</option>
                                <option value="position2">Position 2</option>
                                <option value="position3">Position 3</option>
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
                            <label htmlFor="email">Status</label>
                            <Field
                                name="status"
                                component="select"
                                className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')}>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary mr-2 p-r-2">Update</button>
                            <button
                                type="button"
                                className="btn btn-danger text-white"
                                onClick={() => onDelete(candidate)}>
                                Delete
                            </button>
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

export default connect(mapStateToProps, null)(CandidateEditForm);
