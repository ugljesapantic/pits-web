import React, { Component } from 'react'
import { connect } from 'react-redux'

export class DairyPage extends Component {

  render() {
    return (
      <div>
        my dairy
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(DairyPage)
