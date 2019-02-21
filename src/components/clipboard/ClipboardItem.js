import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import EditableText from '../shared/EditableText';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateItem, removeItem } from '../../actions';


const Wrapper = styled.div`
    display: flex;
`

const Title = styled.div`
  flex: 0 0 10rem;
`

const Value = styled.div`
  flex: 1;
`;

const Actions = styled.div`
  flex: 0 0 4rem;
  display: flex;
  align-items: center;
`;


class ClipboardItem extends Component {

  // Some could say its an anti pattern
  state = {
    editing: false || (!this.props.item.title && !this.props.item.title),
    title: this.props.item.title || '',
    value: this.props.item.value || '',
    dirty: false,
    updating: false
  }

  saveChanges() {
    // todo if saving empty item, delete it
    if (this.state.dirty) {
      this.setState({updating: true})
      this.props.updateItem(this.props.id, this.props.item._id, {
        value: this.state.value,
        title: this.state.title
      }).then(_=> this.setState({editing: false, updating: false}))
    } else {
      this.setState({editing: false})
    }
  }
  
  cancelChanges() {
    this.setState({
      editing: false,
      title: this.props.item.title,
      value: this.props.item.value,
      dirty: false
    })
  }

  remove() {
    // todo maybe props should not be named like removeItem, but only delete, since they are called from perspective of item?
    this.props.removeItem(this.props.id, this.props.item._id);
  }
  render() {
    const {editing, title, value, updating} = this.state;
    return (
      <Wrapper>
        <Title>
          <EditableText 
          onChange={(v) => this.setState({title: v, dirty: true})}
          disabled={updating}
          value={title}
          displayValue={this.props.item.title}
          submit={this.saveChanges.bind(this)}
          editing={editing}/>
        </Title>
        <Value>
          <EditableText
          onChange={(v) => this.setState({value: v, dirty: true})}
          autoFocus
          disabled={updating}
          value={value}
          displayValue={this.props.item.value}
          submit={this.saveChanges.bind(this)}
          editing={editing}/>
        </Value>
        <Actions>
          {/* TODO Disablre actions when saving and add hover over shit*/}
          {/* TODO should not be possible to cancel empty item */}
          {/* TODO disable save unless dirty */}
          {!editing ? 
          <React.Fragment>
            <Icon onClick={() => this.setState({editing: true})} link circular name="edit"/>
            <Icon onClick={() => this.remove()} link circular name="trash"/>
          </React.Fragment> : <React.Fragment>
            <Icon onClick={() => this.saveChanges()} link circular name="check"/>
            <Icon onClick={() => this.cancelChanges()} link circular name="remove"/>
          </React.Fragment>}
        </Actions>
      </Wrapper>
    )
  }
}

// todo static method inside class body ?
ClipboardItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
}

// maybe this component can be clean, and i should pass this via props
const mapDispatchToProps = dispatch => {
  return {
    updateItem: (id, itemId, item) => dispatch(updateItem(id, itemId, item)),
    removeItem: (id, itemId) => dispatch(removeItem(id, itemId))
  }
}

export default connect(null, mapDispatchToProps)(ClipboardItem);