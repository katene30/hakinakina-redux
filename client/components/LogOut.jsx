import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { getLogs,signOut } from '../actions/logs';
import Thead from './Thead'
const {DateTime} = require('luxon')


class Logs extends Component {
    constructor(props){
        super(props)

        this.state={
            pendingLogs : [],
            log: {},
            confirm: false
        }
        this.getLogs = this.getLogs.bind(this)
        this.signOut = this.signOut.bind(this)
        this.confirm = this.confirm.bind(this)
    }

    componentDidMount(){
        this.getLogs()
    }

    getLogs(){
        this.props.dispatch(getLogs())
        .then(() => {
            const pendingLogs = this.props.logs.filter(log => {
                return !log.time_out
            })
            this.setState({pendingLogs:pendingLogs.reverse()})
        })
    }

    signOut(log){
        if(this.state.log.id == log.id){
            this.setState({confirm:false,log:{}})
        }else{
            this.setState({confirm:true,log})
        }
    }

    confirm(log){
        this.props.dispatch(signOut(log))
        .then(() => {
            this.getLogs()
        })
    }

  render() {
    return (
      <Fragment>
        <table className="table table-hover table-fixed">
          <Thead />
          <tbody>
            {this.state.pendingLogs.map((log,i) => {
            let active = false
            if(this.state.log.id == log.id){
                active = true
            }
            return(
                <tr key={i} className={active ? 'table-success' : undefined} onClick={() => this.signOut(log)}>
                  <td>{log.id}</td>
                  <td>{log.time_in ? DateTime.fromISO(log.time_in).toLocaleString() : 'invalid'}</td>
                  <td>{log.service}</td>
                  <td>{log.name}</td>
                  <td>{log.reference}</td>
                  <td>{log.time_in ? DateTime.fromISO(log.time_in).toLocaleString(DateTime.TIME_WITH_SECONDS) : 'invalid'}</td>
                  <td>Pending</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='row fixed-bottom bg-dark align-items-center'>
            {this.state.confirm &&
            <Fragment>
                <div className='col text-light mx-5 px-5'>
                    <h3>{this.state.log.name}</h3>
                </div>
                <div className='col text-left'>
                    <button className='btn btn-light' onClick={() => this.confirm(this.state.log)}>Sign Out</button>
                </div>
            </Fragment>
            }
            <div className='col'>
                <Link to='/' className="btn btn-primary btn-lg my-2 ml-2">Home</Link>
            </div>
        </div>
      </Fragment>
    )
  }
}


function mapStateToProps(state){
  return {
      logs: state.logs
  }
}


export default connect(mapStateToProps)(Logs)