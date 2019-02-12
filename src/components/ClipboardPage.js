import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAll } from './../actions';

class ClipboardPage extends Component {

    componentDidMount() {
        this.props.loadAll();
    }

    render() {
        console.log('render me', this.props.clipboards)
        return (
            <div>Welcome to the clipboard</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        clipboards : state.clipboard.clipboards
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      loadAll: () => {
        dispatch(loadAll())
      },
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ClipboardPage);
  