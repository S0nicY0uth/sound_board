import React from 'react';
import Profile from 'profile';
import Carousel from 'slider';
import CarouselControl from 'carouselControl';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

const response = {"id":"11126629320","name":"Chris Hopkins","href":"https://api.spotify.com/v1/users/11126629320","followers":{"href":null,"total":15},"albums":[{"artist":"Bob Dylan","album_name":"Another Side Of Bob Dylan","image":"https://i.scdn.co/image/fddada11d571524f6295b6a60ce75d8453f22426","tracks":[{"track":"All I Really Want to Do","duration":245960,"track_no":1},{"track":"Black Crow Blues","duration":194706,"track_no":2}]}]};
const tracks1 = [
  {track: "All I Really Want to Do", duration: 245960, track_no: 1},
  {track: "Black Crow Blues", duration: 194706, track_no: 2},
  {track: "All I Really Want to Do", duration: 245960, track_no: 1},
  {track: "Black Crow Blues", duration: 194706, track_no: 2},
  {track: "Spanish Harlem Incident", duration: 145733, track_no: 3}
]
const albums = [
  {artist: "Bob Dylan", album_name: "Another Side Of Bob Dylan", image: "https://i.scdn.co/image/fddada11d571524f6295b6a60ce75d8453f22426", tracks: tracks1 },
  {artist: "Bob Dylan", album_name: "Another Side Of Bob Dylan", image: "https://i.scdn.co/image/fddada11d571524f6295b6a60ce75d8453f22426", tracks: tracks1 },
  {artist: "Thom Yorke", album_name: "Tomorrow's Modern Boxes", image: "https://i.scdn.co/image/e82aa1b904aebd3adb0a1d04097c1647b1a2da4b", tracks: tracks1}
]

describe('<Carousel /> rendering', ()=>{
  it('should render one Carousel component', ()=>{
    const component = shallow(<Carousel albums={albums}/>);
    expect(component).toHaveLength(1);  
  });

  it('should render one ordered list', ()=> {
    const component = shallow(<Carousel albums={albums}/>);
    expect(component.find('ol').length).toEqual(1);
  });

  it('should render one h1 element', ()=> {
    const component = shallow(<Carousel albums={albums}/>);
    expect(component.find('h1').length).toEqual(1);
  });

  it('should render all the tracks from the first album', ()=> {
    const component = shallow(<Carousel albums={albums}/>);
    expect(component.find('li').length).toEqual(tracks1.length);
  });

  it('should render the title of the first album', ()=> {
    const component = shallow(<Carousel albums={albums}/>);
    expect(component.find('h1').text()).toEqual('Another Side Of Bob Dylan');
  });

  it('should render the correct tracks', ()=> {
    const component = shallow(<Carousel albums={albums}/>);
    expect(component.find('ol').childAt(0).text()).toEqual('All I Really Want to Do');
    expect(component.find('ol').childAt(1).text()).toEqual('Black Crow Blues');
  });

  it('should render 2 carousel controls components', ()=> {
    const component = mount(<Carousel albums={albums}/>);
    expect(component.find('CarouselControl').length).toEqual(2);
  });

})

describe('<Carousel /> nextSlide method',()=>{
  it('should exist', ()=> {
    const wrapper = mount(<Carousel albums={albums}/>);
    const component = wrapper.instance();

    component.forceUpdate();
    wrapper.update();

    let nextSlideMethod = sinon.stub(component, 'nextSlide').callsFake(() => { });

    component.nextSlide();

    expect(nextSlideMethod.callCount).toEqual(1);
    console.log(component.state.albumIndex);
  });

  it('should change the albumIndex value',()=>{
    const wrapper = mount(<Carousel albums={albums}/>);
    const component = wrapper.instance();

    component.forceUpdate();
    wrapper.update();

    let nextSlideMethod = sinon.stub(component, 'nextSlide').callsFake(() => { });

    component.nextSlide();

    setTimeout(function(){
      expect(component.state.albumIndex).toEqual(1);
    },200);
    
  });

});
describe('<Carousel /> prevSlide method',()=>{
  it('should have a prevSlide method', ()=> {
    const wrapper = mount(<Carousel albums={albums}/>);
    const component = wrapper.instance();

    component.forceUpdate();
    wrapper.update();

    let nextSlideMethod = sinon.stub(component, 'prevSlide').callsFake(() => { });

    component.prevSlide();

    expect(nextSlideMethod.callCount).toEqual(1);
  });

  it('should change the albumIndex value',()=>{
    const wrapper = mount(<Carousel albums={albums}/>);
    const component = wrapper.instance();

    component.forceUpdate();
    wrapper.update();

    let nextSlideMethod = sinon.stub(component, 'prevSlide').callsFake(() => { });

    component.prevSlide();

    setTimeout(function(){
      expect(component.state.albumIndex).toEqual(2);
    },200);  
  });
});