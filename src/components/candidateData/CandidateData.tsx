import React, { useState, useEffect } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from "react-redux";
import classes from "./../hrLogin/HrLogin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import firebaseApp from '../../firebase';
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { CSVLink } from "react-csv";

const CandidateData = () => {
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [pagesCount, setPagesCount] = useState(0);
    const [candidates, setCandidates] = useState([]);
    const [candidatesToList, setCandidatesToList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (candidatesToList.length) {
            const count = Math.ceil(candidatesToList?.length / pageSize);
            setPagesCount(count);
        }

    }, [candidatesToList]);

    useEffect(() => {
        firebaseApp.database().ref().child('candidate').on('value',
            (snapshot: any) => {
                const candidateList: any = [];
                const allDbValues = snapshot.val();
                if (allDbValues) {
                    for (let key in allDbValues) {
                        const value = allDbValues[key];
                        value.id = key;
                        candidateList.push(value);
                    }
                }
                setCandidates(candidateList);
                setCandidatesToList(candidateList);
                setLoading(false);
            }
        )
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
        e.preventDefault();
        setCurrentPage(index);
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e;
        const filteredCandidate = candidates.filter((item: any) => {
            return (
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.email.toLowerCase().includes(value.toLowerCase()) ||
                item.position.toLowerCase().includes(value.toLowerCase()) ||
                item.status.toLowerCase().includes(value.toLowerCase())
            );
        });
        setCandidatesToList(filteredCandidate);
    }

    return (
        <>
            {
                loading ?
                    <>
                        <div className="h-100 row align-items-center1">
                            <section className="container reactSpinner">
                                <Spinner type="grow" size="lg" animation="grow" />
                                <Spinner type="grow" size="lg" animation="grow" />
                                <Spinner type="grow" size="lg" animation="grow" />
                            </section>
                        </div>
                    </> :
                    <>
                        <div className={classes.candidateForm}>
                            <h4>Candidate Data</h4>

                            <form className="form-inline my-2 my-lg-0 flex-row-reverse">
                                <span>
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm btn-sm ml-2">
                                            <CSVLink data={candidates}>
                                             <span className="badge badge-pill badge-secondary">Download</span>
                                            </CSVLink>
                                        </button>

                                </span>
                                <input
                                    className={`input-group-text ${classes.searchInput}`}
                                    onChange={onSearch}
                                    type="search"
                                    placeholder="Search" />
                            </form>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Position</th>
                                        <th>Reason to Apply</th>
                                        <th>Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (candidatesToList || [])
                                            .slice(
                                                currentPage * pageSize,
                                                (currentPage + 1) * pageSize
                                            ).map((candidate: any, index: number) => {
                                                return <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{candidate.name}</td>
                                                    <td>{candidate.email}</td>
                                                    <td>{candidate.position}</td>
                                                    <td>{candidate.reasonToApply}</td>
                                                    <td>{candidate.status}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className={`btn btn-secondary btn-sm text-white ${classes.candidateBtn}`}>
                                                            <Link
                                                                to={{
                                                                    pathname: "/candidate_edit_data",
                                                                    state: { candidate }
                                                                }}
                                                            >
                                                                Details <FontAwesomeIcon color="white" icon={faPencilAlt} />
                                                            </Link>
                                                        </button>
                                                    </td>
                                                </tr>
                                            })
                                    }

                                </tbody>
                            </Table>
                            <Pagination aria-label="Page navigation example">
                                <PaginationItem disabled={currentPage <= 0}>
                                    <PaginationLink
                                        onClick={e => handleClick(e, currentPage - 1)}
                                        previous
                                        href="#"
                                    />
                                </PaginationItem>
                                {[...Array(pagesCount)].map((page, i) =>
                                    <PaginationItem active={i === currentPage} key={i}>
                                        <PaginationLink onClick={e => handleClick(e, i)} href="#">
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}
                                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                                    <PaginationLink
                                        onClick={e => handleClick(e, currentPage + 1)}
                                        next
                                        href="#"
                                    />
                                </PaginationItem>
                            </Pagination>
                        </div>
                    </>
            }
        </>


    );
}


const mapStateToProps = (state: any) => {
    return {
        isSubscribed: state
    };
};

export default connect(mapStateToProps, null)(CandidateData);
