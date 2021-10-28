import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchLibraryDataState {
    libList: LibraryData[];
    loading: boolean;
}

export class FetchLibrary extends React.Component<RouteComponentProps<{}>, FetchLibraryDataState> {
    constructor() {
        super();
        this.state = { libList: [], loading: true };

        fetch('api/Library/Index')
            .then(response => response.json() as Promise<LibraryData[]>)
            .then(data => {
                this.setState({ libList: data, loading: false });
            });

        //Binding for making "this" work during the callback
        this.handleDelete = this.handleDelete.bind(this);
        //this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading items...</em></p>
            : this.renderLibraryTable(this.state.libList);

        return <div>
            <h1>Manage Libraries</h1>
            <p>This portal manages the Libraries from key cities</p>
            <br />
            <p>
                <Link className="main-btn main-black main-font-size" to="/addlibrary">Add Library</Link>
            </p>
            
            {contents}
        </div>;
    }

    //Handles the deletion for a library
    private handleDelete(id: number) {
        if (!confirm("Do you wish to remove the Library ID " + id + "?"))
            return;
        else {
            fetch('api/Library/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        libList: this.state.libList.filter((rec) => {
                            return (rec.libraryId != id);
                        })
                    });
            });
        }
    }

    //private handleEdit(id: number) {
    //    this.props.history.push("/library/edit/" + id);
    //}

    //It returns this table (which is in HTML) to the render()
    private renderLibraryTable(libList: LibraryData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Library ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>City</th>
                    <th className="text-center">Symbol</th>
                </tr>
            </thead>
            <tbody>
                {libList.map(lib =>
                    <tr key={lib.libraryId}>
                        <td></td>
                        <td>{lib.libraryId}</td>
                        <td>{lib.libraryName}</td>
                        <td>{lib.category}</td>
                        <td>{lib.city}</td>
                        <td className="text-center">{lib.symbol}</td>
                        <td>
                            <a className="main-btn main-small main-red main-border main-border-red main-round-large main-hover-red main-width"
                                    onClick={(id) => this.handleDelete(lib.libraryId)}>Remove</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class LibraryData {
    libraryId: number = 0;
    libraryName: string = "";
    category: string = "";
    city: string = "";
    symbol: string = "";
}