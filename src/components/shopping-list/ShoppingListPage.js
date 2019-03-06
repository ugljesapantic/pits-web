import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddInput from './../shared/AddInput';
import { shoppingListLoadAll, shoppingListUpdate, shoppingListRemove,  shoppingListAddItem, shoppingListCreate } from '../../actions/shopping-list';

class ShoppingListPage extends Component {

    state = {
    }

    componentDidMount() {
        this.props.loadAll();
    }

    render() {

        return (
            <div>
               hehe
               {console.log(this)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        shoppingLists : state.shoppingList,
    }
  }
  
//   probably
  const mapDispatchToProps = dispatch => {
    return {
      loadAll: () => dispatch(shoppingListLoadAll()),
      addItem: (id) => dispatch(shoppingListAddItem(id)),
      update: (id, body) => dispatch(shoppingListUpdate(id, body)),
      create: (body) => dispatch(shoppingListCreate(body)),
      remove: (id) => dispatch(shoppingListRemove(id))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);
//   TODO add prop types