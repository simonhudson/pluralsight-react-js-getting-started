const Card = (props) => {
	return (
		<div className="card">
			<div className="card__media">
				<img alt={props.name} src={props.avatar_url}/>
			</div>
			<div className="card__text">
				<p><strong>{props.name}</strong></p>
			</div>
		</div>
	);
}

const CardList = (props) => {
	return (
		<div className="card__list">
			{props.cards.map(card => <Card key={Card.id} {...card} />)}
		</div>
	);
};

class Form extends React.Component {

	state = { userName: '' };

	handleSubmit = (event) => {
		event.preventDefault();
		fetch(`https://api.github.com/users/${this.state.userName}`)
			.then(blob => blob.json())
			.then(data => {
				this.props.onSubmit(data);
				this.setState({userName: ''})
			});
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					onChange={(event) => this.setState({userName: event.target.value})}
					placeholder="Github username"
					required
					type="text"
					value={this.state.userName}
				/>
				<button type="submit">Add card</button>
			</form>
		);
	}
}

class App extends React.Component {

	state = {
		cards: []
	};

	addNewCard = (cardData) => {
		this.setState(prevState => ({
			cards: prevState.cards.concat(cardData)
		}));
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.addNewCard}/>
				<CardList cards={this.state.cards} />
			</div>
		);
	}
};

ReactDOM.render(<App/>, mountNode);
