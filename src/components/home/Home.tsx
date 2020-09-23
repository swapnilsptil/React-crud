import React from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="h-100 row align-items-center">
			<section className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-6" >
						<div className={`box m-2 p-4 text-center ${classes.backgroundToContainer}`}>
							<i className="fas fa-time"></i>
							<img src="https://www.flaticon.com/svg/static/icons/svg/3135/3135800.svg" alt="Cookie" className={classes.img} />
							{/* <p className={classes.text}>Candidate form </p> */}
							<Link to={"/candidate_form"} className={classes.btnRed}>Candidate form </Link>
						</div>
					</div>

					<div className="col-xs-12 col-sm-6" >
						<div className={`box m-2 p-4 text-center ${classes.backgroundToContainer}`}>
							<i className="fas fa-times"></i>
							<img src="https://www.flaticon.com/svg/static/icons/svg/2835/2835252.svg" alt="Cookie" className={classes.img} />
							{/* <p className={classes.text}>HR Login</p> */}
							<Link to={"/hr_login"} className={classes.btnRed}>HR Login</Link>
						</div>
					</div>

				</div>
			</section>
		</div>
	);
};

export default Home;
