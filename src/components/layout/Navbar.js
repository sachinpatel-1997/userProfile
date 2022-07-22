import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../../actions/authActions";
import { DropdownButton } from "react-bootstrap";
 import { MenuItem } from "@mui/material";

const Navbar = ({ auth: { isLoggedIn, loading, user }, logOut }) => {
	const authLinks = (
		<ul className="nav-links">
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user"></i>{" "}
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			
			{/* <DropdownButton title="Profile">
				<Link onClick={logOut} to="/login" replace>
					<i className="fas fa-sign-out-alt">Profile</i>{" "}
					<span className="hide-sm"> &nbsp;Logout</span>
					
				</Link>
				</DropdownButton> */}
			
			 <DropdownButton style = {{color:"white",width:"300px", display:"inline-block"}}  title="Profile">
      <MenuItem href="#books">Welcome,{user.name}</MenuItem>
      <MenuItem href="#podcasts">Welcome CurrentUser: {user.email}</MenuItem>
      <MenuItem href="#addBlog" onClick={logOut} to="/login"> Logout</MenuItem>
    </DropdownButton>
	
		</ul>
		
		
	);
	const guestLinks = (
		<ul className="nav-links">
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">HOME</Link>
			</h1>
			{!loading && (
				<Fragment>{isLoggedIn ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logOut: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Navbar);