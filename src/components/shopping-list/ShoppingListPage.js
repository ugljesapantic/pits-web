import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddInput from '../shared/AddInput';
import {
  shoppingListRemoveItem,
  shoppingListLoadAll,
  shoppingListUpdateItem,
  shoppingListUpdate,
  shoppingListRemove,
  shoppingListAddItem,
  shoppingListCreate
} from '../../actions/shopping-list';
import ShoppingList from './ShoppingList';

class ShoppingListPage extends Component {
  componentDidMount() {
    const { loadAll } = this.props;
    loadAll();
  }

  render() {
    const {
      addItem,
      updateItem,
      removeItem,
      shoppingLists,
      update,
      remove,
      labels,
      create
    } = this.props;
    return (
      <div>
        {shoppingLists.map(shoppingList => (
          <ShoppingList
            key={shoppingList._id}
            shoppingList={shoppingList}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
            update={update}
            remove={remove}
            labels={labels}
          />
        ))}
        <AddInput submit={title => create({ title })} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shoppingLists: state.shoppingList
  };
}

//   probably
const mapDispatchToProps = dispatch => ({
  loadAll: () => dispatch(shoppingListLoadAll()),
  addItem: (id, title) => dispatch(shoppingListAddItem(id, title)),
  removeItem: (id, itemId) => dispatch(shoppingListRemoveItem(id, itemId)),
  updateItem: (id, itemId, body) =>
    dispatch(shoppingListUpdateItem(id, itemId, body)),
  update: (id, body) => dispatch(shoppingListUpdate(id, body)),
  create: body => dispatch(shoppingListCreate(body)),
  remove: id => dispatch(shoppingListRemove(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingListPage);
//   TODO add prop types
