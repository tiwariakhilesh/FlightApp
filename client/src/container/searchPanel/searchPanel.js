import React,{Component} from 'react';
import Button from '../../components/Button/Button';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
import classes from './searchPanel.css'
class  searchPanel extends Component{
    state={
        returnDate:false,
        slideVal:null,
        errorMessage:false,
        searchForm:{
            startDate:moment(),
            endDate:moment().add(1, "day"),
            source:'',
            destination:'',
            numOfPessenger:1
        }
    }
    inputChangeHandler=(e)=>{
        const value= e.target.value;
        const name= e.target.name;

        this.setState({
            searchForm:{
                ...this.state.searchForm,
                [name]:value
            },
            errorMessage:false
        })
    }
    onSlideHandler=(e)=>{
        this.setState({
            slideVal:e.target.value
        })
        this.props.onSlide(e.target.value);
    }
    handleStartDateChange=(date)=> {
        this.setState({
            searchForm:{
                ...this.state.searchForm,
                startDate:date
            }
        });
      }
      handleEndDateChange=(date)=> {
        this.setState({
            searchForm:{
                ...this.state.searchForm,
                endDate:date
            }
        });
      }
      onSearchHandler=(e)=>{
          e.preventDefault();
          if(this.checkValidity(this.state.searchForm)){
            this.props.onSearch(this.state.searchForm, this.state.returnDate);
          }
          else{
              this.setState({
                  errorMessage:true
              })
          }
          
      }
   
    oneWayHandler=()=>{
        this.setState({
            returnDate: false
        });
    }
    twoWayHandler=()=>{
        this.setState({
            returnDate: true
        });
    }
    checkValidity=(inputs)=>{
        let isValid = true;
        for( let value in inputs){ 
            isValid = inputs[value].toString().trim() !== "" && isValid;    
        }
        return isValid;
    }
  
    render(){
        return(
            <div className={classes.searchPanel}>
                    <Button clicked={this.oneWayHandler} btnType="Success">One way</Button> 
                    <Button clicked={this.twoWayHandler} btnType="Success">Two way</Button>
                <form className="searchForm" onSubmit={this.onSearchHandler}>
                     <label>
                        Source
                        <input type="text" name="source" value={this.state.searchForm.source} 
                        placeholder="Enter Your City" onChange={this.inputChangeHandler}/>
                     </label>

                     <label>
                         Destination
                        <input type="text" name="destination" value={this.state.searchForm.destination} 
                        placeholder="Enter your destination" onChange={this.inputChangeHandler}/>
                     </label>
                        <label>
                        Depart Date
                        <DatePicker
                            selected={this.state.searchForm.startDate}
                            selectsStart
                            startDate={this.state.searchForm.startDate}
                            endDate={this.state.searchForm.endDate}
                            onChange={this.handleStartDateChange}
                            minDate={moment()}
                            maxDate={moment().add(5, "months")}
                            showDisabledMonthNavigation 
                        />
                        </label>
                        
                            { this.state.returnDate ? <label>
                                Return Date
                            <DatePicker
                                selected={this.state.searchForm.endDate}
                                selectsEnd
                                startDate={this.state.searchForm.startDate}
                                endDate={this.state.searchForm.endDate}
                                onChange={this.handleEndDateChange}
                                minDate={moment()}
                                showDisabledMonthNavigation 
                            /></label>:null} 
                        
                        <label>Number of Pessengers
                            <input name="numOfPessenger" type= "number" 
                            value={this.state.searchForm.numOfPessenger} onChange={this.inputChangeHandler}/>
                        </label>

                        <Button btnType="Danger" type="submit" >Search</Button>
                        {this.state.errorMessage ? 
                        <p style={{fontWeight:'bold',color:'red'}}>Please fill all the inputs</p>: null}

                        <input type="range" list="tickmarks" min="30000" max="100000" step="1000" 
                         className={classes.slider} onChange={this.onSlideHandler}/>

                            <datalist id="tickmarks">
                                <option value="3000"/>
                                <option value="5000"/>
                                <option value="30000"/>
                            </datalist>
                            <p>{this.state.slideVal}</p>
            </form>
            </div> 
         )
    }
    
}

export default searchPanel;