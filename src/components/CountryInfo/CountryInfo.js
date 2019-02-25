import React, {Component} from 'react';
import axios from 'axios';

class CountryInfo extends Component {
    state = {
        loadedCountry: null,
        borders: []
    };

    componentDidUpdate() {
        if (this.props.country) {
            if (!this.state.loadedCountry || (this.state.loadedCountry && this.state.loadedCountry.alpha3Code !== this.props.country)) {
                axios.get('alpha/' + this.props.country)
                    .then(response => {
                        const borders = response.data.borders.map(element => {
                            return axios.get('alpha/' + element).then(response => {
                                return response.data
                            });
                        });
                        return Promise.all(borders).then(border => this.setState({
                            loadedCountry: response.data,
                            borders: [...border]
                        }))

                    })
            }
        }
    }


    render() {
        if (this.state.loadedCountry) {
            return (
                <div className='info'>
                    <h1 className='choosed_contry'>Country name: {this.state.loadedCountry.name}</h1>
                    <img src={this.state.loadedCountry.flag} className='flag' alt=''/>
                    <p className='detailedinfo'>Capital: {this.state.loadedCountry.capital}</p>
                    <p className='detailedinfo'>Code: {this.state.loadedCountry.alpha3Code}</p>
                    <p className='detailedinfo'>Area: {this.state.loadedCountry.area}</p>
                    <p className='detailedinfo'>Numeric code: {this.state.loadedCountry.numericCode}</p>
                    {/*<p className='detailedinfo'>Languages: {this.state.loadedCountry.languages}</p>*/}
                    <p className='detailedinfo'>Region: {this.state.loadedCountry.region}</p>
                    <p className='detailedinfo'>TimeZone: {this.state.loadedCountry.timezones}</p>
                    <p className='detailedinfo'>Domain: MySiteExample{this.state.loadedCountry.topLevelDomain}</p>
                    <div className='detailedinfo'>Borders with:
                        <ul>
                            {this.state.borders.map(border => {
                                return <li key={border.alpha3Code}>{border.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
            );
        }
        return <p className='empty_info'>Please choose some country</p>;
    }
}

export default CountryInfo;