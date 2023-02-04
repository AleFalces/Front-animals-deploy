import React from "react";
import { useSelector } from "react-redux";
import "./ProductDetail.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

export default function ProductDetail(props) {
	const detail = useSelector((state) => state.productDetail);

	console.log(detail);
	return (
		<div className="detailProductContainerAll">
			<Navbar />
			<div className="detailProductNavbarDivBottom"></div>
			<div className="detailProductContainer">
				<div className="divDetailProductDescription">
					<div className="detailProductDescription">
						<h1>{detail[0]?.name}</h1>
						<h1>Puntuacion </h1>
						<h4>★★★</h4>
						<div className="detailDescription">
							<div>
								<h2>Categoria</h2> <h3>{detail[0]?.Category}</h3>
							</div>
							<div className="detailProductDescription2">
								<h2>Descripcion:</h2> <h3>{detail[0]?.description}</h3>
							</div>
							<div>
								<h2>Precio</h2> <h3>${detail[0]?.price}</h3>{" "}
							</div>
							<div>
								<h2>Stock</h2> <h3>{detail[0]?.stock}u</h3>
							</div>
						</div>
					</div>
					<div className="imgxbutton">
						<img src={detail[0]?.image} alt="" />
						<div>
							<button
								onClick={(e) =>
									detail[0].handlerSetCart(
										e,
										detail[0]?.id,
										detail[0]?.price,
										detail[0]?.image,
										detail[0]?.name
									)
								}>
								Agregar
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="divTopReview"></div>
			<div className="reviewsContainer">
				Reseñas
				<h1>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
					consectetur quos sequi maiores id, cum voluptate saepe sint deleniti
					dolorum nam necessitatibus velit optio earum. Rem quas fuga autem cum.
				</h1>
				<h1>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
					consectetur quos sequi maiores id, cum voluptate saepe sint deleniti
					dolorum nam necessitatibus velit optio earum. Rem quas fuga autem cum.
				</h1>
				<h1>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
					consectetur quos sequi maiores id, cum voluptate saepe sint deleniti
					dolorum nam necessitatibus velit optio earum. Rem quas fuga autem cum.
				</h1>
				<h1>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
					consectetur quos sequi maiores id, cum voluptate saepe sint deleniti
					dolorum nam necessitatibus velit optio earum. Rem quas fuga autem cum.
				</h1>
			</div>
			<div className="footerProductDetail">
				<Footer />
			</div>
		</div>
	);
}
