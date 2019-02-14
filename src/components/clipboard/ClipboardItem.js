import React, { PureComponent } from 'react'
import { Segment, Card , Label, Icon} from 'semantic-ui-react'
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
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

const CardAction = styled(Icon)`
    &&&.ml-auto {
        margin-left: auto;
    }
`

class ClipboardItem extends PureComponent {
    state = {
        hovering: false
    };

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

  render() {
      const showActions = this.state.hovering;
      return (
        <CardWrapper fluid color='black' raised  
        onMouseEnter={() => this.handleMouseHover()}
        onMouseLeave={() => this.handleMouseHover()}>
          <CardHeader>
              <CardTitle>{this.props.clipboard.title}</CardTitle>
              {this.props.labels
                .filter(l => this.props.clipboard.labels.includes(l._id))
                .map(l => <Label key={l.color} color={l.color} horizontal>{l.title}</Label>)}
              {showActions && <React.Fragment>
                <CardAction onClick={() => this.props.edit(this.props.clipboard)} link className="ml-auto" circular name="edit"/>
                <CardAction link circular name="remove"/>
              </React.Fragment>}
          </CardHeader>
          <Card.Content className="card-content">
            <Segment.Group className="segment-group">
                {this.props.clipboard.items.map(item => 
                <Segment onClick={(e) => this.copy( item.value, e)} key={item._id} secondary className="segment">
                    <Label size="small" attached="top right">{item.title}</Label>
                    <span>{item.value}</span>
                </Segment>
                )}
            </Segment.Group>
          </Card.Content>
        </CardWrapper>
      )
  }
}

ClipboardItem.propTypes = {
    clipboard: PropTypes.shape({
        title: PropTypes.string.isRequired,
        labels: PropTypes.arrayOf(PropTypes.string.isRequired),
        items: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })),
    }),
    edit: PropTypes.func.isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    }))
}

export default ClipboardItem
