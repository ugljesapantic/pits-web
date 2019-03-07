import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddInput from './../shared/AddInput';
import { shoppingListLoadAll, shoppingListUpdate, shoppingListRemove,  shoppingListAddItem, shoppingListCreate } from '../../actions/shopping-list';
import ShoppingList from './ShoppingList';

class ShoppingListPage extends Component {

    state = {
    }

    componentDidMount() {
        this.props.loadAll();
    }

    render() {

        return (
            <div>
                {this.props.shoppingLists
                .map(shoppingList => 
                    <ShoppingList
                    key={shoppingList._id}
                    shoppingList={shoppingList}
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