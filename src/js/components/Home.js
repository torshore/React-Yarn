import React, {Component} from 'react';
import { Col, Row} from 'react-materialize';


class Home extends Component{
   constructor(props) {
    super(props);
    this.handleChangeVisibility = this.handleChangeVisibility.bind(this)
    this.state = {
      visibility: 'hidden'

    }

  }
handleChangeVisibility(event) {
      this.setState({visibility: 'visible'});
    }

  render() {
    return (
      <div>
        <h1 className ="title">Yarn</h1>
        <div>
        <Row>
          <Col m={1}/>
          <Col m={3}>
          <div className="hand-pointer" onClick={this.handleChangeVisibility}>
            <img className="btn-build" src="/bulb.png" alt="link"/>
            <h3 className="link"> BUILD!  </h3>
          </div>
            <a href="/new">
              <h6 className="link" style={{visibility: this.state.visibility}}>new</h6>
            </a>
            <a href="/storiesedit">
              <h6 className="link" style={{visibility: this.state.visibility}}>existing</h6>
            </a>
          </Col>
          <Col m={4}/>
          <Col m={3}>
            <a href="/stories">
              <img className="btn2" src="/controller.png" alt="link"/>
              <h3 className="link">PLAY!</h3>
            </a>
          </Col>

        </Row>
        </div>
      </div>
    )
  }
};

export default Home;