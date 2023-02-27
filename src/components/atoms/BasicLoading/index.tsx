import * as React from 'react'

import styled from 'styled-components'

interface IWrapper {
    size: string
    borderSize: string
    color: string
    Background?: string
    children?: React.ReactNode
}

const Wrapper = styled.div<IWrapper>`
    @-ms-keyframes spin {
        from {
            -ms-transform: rotate(0deg);
        }

        to {
            -ms-transform: rotate(360deg);
        }
    }

    @-moz-keyframes spin {
        from {
            -moz-transform: rotate(0deg);
        }

        to {
            -moz-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin {
        from {
            -webkit-transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: 500px;
    border-style: solid;
    border-width: ${({ borderSize }) => borderSize};
    border-color: ${({ Background }) => (Background ? Background : '#b8b8b82d')};
    & > div {
        position: absolute;
        border-top-right-radius: 500px;
        border-bottom-right-radius: 500px;
        border-top-left-radius: 500px;
        border-bottom-left-radius: 500px;
        border-top: solid ${({ borderSize }) => borderSize} ${({ color }) => color};
        border-bottom: solid ${({ borderSize }) => borderSize} transparent;
        border-left: solid ${({ borderSize }) => borderSize} transparent;
        border-right: solid ${({ borderSize }) => borderSize} transparent;
        width: ${({ size }) => size};
        height: ${({ size }) => size};
        -webkit-animation-name: spin;
        -webkit-animation-duration: 1000ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
        -moz-animation-name: spin;
        -moz-animation-duration: 1000ms;
        -moz-animation-iteration-count: infinite;
        -moz-animation-timing-function: linear;
        -ms-animation-name: spin;
        -ms-animation-duration: 1500ms;
        -ms-animation-iteration-count: infinite;
        -ms-animation-timing-function: linear;
        animation-name: spin;
        animation-duration: 1000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
`

const BasicLoading = ({ size, borderSize, Background, color, children, ...props }: IWrapper) => {
    return (
        <Wrapper
            size={size}
            borderSize={borderSize}
            color={color}
            Background={Background}
            {...props}
        >
            <div />
            {children}
        </Wrapper>
    )
}

export default BasicLoading
