import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class CarouselControl extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <button className={this.props.label} onClick={this.props.changeSlide}>{this.props.label}</button>
        )
    }
}

export default CarouselControl;