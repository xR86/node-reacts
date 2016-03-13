var React = require('react');

var Pagina = React.createClass({
	render: function() {
		return (
			<p>E prima pagina, dar asta oricum era afisata pentru ca e pe IndexRoute. Apropo, asa in general... daca vreti sa folositi un modul din React sau de oriunde, aveti grija sa il si importati in proiect in loc sa va scarpinati in ca vreo 5 min ca va da undefined.</p>
		);
	}
});

module.exports = Pagina;
