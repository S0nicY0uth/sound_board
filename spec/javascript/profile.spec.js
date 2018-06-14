import React from 'react';
import ReactDOM from 'react-dom';
import Profile from 'profile';
import Carousel from 'slider';
import CarouselControl from 'carouselControl';
import sinon from 'sinon';

const response = {"id":"11126629320","name":"Chris Hopkins","href":"https://api.spotify.com/v1/users/11126629320","followers":{"href":null,"total":15},"albums":[{"artist":"Bob Dylan","album_name":"Another Side Of Bob Dylan","image":"https://i.scdn.co/image/fddada11d571524f6295b6a60ce75d8453f22426","tracks":[{"track":"All I Really Want to Do","duration":245960,"track_no":1},{"track":"Black Crow Blues","duration":194706,"track_no":2}]}]};

describe('<Profile />', ()=>{
  it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Profile data={response} />, div);
  });
});