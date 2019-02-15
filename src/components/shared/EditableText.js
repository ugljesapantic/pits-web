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
      /* TODO make this light gray something else */
        background-color: 'lightgray';
        cursor: pointer;
    }
     
    ${(props) => props.empty && 'background-color: cyan'}
`
// TODO Change into func
export default class EditableText extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  render() {
    // TODO destructur props
    return (
      <ClickableInputWrapper>
        {!this.props.editing && <TextValue>{this.props.value}</TextValue>}
        {this.props.editing && <TextInput 
        autoFocus={this.props.autoFocus} 
        disabled={this.props.disabled}
        value={this.props.value}
        onChange={(_, data) => this.props.onChange(data.value)} />}
      </ClickableInputWrapper>
    )
  }
}
