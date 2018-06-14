// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Carousel from './components/slider'
import CarouselControl from './components/carouselControl'

class Profile extends React.Component{

  constructor(props){
    super(props);
    this.setAlbums = this.setAlbums.bind(this);
    this.setCurrentAlbum = this.setCurrentAlbum.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.state = {
      albums: [],
      current_album: {},
      isLoading: true,
      albumIndex: 0,
    }
  }

  componentDidMount(){
    // this.getUserData(this.setCurrentAlbum);
    this.setAlbums(this.props.data);
    this.setCurrentAlbum(0);
  }

  setCurrentAlbum(index){
    this.setState({
      current_album: this.state.albums[index],
    })
    console.log(this.state.albums);
  }


  setAlbums(response){
    this.setState({
      albums: response.albums,
      albumIndex: 0,
      isLoading: false
    })
  }

  nextSlide(){
    let newIndex = this.state.albumIndex + 1;

    if(newIndex >= this.state.albums.length){
      newIndex = 0;
    }

    this.setState({
      current_album: this.state.albums[newIndex],
      albumIndex: newIndex,
    })
  }

  prevSlide(){
    let newIndex = this.state.albumIndex - 1;

    if(newIndex < 0){
      newIndex = this.state.albumIndex.length -1;
    }

    this.setState({
      current_album: this.state.albums[newIndex],
      albumIndex: newIndex,
    })
  }
  render(){
    return(
      this.state.isLoading ? <p>Loading...</p> :
      <Carousel albums={this.state.albums}></Carousel>
      
    )
  }
}

function getUserData(cb){
  let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  fetch('/spotify.json', {
    method: 'GET',
    credentials: 'include',
    headers:{
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then((response)=> {
      const data = response;
      console.log(data);
      cb(data);
    }
  );
}

function ReactRenderApp(data){
  ReactDOM.render(
    <Profile name="React" data={data} />,
    document.querySelector('#app-container')
  )
}

document.addEventListener('DOMContentLoaded', () => {
  getUserData(ReactRenderApp);
})


export default Profile;