import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAll } from '../../actions';
import ClipboardItem from './ClipboardItem';
import EditClipboard from './EditClipboard';

class ClipboardPage extends Component {

    state = {
        editing: false
    }

    componentDidMount() {
        this.props.loadAll();
    }

    edit() {
        this.setState({editing: true});
    }

    render() {
        const {editing} = this.state
        return (
            <div>
                {this.props.clipboards.map((clipboard) => 
                <ClipboardItem 
                edit={this.edit.bind(this)}
                key={clipboard._id}
                clipboard={clipboard}/>
                )}
                <EditClipboard editing={editing}/>
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
  