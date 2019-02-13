import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Header, Image, Modal } from 'semantic-ui-react'

class EditClipboard extends PureComponent {
  static propTypes = {
    //   Maybe save prop type somewhere to reuse
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
    }),
    editing: PropTypes.bool.isRequired
  }

  render() {
    return (
      <Modal open={this.props.editing}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>We've found the following gravatar image associated with your e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
  }
}

export default EditClipboard;