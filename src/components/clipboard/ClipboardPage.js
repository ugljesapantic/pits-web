import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAll, loadAllLabels, addItem, addLabel, removeLabel, update, create, remove } from '../../actions';
import Clipboard from './Clipboard';
import Labels from './Labels';
import AddInput from './../shared/AddInput';

class ClipboardPage extends Component {

    state = {
        labels: {}
    }

    componentDidMount() {
        this.props.loadAll();
        this.props.loadAllLabels();
    }
    
    componentDidUpdate(props) {
        if(props.labels.length !== Object.keys(this.state.labels).length) {
            const labels = {}
            this.props.labels.forEach((l) => {
                const existing = this.state.labels[l._id];
                labels[l._id] = existing === undefined ? true : existing
            });
            this.setState({
                labels
            })
        }
    }

    toggleLabelFilter(labelId) {
        this.setState({labels: {...this.state.labels, [labelId]: !this.state.labels[labelId]}})
    }

    render() {
        const labels = this.state.labels;
        const activeLabels = Object.keys(labels)
        .filter(l => labels[l]);

        return (
            <div>
                <Labels 
                labels={this.props.labels.map(l => ({...l, active: this.state.labels[l._id]}))}
                addLabel={this.props.addLabel.bind(this)}
                removeLabel={this.props.removeLabel.bind(this)}
                toggle={this.toggleLabelFilter.bind(this)}/>
                {this.props.clipboards
                .filter(c => c.labels.some(id => activeLabels.includes(id)))
                .map(clipboard => 
                    <Clipboard 
                    key={clipboard._id}
                    clipboard={clipboard}
                    addItem={this.props.addItem}
                    update={this.props.update}
                    remove={this.props.remove}
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
      create: (body) => dispatch(create(body)),
      remove: (id) => dispatch(remove(id))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ClipboardPage);
//   TODO add prop types