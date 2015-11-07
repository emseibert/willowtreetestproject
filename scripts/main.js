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

var	QuestionContent = React.createClass({
  render: function() {
    return (
       	<h1>Who is BLANK?</h1>
    );
  }
});

var PictureContent = React.createClass({
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
	render: function () {
		return (
			<FiveOptions data={this.state.data}/>
		);	
	}
});

var FiveOptions = React.createClass({
  render: function() {
    var employeeList = this.props.data.map(function (employee) {
    	return (
    		<Employee key={employee.name} name={employee.name} url={employee.url} />
    	);
        
    });
    return (
    	<div className="pics">
    		{employeeList}
    	</div>
	);
  }
});

var Employee = React.createClass({
	render: function() {
		return (
			<div className="employee">
				<img src={this.props.url} />
			</div>
		);
	}
});

ReactDOM.render(
  <QuestionContent />,
  document.getElementById('question')
);

ReactDOM.render(
	<PictureContent url="http://namegame.willowtreemobile.com:2000" />,
	document.getElementById('pictures')
);