import React, { Component } from 'react'

class Room extends Component {

	constructor(props) {
	  super(props)
	  this.state = {
	  	isActive: this.props.isActive,
	  	roomCSS: this.getActiveClass(),
	  	wallColor: {back: 'e9e9e9', side: 'dbdbdb', bottom: 'd0d0d0'}
	  }
	  if (this.props.project.wallColor) {
	  	this.state.wallColor = {
	  		back: this.backWallColor(),
	  		bottom: this.bottomWallColor(-25),
	  		side: this.sideWallColor(-5)
	  	}
	  }
	}

	getActiveClass () {
		if (this.props.isActive === this.props.index) {
			return 'room room--current'
		} else {
			return 'room'
		}
	}

	backWallColor () {
		if ( this.props.project.wallColor[0] === "#" ) {
		  return this.props.project.wallColor.slice(1)
		} else {
			return this.props.project.wallColor
		}
	}

	bottomWallColor (amt) {
		let col = this.props.project.wallColor
    if ( this.props.project.wallColor[0] === "#" ) {
      col =  this.props.wallColor.slice(1)
    }

    let num = parseInt(col, 16)

    let r = (num >> 16) + amt
    	if ( r > 255 ) r = 255
   		else if  (r < 0) r = 0

    let b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0

    let g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (g | (b << 8) | (r << 16)).toString(16);
	}

	// via https://stackoverflow.com/questions/5560248/
	sideWallColor (amt) {
		let col = this.props.project.wallColor
    if ( this.props.project.wallColor[0] === "#" ) {
      col =  this.props.project.wallColor.slice(1)
    }

    let num = parseInt(col, 16)

    let r = (num >> 16) + amt
    	if ( r > 255 ) r = 255
   		else if  (r < 0) r = 0

    let b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0

    let g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (g | (b << 8) | (r << 16)).toString(16);
	}

	// componentDidUpdate(nextProps) {
	// 	// may prevent an unnecessary render
	//   // if (this.props.isActive !== this.state.isActive) {
	//    this.setState({roomCSS: this.getActiveClass()})
	//     console.log('gac returns:', this.getActiveClass())
	//   // }
	// }

	render () {
		const backStyle = {backgroundColor: ('#' + this.state.wallColor.back)}
		const sideStyle = {backgroundColor: ('#' + this.state.wallColor.side)}
		const botmStyle = {backgroundColor: ('#' + this.state.wallColor.bottom)}
		return (
			<div className={this.state.roomCSS}>
				<div className="room__side room__side--back" style={backStyle}>
					<img className="room__img" src={this.props.project.img1} alt="Some"/>
					<img className="room__img" src={this.props.project.img2} alt="Some"/>
				</div>
				<div className="room__side room__side--left" style={sideStyle}>
					<img className="room__img" src={this.props.project.img3} alt="Some"/>
					<img className="room__img" src={this.props.project.img4} alt="Some"/>
					<img className="room__img" src={this.props.project.img5} alt="Some"/>
				</div>
				<div className="room__side room__side--right" style={sideStyle}>
					<img className="room__img" src={this.props.project.img6} alt="Some"/>
					<img className="room__img" src={this.props.project.img7} alt="Some"/>
					<img className="room__img" src={this.props.project.img8} alt="Some"/>
				</div>
				<div className="room__side room__side--bottom" style={botmStyle}></div>
			</div>
		)
	}
}


export default Room
