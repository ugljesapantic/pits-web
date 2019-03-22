import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllClipboards, addClipboardItem, updateClipboard, createClipboard, removeClipboard, updateClipboardItem, removeClipboardItem } from '../../actions';
import Clipboard from './Clipboard';
import AddInput from './../shared/AddInput';

class ClipboardPage extends Component {

    componentDidMount() {
        this.props.loadAll();
    }

    render() {

        return (
            <div>
                {this.props.clipboards
                .map(clipboard => 
                    <Clipboard 
                    key={clipboard._id}
                    clipboard={clipboard}
                    addItem={this.props.addItem}
                    updateItem={this.props.updateItem}
                    removeItem={this.props.removeItem}
                    update={this.props.update}
                    remove={this.props.remove}/>
                )}
                <AddInput submit={(title) => this.props.create({title})} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        clipboards : state.clipboard.clipboards,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      loadAll: () => {
        dispatch(loadAllClipboards())
      },
      addItem: (id, title) => dispatch(addClipboardItem(id, title)),
      updateItem: (id, itemId, body) => dispatch(updateClipboardItem(id, itemId, body)),
      removeItem: (id, itemId) => dispatch(removeClipboardItem(id, itemId)),
      update: (id, body) => dispatch(updateClipboard(id, body)),
      create: (body) => dispatch(createClipboard(body)),
      remove: (id) => dispatch(removeClipboard(id))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ClipboardPage);
//   TODO add prop types