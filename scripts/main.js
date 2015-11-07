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
	    return {
	    	data: []
	    };
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
  			$("article span")[0].className = "name right";
  		} else {
  			console.log("INCORRECT");
  			$("article span")[0].className = "name wrong";
  		}

  		$(".notification")[0].className = "notification visible";

  		this.refs.name.value = '';
  		this.refs.answer.value = '';
  		
  		$(window).keypress(function(e) {
	       location.reload();
  		});

  		return;
  	},
	render: function () {
		//choose random employee
		var listOfEmployees = this.state.data;
		var randomEmployee = listOfEmployees[Math.floor(Math.random() * listOfEmployees.length)];
		return (
			<div className="flashcard" id="face-wrapper">
				<EmployeePicture employee={randomEmployee} style={this.state.pictureStyling}/>
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
			<article className="employee">
				<img src={this.props.employee ? this.props.employee.url : ""} />
				<span className="name hidden">{this.props.employee ? this.props.employee.name : ""}</span>
			</article>
		);
	}
});

ReactDOM.render(
		<FlashcardContent url="http://namegame.willowtreemobile.com:2000" />,
		document.getElementById('flashcard')
);