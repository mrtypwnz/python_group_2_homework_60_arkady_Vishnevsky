import React, {Component, Fragment} from 'react';
import axios from 'axios';
import CountryList from '../../components/CountryList/CountryList';
import CountryInfo from "../../components/CountryInfo/CountryInfo";

class MainPage extends Component {
    state = {
        countries: [],
        selectedCountryId: null
    };

    componentDidMount() {
        axios.get('all?fields=name;alpha3Code;flag;borders').then(response => {
            const cities = response.data.map(country => {
                return axios.get('alpha/' + country.alpha3Code).then(response => {
                    return {...country, name: response.data.name};
                });
            });
            return Promise.all(cities);
        }).then(countries =>
            this.setState({countries})
        ).catch(error => {
            console.log(error);
        });
    }

    countrySelectedHandler = id => {
        this.setState({selectedCountryId: id});
    };

    getCountries = () => {
        return <div className='countries'>
            {
                this.state.countries.map((response) => {
                    return <CountryList key={response.alpha3Code} name={response.name}
                                        clicked={() => this.countrySelectedHandler(response.alpha3Code)}/>;
                })
            }
        </div>
    };

    render() {
        return (
            <Fragment>
                <CountryInfo country={this.state.selectedCountryId}/>
                {this.getCountries()}
            </Fragment>
        )
    }
}

export default MainPage;