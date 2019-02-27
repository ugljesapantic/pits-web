import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import EditableText from '../shared/EditableText';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateItem, removeItem } from '../../actions';


const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto 4.5em;
    border: 1px solid lightgray;
    border-radius: 0.4em;
    margin-top: 0.3em;
    /* height: 2.4rem; */
`

const Title = styled.div`
  flex: 0 0 10rem;
`

const Value = styled.div`
  grid-column: 1/-1;
  background-color: lightgray;
  border-bottom-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
    .copied {
      background-color: white;
    }
    
    transition: background-color 0.3s;
`;

const Actions = styled.div`
  flex: 0 0 4rem;
  display: flex;
  align-items: center;
`;


class ClipboardItem extends Component {

  // Some could say its an anti pattern
  state = {
    editing: !this.props.item.title && !this.props.item.value,
    title: this.props.item.title || '',
    value: this.props.item.value || '',
    dirty: false,
    updating: false
  }

  saveChanges() {
    if (!this.state.title && !this.state.value) {
      return this.remove();
    }
    if (this.state.dirty) {
      this.setState({updating: true})
      this.props.updateItem(this.props.id, this.props.item._id, {
        value: this.state.value,
        title: this.state.title
      }).then(_=> this.setState({editing: false, updating: false}))
    } else {
      this.cancelChanges();
    }
  }

  copy(str, e) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    e.target.classList.toggle('copied');
    setTimeout((el) => el.classList.toggle('copied'), 200, e.target);
}
  
  cancelChanges() {
    this.setState({
      editing: false,
      title: this.props.item.title,
      value: this.props.item.value,
      dirty: false
    })
  }

  onBlur(e) {
  
    setTimeout(() => {
      if (!this.el.contains(document.activeElement)) {
          this.saveChanges();
      }
      
    }, 0);
  }

  setRef(el) {
    this.el = el;
  }

  edit() {
    this.setState({editing: true})
  }

  remove() {
    // todo maybe props should not be named like removeItem, but only delete, since they are called from perspective of item?
    this.props.removeItem(this.props.id, this.props.item._id);
  }
  render() {
    const {editing, title, value, updating} = this.state;
    return (
      <Wrapper onBlur={this.onBlur.bind(this)} ref={this.setRef.bind(this)}>
        <Title>
          <EditableText 
          onChange={(v) => this.setState({title: v, dirty: true})}
          disabled={updating}
          value={title || ''}
          displayValue={this.props.item.title || ''}
          submit={this.saveChanges.bind(this)}
          cancel={this.cancelChanges.bind(this)}
          editing={editing}/>
        </Title>
        <Actions>
          {/* TODO Disablre actions when saving and add hover over shit*/}
          {/* TODO should not be possible to cancel empty item */}
          {/* TODO disable save unless dirty */}
          {!editing ? 
          <React.Fragment>
            <Icon onClick={this.edit.bind(this)} link circular name="edit"/>
            <Icon onClick={() => this.remove()} link circular name="trash"/>
          </React.Fragment> : <React.Fragment>
            <Icon tabIndex={1} onClick={() => this.saveChanges()} link circular name="check"/>
            <Icon tabIndex={2} onClick={() => this.cancelChanges()} link circular name="remove"/>
          </React.Fragment>}
        </Actions>
        <Value onClick={e => {if (!editing) this.copy(value, e)}}>
          <EditableText
           
          onChange={(v) => this.setState({value: v, dirty: true})}
          disabled={updating}
          autoFocus
          value={value || ''}
          displayValue={this.props.item.value || ''}
          submit={this.saveChanges.bind(this)}
          cancel={this.cancelChanges.bind(this)}  
          editing={editing}/>
        </Value>
      </Wrapper>
    )
  }
}

// todo static method inside class body ?
ClipboardItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.number,
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