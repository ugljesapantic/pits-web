import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAll } from '../../actions';
import ClipboardItem from './ClipboardItem';

class ClipboardPage extends Component {

    componentDidMount() {
        this.props.loadAll();
    }

    render() {
        return (
            <div>
                {this.props.clipboards.map((clipboard) => <ClipboardItem key={clipboard._id} copy={this.copy} clipboard={clipboard}/>)}
            </div>
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
  