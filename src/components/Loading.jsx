import React from 'react'
import styled from 'styled-components';
import { Spin } from 'antd';

const Loading = () => {
  return (
    <Container>
        <Spin tip="Loading..."/>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default Loading