import React, { Component, PropTypes } from 'react';
import Panel from './Panel';
import TextEdit from './TextEdit';
import ChoicesEdit from './ChoicesEdit';
import {Row, Col, Button} from 'react-materialize';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getPanel } from '../actions/index';
import { getChoices } from '../actions/index';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import StoryChart from './StoryChart';



class NewPanelForm extends Component{
  static contextTypes = {
    router: PropTypes.object
  };
   constructor(props) {
    super(props);
    this.handleImageSubmit = this.handleImageSubmit.bind(this);

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      newChoices: [],
    };


  }
    addNewChoice = (event) => {
      if (event.key === "Enter") {

        const newChoice = {
          content: event.target.value};
          event.target.value = ""
          this.setState ({newChoices : event.target.value})
        }
      }

    componentDidMount() {

    this.props.dispatch(getPanel(this.props.match.params.storyid, this.props.match.params.panelid));
    this.props.dispatch(getChoices(this.props.match.params.storyid, this.props.match.params.panelid));

  }


  handleImageSubmit(event) {
    event.preventDefault()
    var data = {panel: {

      "id": this.props.match.params.panelid,
      "image": this.image.value,
      "story_id":this.props.match.params.storyid
    }};
    console.log(data);
    fetch(`/stories/${this.props.match.params.storyid}/panels/${this.props.match.params.panelid}`, {
      headers: {'Content-Type': 'application/json'},
      method: "PUT",
      body: JSON.stringify(data)
    }).then(json => {
        this.setState({panelid: json.data})
        window.location.assign(`/stories/${this.props.match.params.storyid}/panels/${this.props.match.params.panelid}/edit`)
      })
  }





   handleChoiceSubmit = (event) => {
    event.preventDefault()
    var data = {choice: {
      "panel_id": this.props.match.params.panelid,
      "body_text": this.choiceBodyText.value,
      "story_id": this.props.match.params.storyid,
      "index": this.props.panel.index

    }};
    console.log(data);
    fetch(`/stories/${this.props.match.params.storyid}/panels/${this.props.match.params.panelid}/choices`, {
      headers: {'Content-Type': 'application/json'},
      method: "POST",
      body: JSON.stringify(data)
    }).then(json => {
        this.setState({choiceid: json.data})
        const choiceid = json.data
        window.location.assign(`/stories/${this.props.match.params.storyid}/panels/${this.props.match.params.panelid}/edit`)
      })
  }

   handleChange(event) {
    this.setState({body_text: event.target.value});

  }



  render(){
    return(
    <div>
      <NavBar/>
              <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={true}
          transitionEnterTimeout={600}
          transitionLeave={false}>

      <div>

        <div className="mini-panel">
          <Col s={11} m={6}>
            <Panel panel={this.props.panel} />
          </Col>
          <Col s={11} m={5}>
            <ChoicesEdit choices={this.props.choices} panel={this.props.panel}/>
            </Col>
        </div>
      <form className="form" onSubmit={this.handleChoiceSubmit}>
        <Row>
          <Col m={1}/>
          <Col m={10}>
          <div className="panel-form2">

            <label>
              New Choice:
              <input type="text" ref={(input) => this.choiceBodyText = input} onKeyUp={this.props.addNewChoice}/>
            </label>
            <input className="waves-effect waves-light btn" type="submit" value="Submit" />
            </div>
          </Col>
        </Row>
        </form>
    <Row>
      <div className="panel-form">
        <form className="form" onSubmit={this.handleImageSubmit}>
              <label>
                Image:
                <input type="text" ref={(input) => this.image = input} />
              </label>
              <input className="waves-effect waves-light btn" type="submit" value="Submit" />
            </form>

          <Col m={1}/>
      </div>
    </Row>
    <br/>
    <div>
      <TextEdit panel={this.props.panel}/>
    </div>
    <div>
     <Link to={`/stories/${this.props.panel.story_id}/`} onClick={StoryChart }>
      <Button>Back to the Chart!</Button>
    </Link>
    </div>
  </div>
  </ReactCSSTransitionGroup>
  </div>
  );
}
}


function mapStateToProps(state) {

  return{panel: state.panel.panel,
         choices: state.choices.choices};


}




export default connect(mapStateToProps)(NewPanelForm);







