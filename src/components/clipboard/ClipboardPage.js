import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAll, loadAllLabels, addItem } from '../../actions';
import Clipboard from './Clipboard';
import Labels from './Labels';

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

    edit(clipboard) {
        this.setState({editing: clipboard});
    }

    onTitleChange(value) {
        this.setState((prev) => ({editing: {...prev.editing, title: value}}))
    }

    onLabelChange(_, update) {
        this.setState((prev) => ({
            editing: {
                ...prev.editing,
                labels: [...update.value]
            }
        }))
    } 

    toggleLabelFilter(labelId) {
        this.setState({labels: {...this.state.labels, [labelId]: !this.state.labels[labelId]}})
    }

    render() {

        return (
            <div>
                <Labels 
                labels={this.props.labels.map(l => ({...l, active: this.state.labels[l._id]}))}
                toggle={this.toggleLabelFilter.bind(this)}/>
                {this.props.clipboards.map((clipboard) => 
                <Clipboard 
                edit={this.edit.bind(this)}
                key={clipboard._id}
                clipboard={clipboard}
                addItem={this.props.addItem}
                labels={this.props.labels}/>
                )}
                {/* {editing && <EditClipboard 
                clipboard={editing}
                save={this.save.bind(this)}
                cancel={this.cancel.bind(this)}
                onTitleChange={this.onTitleChange.bind(this)}
                onItemChange={this.onItemChange.bind(this)}
                onLabelChange={this.onLabelChange.bind(this)}
                selectedLabels={editing.labels}
                labels={this.props.labels}
                />} */}
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
      addItem: (id) => dispatch(addItem(id))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ClipboardPage);
  