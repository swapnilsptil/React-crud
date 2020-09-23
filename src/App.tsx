import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { login } from "./store/actions/actions";
import firebaseApp from './firebase';
import { Spinner } from "reactstrap";
import Home from './components/home/Home';
import Notes from './components/Notes/Note';
import HrLogin from './components/hrLogin/HrLogin';
import CandidateForm from './components/candidateForm/CandidateForm';
import CandidateEditForm from './components/candidateEditForm/CandidateEditForm';
import CandidateData from './components/candidateData/CandidateData';
import './App.css';

function App({ history }: any) {

	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);
	const [user, setUser] = useState([]);

	useEffect(() => {
		firebaseApp.auth().onAuthStateChanged((userRes: any) => {
			if (userRes) {
				dispatch(login(userRes));
				setUser(userRes);
				setLoaded(true);
			} else {
				setLoaded(true);
				setUser([]);
				history.push('/');
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const onLogout = () => {
		firebaseApp.auth().signOut();
	}
	let routes;
	const isAuthenticatedUser = Object.values(user).length > 0;
	if (isAuthenticatedUser) {
		routes = (
			<Switch>
				<Route path="/candidate_data" component={CandidateData} />
				<Route path="/candidate_edit_data" component={CandidateEditForm} />
				<Route path="/candidate_form" component={CandidateForm} />
				<Route path="/hr_login" component={HrLogin} />
				<Redirect to="/candidate_data" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/notes" component={Notes} />
				<Route path="/candidate_form" component={CandidateForm} />
				<Route path="/candidate_edit_data" component={CandidateEditForm} />
				<Route path="/hr_login" component={HrLogin} />
				<Route path="/home" component={Home} />
				<Redirect to="/home" />
			</Switch>
		);
	}

	return (
		<>
			{
				loaded ?
					<div className="h-100 row align-items-center1">
						<section className={`container`}>
							<nav className="navbar navbar-expand-lg navbar-light custom-nav">
								<div className="collapse navbar-collapse" id="navbarSupportedContent">
									{
										isAuthenticatedUser &&
										<ul className="nav navbar-nav navbar-right">
											<li className="nav-item active">
												<button 
													type="button" 
													onClick={() => history.push("/candidate_data")} 
													className="btn btn-outline-light btn-sm">Candidates</button>
											</li>&nbsp;
											<li className="nav-item">
												<button 
													type="button" 
													onClick={onLogout} 
													className="btn btn-outline-light btn-sm">Logout</button>
											</li>
										</ul>
									}
								</div>
							</nav>
							{routes}
						</section>
					</div> :
					<div className="h-100 row align-items-center1">
						<section className="container reactSpinner">
							<Spinner type="grow" size="lg" animation="grow" />
							<Spinner type="grow" size="lg" animation="grow" />
							<Spinner type="grow" size="lg" animation="grow" />
						</section>
					</div>
			}
		</>
	);
}

const mapStateToProps = (state: any) => {
	return {
		isSubscribed: state
	};
};

export default connect(mapStateToProps, null)(withRouter(App));

// export default withRouter(App);
