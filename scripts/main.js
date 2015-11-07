var FlashcardContent = React.createClass({
	loadEmployeesFromServer: function() {
		$.ajax({
		  	url: this.props.url,
		  	dataType: 'json',
		  	cache: false,
		  	success: function(data) {
		    	this.setState({
		    		data: data
		    	});
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
	render: function () {
		var listOfEmployees = this.state.data;
		var randomEmployee = listOfEmployees[Math.floor(Math.random() * listOfEmployees.length)];
		var pathname = window.location.pathname.split("/").length > 0 ? window.location.pathname.split("/")[1] : "";
		var cssName = pathname.indexOf("quiz") > -1 ? "flashcardName hidden" : "flashcardName";
		var cssForm = pathname.indexOf("quiz") > -1 ? "flashcardForm" : "flashcardName hidden";

		if (pathname.indexOf('study') > -1) {
			$(window).keypress(function(e) {
		       location.reload();
	  		});
		}

		return (
			<div className="flashcard" id="face-wrapper">
				<h3 className={cssName}> {randomEmployee ? randomEmployee.name : ""}</h3>
				<EmployeePicture employee={randomEmployee} style={this.state.pictureStyling}/>
				<EmployeeQuizForm employee={randomEmployee ? randomEmployee.name : ""} style={cssForm} />
			</div>
		);
	}
});

var EmployeeQuizForm = React.createClass({
	handleSubmit: function(e) {
  		e.preventDefault();
  		var name = this.refs.name.value.toLowerCase().trim();
  		var correctAnswer = this.refs.answer.value.toLowerCase().trim();
  		if (!name) {
  			return;
  		}

  		if (name === correctAnswer) {
  			$("article span")[0].className = "name right";
  		} else {
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
		return (
			<form className={this.props.style} onSubmit={this.handleSubmit}>
				<input type="text" className="form-control" placeholder="Enter Name" ref="name"/>
				<input type="hidden" ref="answer" value={this.props.employee ? this.props.employee.name : ""} />
				<input type="submit" className="btn btn-info" value="Check" />
			</form>
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
	<FlashcardContent url="http://namegame.willowtreemobile.com:2000"/>,
	document.getElementById('flashcard')
);

