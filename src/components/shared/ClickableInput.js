import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import styled  from 'styled-components';

const ClickableInputWrapper = styled.div`
    display: inline-flex;
    min-width: 15rem;
    height: 2.75rem;
    align-items: center;
    width: 100%;
`

const TextInput = styled(Input)`
    width: 100%;

    &&& input {
        height: 2.4rem;
    }
`

const TextValue = styled.div`
    width: 100%;
    height: 2.4rem;
    line-height: 2.4rem;
    border-radius: 0.3rem;

    &:hover {
        ${(props) => props.empty ? 'background-color: cyan' : 'background-color: lightgray'}
        cursor: pointer;
    }
     
    ${(props) => props.empty && 'background-color: cyan'}
`
export default class ClickableInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
      editing: false
  }

  startEditing() {
    this.setState({editing: true});
  }

  onBlur() {
      this.setState({editing: false})
  }

  render() {
      const {editing} = this.state;
    return (
      <ClickableInputWrapper>
        {!editing && <TextValue empty={!this.props.value} onClick={this.startEditing.bind(this)}>{this.props.value}</TextValue>}
        {editing && <TextInput 
        onBlur={this.onBlur.bind(this)} 
        autoFocus 
        value={this.props.value}
        onChange={(_, data) => this.props.onChange(data.value)} />}
      </ClickableInputWrapper>
    )
  }
}
