import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAll, loadAllLabels, addItem, addLabel, removeLabel, update, create } from '../../actions';
import Clipboard from './Clipboard';
import Labels from './Labels';
import AddInput from './../shared/AddInput';

class ClipboardPage extends Component {

    state = {
        labels: {}
    }

    componentDidMount() {
        this.props.loadAll();
        this.props.loadAllLabels().then(() => {
            // After initial load, make them all active in the state
            const labels = {}
            this.props.labels.forEach((l) => labels[l._id] = true);
            this.setState({
                labels
            })
        });
    }

    toggleLabelFilter(labelId) {
        this.setState({labels: {...this.state.labels, [labelId]: !this.state.labels[labelId]}})
    }

    render() {

        return (
            <div>
                <Labels 
                labels={this.props.labels.map(l => ({...l, active: this.state.labels[l._id]}))}
                addLabel={this.props.addLabel.bind(this)}
                removeLabel={this.props.removeLabel.bind(this)}
                toggle={this.toggleLabelFilter.bind(this)}/>
                {this.props.clipboards.map((clipboard) => 
                    <Clipboard 
                    key={clipboard._id}
                    clipboard={clipboard}
                    addItem={this.props.addItem}
                    update={this.props.update}
                    labels={this.props.labels}/>
                )}
                <AddInput submit={(title) => this.props.create({title})} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        clipboards : state.clipboard.clipboards,
        labels: state.clipboard.labels
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      loadAll: () => {
        dispatch(loadAll())
      },
      loadAllLabels: () => dispatch(loadAllLabels()),
      addItem: (id) => dispatch(addItem(id)),
      addLabel: (body) => dispatch(addLabel(body)),
      removeLabel: (id) => dispatch(removeLabel(id)),
      update: (id, body) => dispatch(update(id, body)),
      create: (body) => dispatch(create(body))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ClipboardPage);
  