import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class Approvals extends React.Component {
    render() {
        return (
            <Container className="tit">
                <Row>
                    <Col>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Short Name</th>
                                    <th>Long Name</th>
                                    <th>Website</th>
                                    <th>Profile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.approvals && this.props.approvals.map(label => {
                                    return <tr key={label.shortName} onClick={() => this.props.handleChange({
                                        id: label.shortName,
                                        shortName: label.shortName,
                                        longName: label.longName,
                                        url: label.url,
                                        profile: label.profile
                                    })}>
                                        <td>{label.shortName}</td>
                                        <td>{label.shortName}</td>
                                        <td>{label.longName}</td>
                                        <td>{label.url}</td>
                                        <td>{label.profile}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default class LabelBackstop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            approvals: [],
            shortName: '',
            longName: '',
            url: '',
            id: '',
            profile: ''
        };

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.labelApprovalsUrl = "http://localhost:7071/api/LabelApprovals_GetAllDocuments";
    }

    componentDidMount() {
        this.refreshApprovedList();
    }

    create(e) {
        // add entity - POST
        e.preventDefault();

        fetch("https://fairestdb.p.rapidapi.com/friend/friendThingy", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-rapidapi-key": "35f1a08d2fmsh66d83831b1862f9p109684jsna71723599f77",
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                name: this.state.shortName,
                notes: this.state.profile
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.refreshApprovedList();
            })
            .catch(err => {
                console.error(err);
            });
    }

    update(e) {
        // update entity - PUT
        e.preventDefault();

        fetch("https://fairestdb.p.rapidapi.com/friend/friendThingy", {
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "x-rapidapi-key": "35f1a08d2fmsh66d83831b1862f9p109684jsna71723599f77",
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                _id: this.state.id,
                name: this.state.shortName,
                notes: this.state.profile
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.refreshApprovedList();
            })
            .catch(err => {
                console.error(err);
            });
    }

    delete(e) {
        // delete entity - DELETE
        e.preventDefault();

        fetch(`https://fairestdb.p.rapidapi.com/friend/friendThingy/_id/${this.state.id}`, {
            "method": "DELETE",
            "headers": {
                "x-rapidapi-key": "35f1a08d2fmsh66d83831b1862f9p109684jsna71723599f77",
                "x-rapidapi-host": "fairestdb.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.refreshApprovedList();
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleChange(changeObject) {
        this.setState(changeObject)
    }

    refreshApprovedList() {
        // get all entities - GET
        fetch(this.labelApprovalsUrl, {
            // "method": "GET",
            // "headers": {
            //     "x-rapidapi-key": "35f1a08d2fmsh66d83831b1862f9p109684jsna71723599f77",
            //     "x-rapidapi-host": "fairestdb.p.rapidapi.com"
            // }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    approvals: response
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col className="col-md-8">
                        <h1 className="display-4 text-center">Record Label Drop Spot</h1>
                        <form className="d-flex flex-column">
                            <legend className="text-center">Submit a record label or music company</legend>
                            <label htmlFor="shortName">
                                Short Name
                                <input
                                    name="shortName"
                                    id="shortName"
                                    type="text"
                                    className="form-control"
                                    value={this.state.shortName}
                                    onChange={(e) => this.handleChange({ shortName: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="longName">
                                Long Name
                                <input
                                    name="longName"
                                    id="longName"
                                    type="text"
                                    className="form-control"
                                    value={this.state.longName}
                                    onChange={(e) => this.handleChange({ longName: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="url">
                                Website
                                <input
                                    name="url"
                                    id="url"
                                    type="text"
                                    className="form-control"
                                    value={(this.state.url === undefined) ? "" : this.state.url}
                                    onChange={(e) => this.handleChange({ url: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="profile">
                                Profile
                                <input
                                    name="profile"
                                    id="profile"
                                    type="text"
                                    className="form-control"
                                    value={(this.state.profile === undefined) ? "" : this.state.profile}
                                    onChange={(e) => this.handleChange({ profile: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="id">
                                Friend ID:
                                <input
                                    name="id"
                                    id="id"
                                    type="text"
                                    className="form-control"
                                    value={this.state.id}
                                    onChange={(e) => this.handleChange({ id: e.target.value })}
                                    readOnly
                                />
                            </label>
                            <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                                Add
                            </button>
                            <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                                Update
                            </button>
                            <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                                Delete
                            </button>
                        </form>
                        <Approvals approvals={this.state.approvals} handleChange={this.handleChange} />
                    </Col>
                </Row>
            </Container>
        );
    }
}