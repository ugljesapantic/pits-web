import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import EditLabel from './EditLabel';
import useResponsive from '../../utils/responsive';

const LabelsWrapper = styled.div`
    line-height: 2em;
    .inactive {
        opacity: 0.3;
    }
`;

export default function Labels(props) {

    const responsive = useResponsive();

    const deleteLabel = (e, id) => {
        e.stopPropagation();
        props.removeLabel(id);
        // Add async
    }

    return (
        //   todo icons in general should have hover 
        <LabelsWrapper>
            {props.labels.map(label => (
            <Label
            key={label._id}
            onClick={() => props.toggle(label._id)}
            as="a"
            size={responsive.mobile ? 'small' : 'medium'}
            className={!label.active ? 'inactive' : 'active'}
            color={label.color}>{label.title}
            <Icon name='close' onClick={(e) => deleteLabel(e, label._id)} /></Label>
            ))}
            <EditLabel submit={props.addLabel}/>
        </LabelsWrapper>
        )

}

Labels.propTypes = {
    toggle: PropTypes.func.isRequired,
    addLabel: PropTypes.func.isRequired,
    // labels: PropTypes.arrayOf(
    //     PropTypes.shape({
          
    //     }),
    // ).isRequired,
    removeLabel: PropTypes.func.isRequired,
}
