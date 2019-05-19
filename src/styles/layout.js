import styled, {css} from 'styled-components';

const mainPadding = {
    top: '4em',
    bottom: '3em'
}

export const main = css`
    min-height: 100vh;
    padding-top: ${mainPadding.top};
    padding-bottom: ${mainPadding.bottom};
`;

export const fullScreen = css`
    height: calc(100vh - ${mainPadding.top} - ${mainPadding.bottom});
`

export const bottomAction = css`
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;  
    display: flex;
    align-items: center;
    height: 3rem;
    i {
      cursor: pointer;
    }
`

export const HoverActions = styled.div`
    visibility: hidden;
    position: absolute;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    top: 0;

    & > * {
    cursor: pointer;
    margin: 0 0.5rem;
    }
`;