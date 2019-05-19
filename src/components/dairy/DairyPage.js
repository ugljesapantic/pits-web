import React, { Component } from 'react'
import { connect } from 'react-redux'
import AsyncInput from '../shared/AsyncInput';
import styled from 'styled-components';
import Card from './../shared/Card';
import { loadAllDairies, removeDairy, createDairy, updateDairy } from './../../actions';
import DairyTextItem from './DairyTextItem';
import { toIsoStringDate } from './../../utils/date';
import { FaCaretLeft, FaCaretRight, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

import * as moment from 'moment';
import { bottomAction } from './../../styles/layout';
import DairyAudioItem from './DairyAudioItem';

const Wrapper = styled.div`
    
`;

const RecordAudioWrapper = styled.div`
  ${bottomAction}
  width: 4rem;
  justify-content: center;
`;

const StartRecordingButton = styled(FaMicrophone)`
  cursor: pointer;
`

const StopRecordingButton = styled(FaMicrophoneSlash)`
  cursor: pointer;
  color: red;
`

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
    date : toIsoStringDate(new Date()),
    recording: false
  }

  recorder = null;

  componentDidMount() {
    this.props.loadAll(this.state.date)
  }

  changeDate(addition) {
    this.setState({
      date: toIsoStringDate(moment(new Date(this.state.date)).add(addition, 'days').toDate())
    }, () => this.props.loadAll(this.state.date))
  }

  setupRecorder = () => new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
        stream.getTracks().forEach( track => track.stop() );
      });

    resolve({ start, stop });
  });

  sleep = time => new Promise(resolve => setTimeout(resolve, time));

  startRecording = async () => {
    this.recorder = await this.setupRecorder();
    this.recorder.start();
    this.setState({recording: true})
  }

  stopRecording = async () => {
    const audio = await this.recorder.stop();
    this.setState({recording: false})
    const audioBase64 = await this.blobToBase64(audio.audioBlob);
    this.props.create({content: audioBase64, date: this.state.date, type: 'audio'})
  }

  blobToBase64 = (blob) => {
    return new Promise(resolve => {
      var reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => resolve(reader.result)
    })
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
                  item.type === 'text' ? <DairyTextItem 
                  remove={this.props.remove}
                  update={this.props.update}
                  item={item}
                  key={item._id}/> : <DairyAudioItem 
                  remove={this.props.remove}
                  item={item}
                  key={item._id}/>
              )}
            <ListAsyncInput 
              placeholder={'Add'}
              save={(content) => this.props.create({content, date: this.state.date, type: 'text'})}
            />
          </Card.Body>
        </Card>

        <RecordAudioWrapper>
          {this.state.recording ? 
          <StopRecordingButton  onClick={() => this.stopRecording()} size="45"/> : 
          <StartRecordingButton onClick={() => this.startRecording()} size="36"/>}
        </RecordAudioWrapper>
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
