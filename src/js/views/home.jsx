import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

const Home = () => (
	<div className="text-center mt-5">
		<h1>Pagina de Inicio</h1>
		<p>
			<img src={rigoImage} />
		</p>
		<a href="#" className="btn btn-success">
			If you see this green button, bootstrap is working
		</a>
	</div>
);

export default Home;
//aquí mostraría todas las cards