import React, { Component } from 'react'

class Room extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	isActive: this.props.isActive,
	  	roomCSS: this.getActiveClass()
	  }
	}

	getActiveClass () {
		if (this.props.isActive == this.props.index) {
			return 'room room--current'
		} else {
			return 'room'
		}
	}

	componentDidUpdate(nextProps) {
		// may prevent an unnecessary render
	  // if (this.props.isActive !== this.state.isActive) {
	   this.setState({roomCSS: this.getActiveClass()})
	    console.log('gac returns:', this.getActiveClass())
	  // }
	}

	render () {
		return (
			<div className={this.state.roomCSS}>
				<div className="room__side room__side--back">
					<img className="room__img" src={this.props.project.img1} alt="Some image"/>
					<img className="room__img" src={this.props.project.img1} alt="Some image"/>
				</div>
				<div className="room__side room__side--left">
					<img className="room__img" src={this.props.project.img1} alt="Some image"/>
					<img className="room__img" src={this.props.project.img1} alt="Some image"/>
					<img className="room__img" src={this.props.project.img1} alt="Some image"/>
				</div>
				<div className="room__side room__side--right">
					<img className="room__img" src={this.props.project.img1} alt="Some image"/>
					<img className="room__img" src={this.props.project.img1} alt="Some image"/>
					<img className="room__img" src={this.props.project.img1} alt="Some image"/>
				</div>
				<div className="room__side room__side--bottom"></div>
			</div>
		)
	}
}


export default Room
