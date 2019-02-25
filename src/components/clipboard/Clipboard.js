import React, { PureComponent } from 'react'
import { Dropdown, Card , Label, Icon} from 'semantic-ui-react'
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import ClipboardItem from './ClipboardItem';
import ClickableEditableText from './../shared/ClickableEditableText';
// TODO get rid of all of them
const CardWrapper = styled(Card)`
    &&& .card-content {
        padding: 0.5em 1em;

        & > div {
            margin: 0.1em 0;
        }
    }

    &&& .segment {
        padding: 0.5em 1em;
        cursor: pointer;
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

const LabelsWrapper = styled.div`
    
`;

const ClipboardActions = styled.div`
    margin-left: auto;
`

class Clipboard extends PureComponent {

    state = {
        editingLabels: false,
        labels: this.props.clipboard.labels,
        saving: false
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

    onLabelsChange(e, data) {
        this.setState({labels: data.value})
    }

    onLabelsChanged() {
        this.setState({saving: true})
        this.props
        .update(this.props.clipboard._id, {labels: this.state.labels})
        .then(() => {
            this.setState({editingLabels: false, saving: false});
        })
    }

  render() {
      return (
        <CardWrapper fluid color='black' raised>
          <CardHeader>
            <ClickableEditableText
            value={this.props.clipboard.title}
            save={this.onTitleChange.bind(this)}/>
            {this.state.editingLabels ? 
            <Dropdown 
            defaultOpen={true}
            value={this.state.labels}
            onClose={this.onLabelsChanged.bind(this)}
            onChange={this.onLabelsChange.bind(this)}
            searchInput={{ autoFocus: true }}
            disabled={this.state.saving}
            fluid multiple search selection 
            options={this.props.labels.map(l => ({key: l._id, value: l._id, text: l.title}))} /> : 
            <LabelsWrapper>
                {this.props.labels
                    .filter(l => this.props.clipboard.labels.includes(l._id))
                    .map(l => <Label key={l._id} color={l.color} horizontal>{l.title}</Label>)
                    }
                    {/* todo show tooltip like manage labels */}
            <Icon onClick={() => this.setState({editingLabels: true})} link circular name="edit"/>
            </LabelsWrapper>
        }
        {/* todo SHOW TOOLTIP */}
            <ClipboardActions>
                <Icon onClick={this.props.remove.bind(this, this.props.clipboard._id)} link circular name="trash"/>
            </ClipboardActions>
          </CardHeader>
          <Card.Content className="card-content">
          {this.props.clipboard.items.map(item => 
            <ClipboardItem key={item._id} item={item} id={this.props.clipboard._id}/>
          )}
          {/* todo Should not be possible to add if there is at least one emptty */}
          <button onClick={this.addItem.bind(this)}>Add item</button>
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
    remove: PropTypes.func.isRequired,
}

export default Clipboard
