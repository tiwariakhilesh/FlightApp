import React from 'react';
import classes from './searchResults.css'
import Aux from '../../hoc/Auxillary';
import AirplaneIcon from '../airplaneLogo/airPlane'

const searchResults =(props)=>{
    let  trip= null;
    let returnTripData= null;
    let totalPrice;
    
    
    if(props.singleTrip.length > 0){
        trip = props.singleTrip.map((element,key)=>{
            if(props.returnTrip){
                returnTripData = props.returnTrip[key];
            }

            if(returnTripData){
                totalPrice = (element.price + returnTripData.price) * props.numOfPes
            }
            else{
                totalPrice=element.price * props.numOfPes
            }
                 return (
                     
                     <Aux key={element.airlineId}>{totalPrice <= props.slideVal ? (<div className={classes.SearchResults} >
                        <h2 style={{textAlign:'left'}}>{totalPrice}</h2>
                                                                          
                        <div className={classes.Description}>
                                <div className={classes.OneWay}>
                                   <p>{element.airlineId}</p>
                                   <p>{element.sourceCity} > {element.destinationCity}</p>
                                   <p>Depart : {element.departTime}</p>
                                   <p>Arrival : {element.arrivalTime}</p>      
                               </div>
                            
                            {(returnTripData) ? (
                                <div className={classes.RoundTrip}>
                                <p>{returnTripData.airlineId}</p>
                                <p>{returnTripData.sourceCity} > {returnTripData.destinationCity}</p>
                                <p>Depart : {returnTripData.departTime}</p>
                                <p>Arrival : {returnTripData.arrivalTime}</p>
                            </div>): props.twoway ? <p>No return flights on selected dates</p>:null}
                             
                        </div>
                        <div className={classes.ImageBox}>{<AirplaneIcon/>}</div>
                       
                   </div>): <p className={classes.AvailabilityMessage}>No tickets in this price range</p>}</Aux>
                 )
         })
    }
    else{
        trip= <h2 className={classes.wrongData}>No flight available for entered data</h2>
    }
    
    
    return (
     <Aux>{trip}</Aux>
    )
}
export default searchResults;


        
   
    
