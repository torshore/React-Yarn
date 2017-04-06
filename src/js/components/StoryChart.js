import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { getRow } from '../actions/index';
import { connect } from 'react-redux';
import StoryEdit from './StoryEdit.js'

import { Modal, Button, Row, Col } from 'react-materialize';




class StoryChart extends Component {
  constructor(props) {
    super(props);
    this.chartEvents = [
    {
      eventName: 'select',
      callback(Chart) {

        console.log('Selected', Chart.chart.getSelection());
      },
    },
    ]
  }

   componentDidMount() {
    this.props.dispatch(getRow(this.props.match.params.storyid));
    }

    columnRow = (dataFromDb) => {
      let result = dataFromDb.map((row, index) => {
        var array = [];
        array.push(row.path_to.toString(), row.panel_id.toString())
        return array
        });
      return result;
    }


  render() {
    let rowsData = this.columnRow(this.props.rows);


    if (rowsData.length === 0) {
      return <div />
    }
    return (
<<<<<<< Updated upstream
      <div>
        <Chart
          chartType="OrgChart"
          rows={rowsData}
          columns={[
            {
              type: 'string',
              label: 'Child',
            },
            {
              type: 'string',
              label: 'Parent'
            },
        ]}
          graph_id="OrgChart"
          width={'50%'}
          height={'50%'}
          legend_toggle
          chartEvents={this.chartEvents}
        />
        <StoryEdit rows={rowsData}/>
      </div>
        <div>
        <Row className="build">
        <div >
         <Col m={3}>
           <h3 className="bldtitle2"> View Chapters: </h3>
           <Modal
            header='Chapter 1: The Beginning'
            trigger={
              <Button waves='light'>Chapter 1 : The Beginning</Button>
              }>
            <p>The Beginning
            </p>

          </Modal>
          <StoryEdit rows={panelData}/>
          </Col>
          </div>
        <div >
        <Col m={8} className="chart">
          <h3 className="bldtitle3">Story Paths:</h3>
          <Chart

            chartType="OrgChart"
            rows={rowsData}
            columns={[
              {
                type: 'string',
                label: 'Child',
              },
              {
                type: 'string',
                label: 'Parent'
              },
              {
                type: 'string',
                label: 'Tooltip'
              }
          ]}
            graph_id="OrgChart"
            width={'50%'}
            height={'50%'}
            legend_toggle
            chartEvents={this.chartEvents}
          />
          </Col>
          <Col m={0.5}/>
          </div>

        </Row>
        </div>

    );


 }
}





function mapStateToProps(state) {
  return{rows: state.rows.rows};

}

export default connect(mapStateToProps)(StoryChart);

