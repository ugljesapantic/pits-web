import React, { PureComponent } from 'react'
import { Segment, Card , Label, Icon} from 'semantic-ui-react'
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import ClipboardItem from './ClipboardItem';
import ClickableEditableText from './../shared/ClickableEditableText';
// TODO get rid of all of them
const CardWrapper = styled(Card)`
    &&& .card-content {
        padding: 0.5em 1em;
    }

    &&& .segment {
        padding: 0.5em 1em;
        cursor: pointer;

        &:hover {
            background-color: #dcddde;
        }

        &.copied {
            background-color: #21ba45;
        }

        transition: background-color 0.3s;
    }

    &&& .segment-group {
        margin: 0.2em 0.2em;
    }

    &&&.title {
        display: inline-block;
    }
`

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 0.25em 1em;
    
`

const CardTitle = styled.div`
font-weight: bold;
line-height: 2em;
    font-size: 1em;
    margin-right: 1em;
`

class Clipboard extends PureComponent {

    copy(str, e) {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        e.target.classList.toggle('copied');
        setTimeout((el) => el.classList.toggle('copied'), 200, e.target);
    }

    handleMouseHover() {
        this.setState(prev => ({
            hovering: !prev.hovering
        }));
    }

    addItem() {
        this.props.addItem(this.props.clipboard._id).then((x) => {
            
        })
    }

    onTitleChange(title) {
        return this.props.update(this.props.clipboard._id, {title})
    }

  render() {
      return (
        <CardWrapper fluid color='black' raised>
          <CardHeader>
          <ClickableEditableText
          value={this.props.clipboard.title}
          save={this.onTitleChange.bind(this)}
           />
              {this.props.labels
                .filter(l => this.props.clipboard.labels.includes(l._id))
                .map(l => <Label key={l.color} color={l.color} horizontal>{l.title}</Label>)}
          </CardHeader>
          <Card.Content className="card-content">
          {this.props.clipboard.items.map(item => 
            <ClipboardItem key={item._id} item={item} id={this.props.clipboard._id}/>
          )}
          {/* todo Should not be possible to add if there is at least one emptty */}
          <button onClick={this.addItem.bind(this)}>Add item</button>
          
            {/* <Segment.Group className="segment-group">
                {this.props.clipboard.items.map(item => 
                <Segment onClick={(e) => this.copy( item.value, e)} key={item._id} secondary className="segment">
                    <Label size="small" attached="top right">{item.title}</Label>
                    <span>{item.value}</span>
                </Segment>
                )}
            </Segment.Group> */}
          </Card.Content>
        </CardWrapper>
      )
  }
}

Clipboard.propTypes = {
    clipboard: PropTypes.shape({
        title: PropTypes.string.isRequired,
        labels: PropTypes.arrayOf(PropTypes.string.isRequired),
        items: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })),
    }),
    labels: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    })),
    addItem: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
}

export default Clipboard
