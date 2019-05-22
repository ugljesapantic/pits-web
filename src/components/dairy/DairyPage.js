import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  FaCaretLeft,
  FaCaretRight,
  FaMicrophone,
  FaMicrophoneSlash
} from 'react-icons/fa';
import * as moment from 'moment';
import AsyncInput from '../shared/AsyncInput';
import Card from '../shared/Card';
import {
  loadAllDairies,
  removeDairy,
  createDairy,
  updateDairy
} from '../../actions';
import DairyTextItem from './DairyTextItem';
import { toIsoStringDate } from '../../utils/date';

import { bottomAction } from '../../styles/layout';
import DairyAudioItem from './DairyAudioItem';

const Wrapper = styled.div``;

const RecordAudioWrapper = styled.div`
  ${bottomAction}
  width: 4rem;
  justify-content: center;
`;

const StartRecordingButton = styled(FaMicrophone)`
  cursor: pointer;
`;

const StopRecordingButton = styled(FaMicrophoneSlash)`
  cursor: pointer;
  color: red;
`;

const ListAsyncInput = styled(AsyncInput)`
  margin: 0.3rem 0;
`;

const DatePicker = styled.div`
  font-size: 1.5rem;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0.75rem 0;
`;

class DairyPage extends Component {
  state = {
    date: toIsoStringDate(new Date()),
    recording: false
  };

  recorder = null;

  componentDidMount() {
    const { loadAll } = this.props;
    const { date } = this.state;
    loadAll(date);
  }

  setupRecorder = () =>
    new Promise(async resolve => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      const audioChunks = [];

      mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise(resolveCallback => {
          mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();
            resolveCallback({ audioBlob, audioUrl, play });
          });

          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
        });

      resolve({ start, stop });
    });

  sleep = time => new Promise(resolve => setTimeout(resolve, time));

  startRecording = async () => {
    this.recorder = await this.setupRecorder();
    this.recorder.start();
    this.setState({ recording: true });
  };

  stopRecording = async () => {
    const audio = await this.recorder.stop();
    this.setState({ recording: false });
    const audioBase64 = await this.blobToBase64(audio.audioBlob);

    const { create } = this.props;
    const { date } = this.state;
    create({
      content: audioBase64,
      date,
      type: 'audio'
    });
  };

  blobToBase64 = blob =>
    new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });

  changeDate(addition) {
    const { loadAll } = this.props;
    this.setState(
      prevState => ({
        date: toIsoStringDate(
          moment(new Date(prevState.date))
            .add(addition, 'days')
            .toDate()
        )
      }),
      newState => loadAll(newState.date)
    );
  }

  showTomorrow() {
    this.changeDate(1);
  }

  showYesteday() {
    this.changeDate(-1);
  }

  render() {
    const { date, recording } = this.state;
    const { remove, update, dairies, create } = this.props;
    return (
      <Wrapper>
        <Card>
          <Card.Head>
            <DatePicker>
              <FaCaretLeft onClick={this.showYesteday} />
              {date}
              <FaCaretRight onClick={this.showTomorrow} />
            </DatePicker>
          </Card.Head>
          <Card.Body>
            {dairies &&
              dairies.map(item =>
                item.type === 'text' ? (
                  <DairyTextItem
                    remove={remove}
                    update={update}
                    item={item}
                    key={item._id}
                  />
                ) : (
                  <DairyAudioItem remove={remove} item={item} key={item._id} />
                )
              )}
            <ListAsyncInput
              placeholder="Add"
              save={content =>
                create({
                  content,
                  date,
                  type: 'text'
                })
              }
            />
          </Card.Body>
        </Card>

        <RecordAudioWrapper>
          {recording ? (
            <StopRecordingButton
              onClick={() => this.stopRecording()}
              size="45"
            />
          ) : (
            <StartRecordingButton
              onClick={() => this.startRecording()}
              size="36"
            />
          )}
        </RecordAudioWrapper>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    dairies: state.dairy
  };
}

//   probably
const mapDispatchToProps = dispatch => ({
  loadAll: date => dispatch(loadAllDairies(date)),
  update: (id, body) => dispatch(updateDairy(id, body)),
  create: body => dispatch(createDairy(body)),
  remove: id => dispatch(removeDairy(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DairyPage);
