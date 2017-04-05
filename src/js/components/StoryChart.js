import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { getRow } from '../actions/index';
import { connect } from 'react-redux';
import StoryEdit from './StoryEdit.js'
import { Modal, Button } from 'react-materialize';



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
        array.push(row.index2.toString(), row.index.toString(), row.panel_title.toString())
        return array
      });
      return result;
    }

    getPanelData = (dataFromDb) => {
      let result = dataFromDb.map((row, index) => {
        var array = [];
        array.push(row.id, row.panel_id, row.path_to, row.panel_title, row.index, row.index2, row.story_id)
        return array
      })
      return result
    }


  render() {
    let rowsData = this.columnRow(this.props.rows);
    let panelData = this.getPanelData(this.props.rows)
    if (rowsData.length === 0) {
      return <div />
    }
    return (
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

           <Modal
            header='Chapter 1: The Beginning'
            trigger={
              <Button waves='light'>Chapter 1 : The Beginning</Button>
              }>
            <p>The Beginning
            </p>

          </Modal>
          <StoryEdit rows={panelData}/>
        </div>
    );


 }
}





function mapStateToProps(state) {
  return{rows: state.rows.rows};

}

export default connect(mapStateToProps)(StoryChart);

