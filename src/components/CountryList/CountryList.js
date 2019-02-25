import React, {Component} from 'react';
import './CountryList.css'

class CountryList extends Component {
    render() {
        return (
            <div className='country_name' onClick={this.props.clicked}>{this.props.name}</div>
        )
    }
}

export default CountryList;