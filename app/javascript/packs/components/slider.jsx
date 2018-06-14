import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CarouselControl from './carouselControl'
import AlbumDetail from './albumDetail'
import { CSSTransitionGroup } from 'react-transition-group'

class Carousel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            albumIndex: 0
        }

        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }

    nextSlide(){
        let newIndex = this.state.albumIndex + 1;
    
        if(newIndex >= this.props.albums.length){
          newIndex = 0;
        }
    
        this.setState({
          albumIndex: newIndex,
        })
      }
    
    prevSlide(){
        let newIndex = this.state.albumIndex - 1;

        if(newIndex < 0){
            newIndex = this.props.albums.length -1;
        }

        this.setState({
            albumIndex: newIndex,
        })
    }

    
    render(){
        return(
            <div className="carousel">
            <div className="controls">
                <CarouselControl label="prev" changeSlide={this.prevSlide}/>
                <CarouselControl label="next" changeSlide={this.nextSlide}/>
            </div>
                <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {this.props.albums.map((album,i)=>{

                        var slideStyle = {
                            color: 'white',
                            height: "500px",
                            backgroundImage: "url("+album.image+")",
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            width: "500px",
                            
                        };

                        return (
                            this.state.albumIndex === i ? 
                                <div key={i} className="slide-container">
                                    <div className="image col-50" style ={ slideStyle } ></div>
                                    <div className="col-50 album-detail">
                                        <h1>{album.album_name}</h1>
                                        <ol>
                                        { album.tracks.map((track, i)=>{
                                            return(
                                                <li key={i}>{track.track}</li>
                                            )
                                        })}
                                        </ol>
                                </div>
                                <AlbumDetail/>
                            </div> : null
                        )
                    })
                }

            </CSSTransitionGroup>

            </div>
        );
    }
}


export default Carousel;