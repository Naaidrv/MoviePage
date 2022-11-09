let pagina = 1;
const btnAnt = document.getElementById('btnAnterior');
const btnSig = document.getElementById('btnSiguiente');

btnSig.addEventListener('click', () =>{
	if(pagina < 1000){
		pagina += 1;
		todasPelis();
	}
});

btnAnt.addEventListener('click', () =>{
	if(pagina > 1){
		pagina -= 1;
		todasPelis();
	}
});

const todasPelis = async() => {
	try {
		const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=66e778b6c81c7e3803aba93d7cc20a34&language=es-MX&page=${pagina}`);
		console.log(resp);

		//Respuestas de los status
		if(resp.status === 200){
			const data = await resp.json();
			let peliculas = '';

			data.results.forEach(pelicula => {
				peliculas +=  `
				<div class="pelicula">
				<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
				<p class="titulo">${pelicula.title}</p>
				<div class="textdes">
				<p class="descrip">${pelicula.overview}</p>
				</div>
				</div>`;
				if (pelicula.overview = '') {
					alert('Opps, no hay descripción para esta película')
				}
			});
			document.getElementById('contenedor').innerHTML = peliculas;
		}else if (resp.status === 401){
			console.log('Opps! Creo que pusiste mal tu llave');
		}else if(resp.status === 404){
			console.log('Ayy no... No se ha encontrado la película');
		}else{
			console.log('Ha ocurrido un error inesperado');
		}
	} catch(error){
		console.log(error);
	}
}


todasPelis();