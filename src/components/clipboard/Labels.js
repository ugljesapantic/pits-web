import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import EditLabel from './EditLabel';

const LabelsWrapper = styled.div`
    .inactive {
        opacity: 0.3;
    }
`;

// HUEHUE FUNC
export default class Labels extends Component {

    deleteLabel(e, id) {
        e.stopPropagation();
        this.props.removeLabel(id);
        // Add async
    }

  render() {
    return (
        //   todo icons in general should have hover 
        <LabelsWrapper>
            {this.props.labels.map(label => (
            <Label
            key={label._id}
            onClick={() => this.props.toggle(label._id)}
            as="a"
            className={!label.active ? 'inactive' : 'active'}
            color={label.color}>{label.title}
            <Icon name='close' onClick={(e) => this.deleteLabel(e, label._id)} /></Label>
            ))}
            <EditLabel submit={this.props.addLabel}/>
        </LabelsWrapper>
      )
  }
}
