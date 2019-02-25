import {css} from 'styled-components';

const mainPadding = {
    top: '5em',
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