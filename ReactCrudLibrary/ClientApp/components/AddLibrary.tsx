import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { LibraryData } from './FetchLibrary';

interface AddLibraryDataState {
    title: string;
    loading: boolean;
    cityList: Array<any>;
    libData: LibraryData;
}

export class AddLibrary extends React.Component<RouteComponentProps<{}>, AddLibraryDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cityList: [], libData: new LibraryData };

        fetch('api/Library/GetCityList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ cityList: data });
            });

        var libid = this.props.match.params["libid"];

        // This will set state for Edit library
        if (libid > 0) {
            fetch('api/Library/Details/' + libid)
                .then(response => response.json() as Promise<LibraryData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, libData: data });
                });
        }

        // This will set state for Add library
        else {
            this.state = { title: "Create", loading: false, cityList: [], libData: new LibraryData };
        }

        // This binding is necessary to make "this" work in the callback
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cityList);

        return <div>
            <h1>{this.state.title}</h1>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit library.
        if (this.state.libData.libraryId) {
            fetch('api/Library/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchlibrary");
                })
        }

        // POST request for Add library.
        else {
                fetch('api/Library/Create', {
                    method: 'POST',
                    body: data,

                }).then((response) => response.json())
                    .then((responseJson) => {
                        this.props.history.push("/fetchlibrary");
                    })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchlibrary");
    }

    // Returns the HTML Form to the render() method.
    private renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="libraryId" value={this.state.libData.libraryId} />
                </div>
                < div className="form-group row" >
                    <label className="control-label col-md-12" htmlFor="LibraryName">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="LibraryName" defaultValue={this.state.libData.libraryName} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Category">Category</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="Category" defaultValue={this.state.libData.category} required>
                            <option value="">-- Select --</option>
                            <option value="Government">Government</option>
                            <option value="Health">Health</option>
                            <option value="Law">Law</option>
                            <option value="Music Hire">Music Hire</option>
                            <option value="Tertiary">Tertiary</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" defaultValue={this.state.libData.city} required>
                            <option value="">-- Select --</option>
                            {cityList.map(city =>
                                <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Symbol">Symbol</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Symbol" defaultValue={this.state.libData.symbol} />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit"
                            className="main-btn main-small main-white main-border main-border-black main-round-large main-hover-black main-width mr-2">
                        Save
                    </button>
                    <button className="main-btn main-small main-grey main-border main-border-grey main-round-large main-hover-grey main-width" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}