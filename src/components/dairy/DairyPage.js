import React, { Component } from 'react'
import { connect } from 'react-redux'
import AsyncInput from '../shared/AsyncInput';
import styled from 'styled-components';
import Card from './../shared/Card';
import { loadAllDairies, removeDairy, createDairy, updateDairy } from './../../actions';

const Wrapper = styled.div`
    
`;

export class DairyPage extends Component {

  render() {
    console.log(this.props)
    return (
      <Wrapper>
        <Card>
          <Card.Head>
            Date will go here
          </Card.Head>
          <Card.Body>
            <AsyncInput 
              save={(content) => this.props.create({content})}
            />
          </Card.Body>
        </Card>
      </Wrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
      dairies : state.dairy,
  }
}

//   probably
const mapDispatchToProps = dispatch => {
  return {
    loadAll: () => dispatch(loadAllDairies()),
    update: (id, body) => dispatch(updateDairy(id, body)),
    create: (body) => dispatch(createDairy(body)),
    remove: (id) => dispatch(removeDairy(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DairyPage);
