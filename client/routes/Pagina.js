var React = require('react');

var Pagina = React.createClass({
	render: function() {
		return (
			<div>
			<p>E prima pagina, dar asta oricum era afisata pentru ca e pe IndexRoute. Apropo, asa in general... daca vrei sa folosesti un modul din React sau de oriunde, ai grija sa il si importi in proiect in loc sa te scarpini pe cap vreo 5 min ca iti da undefined.</p>
			<p> <a href="https://github.com/sergiu-enasoaie/node-reacts" target="_blank">Link de git!</a></p>
			</div>
		);
	}
});

module.exports = Pagina;
