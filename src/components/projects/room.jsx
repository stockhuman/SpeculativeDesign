import React, { Component } from 'react'

class Room extends Component {

	getActiveClass () {
		if (this.props.project.isActive) {
			return 'room room--current'
		} else {
			return 'room'
		}
	}

	render () {
		return (
			<div className={this.getActiveClass}>
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
				{this.props.project.img1}

			</div>
		)
	}
}


export default Room
