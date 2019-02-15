// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { Modal, Button, Icon, Dropdown } from 'semantic-ui-react'
// import ClickableInput from './../shared/ClickableInput';
// import styled from "styled-components";

// const ItemsTable = styled.div`
// `
// const ItemsRow = styled.div`
//   &:not(:first-child) {
//     border-top: 1px solid lightgray;
//   }
//   display: grid;
//   grid-template-columns: 15rem auto;
//   grid-column-gap: 1rem;
// `

// const AddItemRow = styled.div`
//   cursor: pointer;
// `

// class EditClipboard extends PureComponent {
//   static propTypes = {
//     //   Maybe save prop type somewhere to reuse
//     clipboard: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         labels: PropTypes.arrayOf(PropTypes.string.isRequired),
//         items: PropTypes.arrayOf(PropTypes.shape({
//             title: PropTypes.string.isRequired,
//             value: PropTypes.string.isRequired,
//         })),
//     }),
//     save: PropTypes.func.isRequired,
//     cancel: PropTypes.func.isRequired,
//     onTitleChange: PropTypes.func.isRequired,
//     onItemChange: PropTypes.func.isRequired,
//     labels: PropTypes.arrayOf(PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       color: PropTypes.string.isRequired,
//   })),
// // add ptypes
//   }
//  renderLabel = label => ({
//     color: label.color,
//     content: label.text,
//   })

//   render() {
//     const {clipboard,
//       save,
//       cancel,
//       onTitleChange,
//       onItemChange,
//       labels,
//       onLabelChange,
//       selectedLabels
//     } = this.props;
//     return (
//       <Modal open={true}>
//       <Modal.Content>
//         <ClickableInput value={clipboard.title} onChange={(v) => onTitleChange(v)}/>
//         <Dropdown onChange={onLabelChange}
//         renderLabel={this.renderLabel}
//         fluid multiple search selection
//         value={selectedLabels}
//         options={labels.map(l => ({
//           key: l._id,
//           value: l._id,
//           text: l.title,
//           color: l.color
//         }))} />
//         <ItemsTable>
//           {clipboard.items.map(item => 
//             <ItemsRow key={item._id}>
//             <ClickableInput value={item.title} onChange={v => onItemChange(item._id, {title: v})}/>
//             <ClickableInput bordered fill value={item.value} onChange={v => onItemChange(item._id, {value: v})}/>
//           </ItemsRow>)}
//           <AddItemRow >Add</AddItemRow>
//         </ItemsTable>
//       </Modal.Content>
//       <Modal.Actions>
//           <Button color='green' onClick={() => save()}>
//             <Icon name='checkmark' />Save
//           </Button>
//           <Button onClick={cancel} >
//             <Icon name='close' />Cancel
//           </Button>
//         </Modal.Actions>
//       </Modal>
//     )
//   }
// }

// export default EditClipboard;