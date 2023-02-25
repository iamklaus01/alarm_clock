import React from "react"
import "../styles/Clock.css"

export default class Clock extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        session_length: 25,
        break_length: 5,
        is_counted: false,
        break_start: false,
        left : 25 * 60,
      };
      this.reset = this.reset.bind(this);
      this.start_stop = this.start_stop.bind(this);
      this.increment_session_length = this.increment_session_length.bind(this);
      this.decrement_session_length = this.decrement_session_length.bind(this);
      this.increment_break_length = this.increment_break_length.bind(this);
      this.decrement_break_length = this.decrement_break_length.bind(this);
  
    }
    reset(){
      this.setState({
        session_length: 25,
        break_length: 5,
        is_counted: false,
        break_start: false,
        left : 25 * 60,
      });
    }
    start_stop(){
      this.setState((state)=>{
        return{
          session_length: state.session_length,
          break_length: state.break_length,
          is_counted: !state.is_counted,
          break_start: state.break_start,
          left : state.left,
        };
      });
      setInterval(()=>{
        if(this.state.is_counted && this.state.left > 0){
          this.setState((state)=>{
            return{
              session_length: state.session_length,
              break_length: state.break_length,
              is_counted: state.is_counted,
              break_start: state.break_start,
              left : state.left -1,
            };
          })
        }else if(this.state.break_start && this.state.left >=0){
          this.setState((state)=>{
            return{
              session_length: state.session_length,
              break_length: state.break_length,
              is_counted: state.is_counted,
              break_start: state.break_start,
              left : state.left -1,
            };
          })
        }
        if(this.state.left === 0 && this.state.is_counted){
              this.setState((state)=>{
                return{
                  session_length: state.session_length,
                  break_length: state.break_length,
                  is_counted: false,
                  break_start: true,
                  left : state.break_length * 60,
                };
            });
          }else if(this.state.left === 0 && this.state.break_start){
          this.setState((state)=>{
            return{
              session_length: state.session_length,
              break_length: state.break_length,
              is_counted: true,
              break_start: false,
              left : state.session_length * 60,
            };
          });
        }
      }, 1000);
    }
    increment_session_length(){
      if(!this.state.is_counted && !this.state.break_start){
        if(this.state.session_length < 60 && this.state.session_length  >= 0){
          this.setState((state)=>{
            return{
              session_length: state.session_length + 1,
              break_length: state.break_length,
              is_counted: state.is_counted,
              break_start: state.break_start,
              left : (state.session_length+1)*60,
            };
          })
        }
        
      }
    }
    increment_break_length(){
      if(!this.state.is_counted && !this.state.break_start){
        if(this.state.break_length < 60 && this.state.break_length  >= 0){
          this.setState((state)=>{
            return{
              session_length: state.session_length,
              break_length: state.break_length + 1,
              is_counted: state.is_counted,
              break_start: state.break_start,
              left : (state.session_length)*60,
            };
          })
        }
        
      }
    }
    decrement_session_length(){
      if(!this.state.is_counted && !this.state.break_start){
        if(this.state.session_length <= 60 && this.state.session_length  > 0 && this.state.left > 60){
          this.setState((state)=>{
            return{
              session_length: state.session_length - 1,
              break_length: state.break_length,
              is_counted: state.is_counted,
              break_start: state.break_start,
              left : (state.session_length - 1)*60,
            };
          })
        }
      }
    }
    decrement_break_length(){
      if(!this.state.is_counted && !this.state.break_start){
        if(this.state.break_length <= 60 && this.state.break_length  > 1 && this.state.left > 60){
          this.setState((state)=>{
            return{
              session_length: state.session_length,
              break_length: state.break_length - 1,
              is_counted: state.is_counted,
              break_start: state.break_start,
              left : (state.session_length)*60,
            };
          })
        }
        
      }
    }
    
    render(){
      let timer_label = "Session";
      let minutes = Math.floor(this.state.left/60);
      let seconds = this.state.left%60;
      minutes = minutes.toString().length < 2 ? "0"+minutes.toString() : minutes;
      seconds = seconds.toString().length < 2 ? "0"+seconds.toString() : seconds
      if (this.state.is_counted) {
        timer_label = "Session";
      }else if(this.state.break_start){
        timer_label = "Break";
      }
      return(
        <div id="clock">
          <h2>25 + 5 Clock</h2>
          <div className="length-container">
            <div className="break-container">
              <p id="break-label">Break-Length</p>
              <span id="break-increment" className="fas fa-arrow-up" onClick={this.increment_break_length}></span>
              <span id="break-length">{this.state.break_length}</span>
              <span id="break-decrement" className="fas fa-arrow-down" onClick={this.decrement_break_length}></span>
            </div>
            <div className="session-container">
              <p id="session-label">Session-Length</p>
              <span id="session-increment" className="fas fa-arrow-up" onClick={this.increment_session_length}></span>
              <span id="session-length">{this.state.session_length}</span>
              <span id="session-decrement" className="fas fa-arrow-down" onClick={this.decrement_session_length}></span>
            </div>
          </div>
          <div className="timer-container"> 
            <p id="timer-label">
              {timer_label}
            </p>
            <p id="time-left">{minutes}:{seconds}</p>
          </div>
          <div className="buttons-actions">
            <span title="Pause/Play" id="start_stop" className="fas fa-pause" onClick={this.start_stop}><span className="fas fa-play"></span></span>
            <span title="reset" id="reset" className="fa fa-sync" onClick={this.reset}></span>
          </div>
        </div>
      );
    }
  }
  