import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import EditableText from '../shared/EditableText';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateItem } from '../../actions';


const Wrapper = styled.div`
    display: flex;

    > div {
      padding: 0 0.5rem;
    }
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
    editing: false,
    title: this.props.item.title,
    value: this.props.item.value,
    dirty: false,
    updating: false
  }

  saveChanges() {
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
          editing={editing}/>
        </Title>
        <Value>
          <EditableText
          onChange={(v) => this.setState({value: v, dirty: true})}
          autoFocus
          disabled={updating}
          value={value}
          displayValue={this.props.item.value}
          editing={editing}/>
        </Value>
        <Actions>
          {/* TODO Disablre actions when saving and add hover over shit*/}
          {!editing ? 
          <React.Fragment>
            <Icon onClick={() => this.setState({editing: true})} link circular name="edit"/>
            <Icon link circular name="trash"/>
          </React.Fragment> : <React.Fragment>
            <Icon onClick={() => this.saveChanges()} link circular name="check"/>
            <Icon link circular name="remove"/>
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
    updateItem: (id, itemId, item) => dispatch(updateItem(id, itemId, item))
  }
}

export default connect(null, mapDispatchToProps)(ClipboardItem);