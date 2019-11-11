import React from "react";
import { AppState } from "../store/configStore";
import { connect } from "react-redux";
import { AppActions } from "../types/actions";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { getWeather } from "../actions/actions";
import { Button, FormControl } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Country } from '../types/Country';

interface IState {
    country: Country;
    searchText: string
};

interface IFormProps {
    countries: Country[];
}

interface IDispatchProps {
    getWeather: (country: string, city: string) => void;
}

interface IProps extends IFormProps, IDispatchProps {}

class Form extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            country: {} as Country,
            searchText: ""
        }
    };

    handleSubmit = async (e: any) => {
        e.preventDefault();
        if (this.state.searchText && this.state.country)
            this.props.getWeather(this.state.country.ID, this.state.searchText);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <Typeahead
                                id="country"
                                labelKey="EnglishName"
                                options={this.props.countries}
                                onChange={(s) => this.setState({ country: s[0] } as IState)}
                                placeholder="Country..."
                            />
                        </div>
                        <div className="col-sm-4 form-group field">
                            <FormControl id="city" type="text" name="city" onChange={(e: any) => this.setState({ searchText: e.target.value })} placeholder="  City... " />
                        </div>
                        <div className="col-sm-2 form-group field">
                            <Button variant="primary" type="submit"> Go </Button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
};

const mapStateToProps = (state: AppState) : IFormProps =>({
    countries : state.countries
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): IDispatchProps => ({
    getWeather: bindActionCreators(getWeather, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (Form)