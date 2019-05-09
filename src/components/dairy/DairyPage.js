import React, { Component } from 'react'
import { connect } from 'react-redux'
import AsyncInput from '../shared/AsyncInput';
import styled from 'styled-components';
import Card from './../shared/Card';
import { loadAllDairies, removeDairy, createDairy, updateDairy } from './../../actions';
import DairyItem from './DairyItem';
import { toIsoStringDate } from './../../utils/date';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

import * as moment from 'moment';

const Wrapper = styled.div`
    
`;

const ListAsyncInput = styled(AsyncInput)`
    margin: 0.3rem  0;
`

const DatePicker = styled.div`
  font-size: 1.5rem;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0.75rem 0;
`

export class DairyPage extends Component {
  state = {
    date : toIsoStringDate(new Date())
  }

  componentDidMount() {
    this.props.loadAll(this.state.date)
  }

  changeDate(addition) {
    this.setState({
      date: toIsoStringDate(moment(new Date(this.state.date)).add(addition, 'days').toDate())
    }, () => this.props.loadAll(this.state.date))
  }

  render() {
    return (
      <Wrapper>
        <Card>
          <Card.Head>
            <DatePicker>
              <FaCaretLeft onClick={this.changeDate.bind(this, -1)} />
              {this.state.date}
              <FaCaretRight onClick={this.changeDate.bind(this, 1)}/>
            </DatePicker>
          </Card.Head>
          <Card.Body>
            {this.props.dairies && this.props.dairies.map(item => 
                  <DairyItem 
                  remove={this.props.remove}
                  update={this.props.update}
                  item={item}
                  key={item._id}/>
              )}
            <ListAsyncInput 
              placeholder={'Add'}
              save={(content) => this.props.create({content, date: this.state.date})}
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
    loadAll: (date) => dispatch(loadAllDairies(date)),
    update: (id, body) => dispatch(updateDairy(id, body)),
    create: (body) => dispatch(createDairy(body)),
    remove: (id) => dispatch(removeDairy(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DairyPage);
