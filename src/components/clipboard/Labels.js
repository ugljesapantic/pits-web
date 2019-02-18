import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';

const LabelsWrapper = styled.div`
    .inactive {
        opacity: 0.3;
    }
`;

const Labels = (props) => {
  return (
    <LabelsWrapper>
        {props.labels.map(label => (
        <Label
        key={label._id}
        onClick={() => props.toggle(label._id)}
        as="a"
        className={!label.active && 'inactive'}
        color={label.color}>{label.title}<Icon name='close' /></Label>
    ))}
    </LabelsWrapper>
  )
}

Labels.propTypes = {

}

export default Labels

