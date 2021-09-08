import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class Approvals extends React.Component {
    render() {
        return (
            <Container className="approvals-container">
                <p>Here are some examples from our database</p>
                <Row>
                    <Col>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Short Name</th>
                                    <th>Long Name</th>
                                    <th>Url</th>
                                    <th>Profile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.approvals && this.props.approvals.map(label => {
                                    return <tr key={label.rowKey} onClick={() => this.props.handleChange({
                                        rowKey: label.rowKey,
                                        shortName: label.shortName,
                                        longName: label.longName,
                                        url: label.url,
                                        profile: label.profile
                                    })}>
                                        <td>{label.shortName}</td>
                                        <td>{label.longName}</td>
                                        <td>{label.url === null ? '' : label.url.substring(0, 19)}</td>
                                        <td>{label.profile === null ? '' : label.profile.substring(0, 30)}</td>
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
            rowKey: '',
            profile: ''
        };

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.getLabelApprovalsUrl = process.env.REACT_APP_URL_GET_LABEL_APPROVALS;
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
        fetch(this.getLabelApprovalsUrl, {
            "method": "GET"
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
                    <Col className="col-md-6">
                        <h1 className="display-1 text-center">Record Label Drop Spot</h1>
                        <form className="d-flex flex-column">
                            <legend className="welcome-text">Do you have a record label or music company?
                                We would like to know about it! Please tell us all about it so we can
                                get you in the mix with all the big dogs!</legend>
                            <label htmlFor="shortName">
                                Word or phrase that uniquely identifies the company
                                <span className="example-text">&nbsp;(example: Blue Note)</span>
                                <input
                                    name="shortName"
                                    id="shortName"
                                    type="text"
                                    className="form-control-single-value"
                                    value={this.state.shortName}
                                    onChange={(e) => this.handleChange({ shortName: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="longName">
                                Full label or company name
                                <span className="example-text">&nbsp;(example: Blue Note Records)</span>
                                <input
                                    name="longName"
                                    id="longName"
                                    type="text"
                                    className="form-control-single-value"
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
                                    className="form-control-single-value"
                                    value={(this.state.url === undefined) ? "" : this.state.url}
                                    onChange={(e) => this.handleChange({ url: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="profile">
                                Profile
                                <textarea
                                    name="profile"
                                    id="profile"
                                    rows="6"
                                    maxLength="10000"
                                    className="form-control-multi-line"
                                    value={(this.state.profile === undefined) ? "" : this.state.profile}
                                    onChange={(e) => this.handleChange({ profile: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="rowKey" className="rowKeyExposé">
                                Row Key:
                                <input
                                    name="rowKey"
                                    id="rowKey"
                                    type="text"
                                    className="form-control-single-value disabled"
                                    value={this.state.rowKey}
                                    onChange={(e) => this.handleChange({ rowKey: e.target.value })}
                                    readOnly
                                />
                            </label>
                        </form>
                        <Container className="three-button-row">
                            <Row>
                                <Col className="col-md-4">
                                    <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                                        Add
                                    </button>
                                </Col>
                                <Col className="col-md-4">
                                    <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                                        Update
                                    </button>
                                </Col>
                                <Col className="col-md-4">
                                    <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                                        Delete
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                        <Approvals approvals={this.state.approvals} handleChange={this.handleChange} />
                    </Col>
                </Row>
            </Container>
        );
    }
}