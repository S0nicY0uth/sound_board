import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'

class AlbumDetail extends React.Component{

    render(){
        return(
            <Router>
                <div className="col-50 album-detail test">
                    <a href="profile/discussion" remote="true">Discuss</a>
                    <Route path="/" render={
                        ()=>{ return(<p>This is the Album Tracklisting Section</p> ) }
                    }/>
                    <Route path="/discussion" render={
                        ()=>{ return(<p>This is the Album Discussion Section</p> ) }
                    }/>
                    <Route path="/artistbio" render={
                        ()=>{ return(<p>This is the Artist Bio Section</p> ) }
                    }/>
                </div>
            </Router>
        )
    }

}

export default AlbumDetail;