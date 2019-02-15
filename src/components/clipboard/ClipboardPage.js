import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAll, loadAllLabels } from '../../actions';
import Clipboard from './Clipboard';

class ClipboardPage extends Component {

    state = {
        editing: null
    }

    componentDidMount() {
        this.props.loadAll();
        this.props.loadAllLabels();
    }

    edit(clipboard) {
        this.setState({editing: clipboard});
    }

    save() {
        // but do something
        this.setState({editing: null})
    }

    cancel() {
        this.setState({editing: null})
    }

    onTitleChange(value) {
        this.setState((prev) => ({editing: {...prev.editing, title: value}}))
    }

    onItemChange(id, update) {
        this.setState((prev) => ({
            editing: {
                ...prev.editing,
                items: prev.editing.items.map((item) => item._id !== id ? item : {...item, ...update})
            }
        }))
    }

    onLabelChange(_, update) {
        this.setState((prev) => ({
            editing: {
                ...prev.editing,
                labels: [...update.value]
            }
        }))
    }

    render() {
        const {editing} = this.state;
        return (
            <div>
                {this.props.clipboards.map((clipboard) => 
                <Clipboard 
                edit={this.edit.bind(this)}
                key={clipboard._id}
                clipboard={clipboard}
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
      loadAllLabels: () => {
        dispatch(loadAllLabels())
      },
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ClipboardPage);
  