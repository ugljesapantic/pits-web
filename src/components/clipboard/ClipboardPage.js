import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadAllClipboards,
  addClipboardItem,
  updateClipboard,
  createClipboard,
  removeClipboard,
  updateClipboardItem,
  removeClipboardItem
} from '../../actions';
import Clipboard from './Clipboard';
import AddInput from '../shared/AddInput';

class ClipboardPage extends Component {
  componentDidMount() {
    const { loadAll } = this.props;
    loadAll();
  }

  render() {
    const {
      clipboards,
      addItem,
      updateItem,
      removeItem,
      create,
      update,
      remove
    } = this.props;
    return (
      <div>
        {clipboards.map(clipboard => (
          <Clipboard
            key={clipboard._id}
            clipboard={clipboard}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
            update={update}
            remove={remove}
          />
        ))}
        <AddInput submit={title => create({ title })} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clipboards: state.clipboard.clipboards
  };
}

const mapDispatchToProps = dispatch => ({
  loadAll: () => {
    dispatch(loadAllClipboards());
  },
  addItem: (id, title) => dispatch(addClipboardItem(id, title)),
  updateItem: (id, itemId, body) =>
    dispatch(updateClipboardItem(id, itemId, body)),
  removeItem: (id, itemId) => dispatch(removeClipboardItem(id, itemId)),
  update: (id, body) => dispatch(updateClipboard(id, body)),
  create: body => dispatch(createClipboard(body)),
  remove: id => dispatch(removeClipboard(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClipboardPage);
//   TODO add prop types
