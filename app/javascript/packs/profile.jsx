// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Profile extends React.Component{

  constructor(props){
    super(props);
    this.setAlbums = this.setAlbums.bind(this);

    this.state = {
      albums: [],
      current_album: {},
      isLoading: true
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  getUserData(){
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
      .then(response => this.setAlbums(response)
    );
  }

  setAlbums(response){
    this.setState({
      albums: response.albums,
      current_album: {},
      isLoading: false
    })
  }

  render(){
    return(
      this.state.isLoading ? <p>Loading...</p> :
      this.state.albums.map((album,i)=>{
        return (
          <p>{album.album_name}</p>
        )
       })
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Profile name="React" />,
    document.querySelector('#app-container')
  )
})
