import React from 'react'
import { Segment, Card , Label} from 'semantic-ui-react'
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const CardWrapper = styled(Card)`
    &&& .card-content {
        padding: 0.5em 1em;
    }

    &&& .segment {
        padding: 0.5em 1em;
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
line-height: 1.5em;
    font-size: 1em;
    margin-right: 1em;
`

const ClipboardItem = ({clipboard}) => {
  return (
    <CardWrapper fluid color='black' raised>
      <CardHeader>
          <CardTitle>{clipboard.title}</CardTitle>
          {clipboard.labels.map((label) => <Label key={label.color} color={label.color} horizontal>{label.title}</Label>)}
      </CardHeader>
      <Card.Content className="card-content">
        <Segment.Group className="segment-group">
            {clipboard.items.map(item => 
            <Segment key={item._id} secondary className="segment">
                <Label size="small" attached="top right">{item.title}</Label>
                <span>{item.value}</span>
            </Segment>
            )}
        </Segment.Group>
      </Card.Content>
    </CardWrapper>
  )
}

ClipboardItem.propTypes = {
    clipboard: PropTypes.shape({
        title: PropTypes.string.isRequired,
        labels: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
        })),
        items: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })),
    })
}

export default ClipboardItem
