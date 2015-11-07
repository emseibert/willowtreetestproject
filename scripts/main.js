var data = [
  {
    "name": "Andrew Harris",
    "url": "http://willowtreeapps.com/wp-content/uploads/2014/12/headshot_andrew_harris1.jpg"
  },
  {
    "name": "Abby Cook",
    "url": "http://willowtreeapps.com/wp-content/uploads/2015/11/headshot_abby_cook.jpg"
  },
  {
    "name": "Abigale Howell",
    "url": "http://willowtreeapps.com/wp-content/uploads/2015/07/headshot_abigale_howell.jpg"
  },
  {
    "name": "Alborz Mesbahi",
    "url": "http://willowtreeapps.com/wp-content/uploads/2015/11/headshot_alborz_mesbahi.jpg"
  },
  {
    "name": "Alex Shafran",
    "url": "http://willowtreeapps.com/wp-content/uploads/2014/12/headshot_alex_shafran.jpg"
  }
];

var FlashcardContent = React.createClass({
	loadEmployeesFromServer: function() {
		$.ajax({
		  	url: this.props.url,
		  	dataType: 'json',
		  	cache: false,
		  	success: function(data) {
		    	this.setState({data: data});
		 	 }.bind(this),
		  	error: function(xhr, status, err) {
		   		console.error(this.props.url, status, err.toString());
	 		}.bind(this)
		});
	},
	getInitialState: function() {
	    return {data: []};
	},
	componentDidMount: function() {
		this.loadEmployeesFromServer();
  	},
  	handleSubmit: function(e) {
  		e.preventDefault();
  		var name = this.refs.name.value.toLowerCase().trim();
  		var correctAnswer = this.refs.answer.value.toLowerCase().trim();
  		if (!name) {
  			return;
  		}

  		if (name === correctAnswer) {
  			console.log("CORRECT");
  		} else {
  			console.log("INCORRECT");
  		}

  		this.refs.name.value = '';
  		this.refs.answer.value = '';
  		
  		return;
  	},
	render: function () {
		//choose random employee
		var listOfEmployees = this.state.data;
		var randomEmployee = listOfEmployees[Math.floor(Math.random() * listOfEmployees.length)];
		console.log(listOfEmployees.length);
		return (
			<div className="flashcard">
				<EmployeePicture employee={randomEmployee}/>
				<form className="flashcardForm" onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Enter Name" ref="name"/>
					<input type="hidden" ref="answer" value={randomEmployee ? randomEmployee.name : ""} />
					<input type="submit" value="Check" />
				</form>
			</div>
		);
	}
});

var EmployeePicture = React.createClass({
	render: function() {
		return (
			<div className="employee">
				<img src={this.props.employee ? this.props.employee.url : ""} />
			</div>
		);
	}
});

ReactDOM.render(
		<FlashcardContent url="http://namegame.willowtreemobile.com:2000" />,
		document.getElementById('flashcard')
);