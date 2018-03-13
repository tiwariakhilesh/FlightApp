import React from 'react';
import classes from './searchResults.css';
import moment from 'moment';

const searchResultsHeader= (props)=>{
    console.log(props.searchInputs);
    return(
        <div className={classes.SearchResultsHeader}>
        <p className={classes.cityName}>{props.searchInputs.source} > {props.searchInputs.destination}</p>
        {props.twoWay ? <p className={classes.cityName}> > {props.searchInputs.source}</p> : null}
        <div className={classes.DateBox}>
            <p> {moment(props.searchInputs.startDate).format('MM/DD/YYYY')}</p>
            <p> {moment(props.searchInputs.endDate).format('MM/DD/YYYY')}</p>
        </div>
        </div>
    )
}
export default searchResultsHeader;