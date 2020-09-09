import React from "react";
import auth from "../../auth";

function Home(props) {
	if (props.logout) {
		auth.logout();
	}

	return (
		<div>
			Home page here.
		</div>
	);
}

export default Home;
