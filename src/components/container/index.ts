import styled from 'styled-components';
import theme from '../../theme';

const Container = styled.div`
    max-width: ${theme.size.container}px;
    margin-left: auto;
    margin-right: auto;
    padding-left: ${theme.size.space * 2}px;
    padding-right: ${theme.size.space * 2}px;
`;

export default Container;
