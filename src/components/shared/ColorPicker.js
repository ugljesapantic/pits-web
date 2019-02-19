import React , {useState, useEffect} from 'react'
import styled from 'styled-components';

import colors from '../../utils/colors';

const ColorPickerWrapper = styled.div`
    display: inline-block;
    position: relative;
`;

const TriggerWrapper = styled.div`
    
`;

const Color = styled.div`
    ${(props) => `background-color: ${props.background}`}
    padding: 0.5rem;
    color: white;
    cursor: pointer;
`;

const PickerWrapper = styled.div`
    position: absolute;
    top: 0;
    transform: translateX(100%);
    right: 0;
    width: 6rem;
    height: 8rem;
    z-index: 10;
    background-color: white;
    overflow: auto;
    /* TODO copy pasted, dont do this */
    box-shadow: 0 0 0 1px #d4d4d5, 0 2px 0 0 #1b1c1d, 0 1px 3px 0 #d4d4d5;
`;

function ColorPicker({trigger, colorPicked, color}) {
    const [active, setActive] = useState(false);

    const selectColor = (color) => {
        setActive(false);
        colorPicked(color);
    }

  return (
    <ColorPickerWrapper>
        <TriggerWrapper onClick={() => setActive(true)}>
            {React.cloneElement(trigger, {...trigger.props, color})}
        </TriggerWrapper>
        {active && <PickerWrapper>
            {/* TODO refactor to reducer */}
            {Object.keys(colors).map(c => <Color onClick={() => selectColor(c)} background={colors[c]} key={c}>{c}</Color>)}
        </PickerWrapper>}
    </ColorPickerWrapper>
  )
}

export default ColorPicker
