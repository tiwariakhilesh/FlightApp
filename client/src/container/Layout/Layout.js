import React , {Component} from 'react';
import Header from '../../components/Header';
import SearchPanel from '../searchPanel/searchPanel';
import Aux from '../../hoc/Auxillary';
import moment from 'moment';
import flightData from '../../data/flightData.json';
import SearchResults from '../../components/searchResults/searchResults';
import classes from './Layout.css';
import SearchResultsHeader from '../../components/searchResults/searchResultsHeader'

class Layout extends Component{
    state={
        singleTrip:[],
        returnTrip:[],
        loading: false,
        numOfPes:1,
        slideValue:3000,
        twoWay:false,
        searchInputs:null

    }
    onSlide=(slideValue)=>{
        this.setState({
            slideValue:slideValue
        })
    }
    onSearch=(searchInputs, twoWay )=>{ 
        let roundTripResults = null;
        
        const filterData= flightData.filter(el=>{
            return (el.sourceCity.toLowerCase() === searchInputs.source.toLowerCase()) &&
             (el.destinationCity.toLowerCase() === searchInputs.destination.toLowerCase()) &&
             (el.departDate === moment(searchInputs.startDate).format('MM/DD/YYYY'))
        })
        
        if(twoWay){
            roundTripResults= flightData.filter(el=>{
                return (el.sourceCity.toLowerCase() === searchInputs.destination.toLowerCase()) &&
                (el.destinationCity.toLowerCase() === searchInputs.source.toLowerCase()) &&
                (el.departDate === moment(searchInputs.endDate).format('MM/DD/YYYY'))
            })
        }
        this.setState({
            singleTrip:filterData,
            returnTrip:roundTripResults,
            loading:true,
            numOfPes:searchInputs.numOfPessenger,
            twoWay:twoWay,
            searchInputs:searchInputs
        })
        
    }
    render(){ 
    
        return(
            <Aux>
                <Header/>
                <SearchPanel onSearch={this.onSearch} onSlide={this.onSlide}/>
                <div className={classes.searchBox}>
                {this.state.loading ? 
                <Aux>
                <SearchResultsHeader twoWay={this.state.twoWay} searchInputs={this.state.searchInputs}/>
                <SearchResults singleTrip={this.state.singleTrip}
                    returnTrip={this.state.returnTrip} numOfPes= {this.state.numOfPes} 
                    slideVal={this.state.slideValue} twoway={this.state.twoWay}/>
                </Aux> : <h2 className={classes.heading}>Flight Results will be shown here</h2>}  
                </div>
            </Aux>
        )
    }
}

export default Layout;
