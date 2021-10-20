import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import InputForm from './InputForm.js';
import ApprovalsViewer from './ApprovalsViewer.js';

export default class LabelBackstop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            approvals: [],
            approvalsSubheader: 'Here are some approved examples from our database',
            rowKey: '',
            shortName: '',
            longName: '',
            url: '',
            profile: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.checkForSimilar = this.checkForSimilar.bind(this);

        this.urlGetLabelApprovals = process.env.REACT_APP_URL_GET_LABEL_APPROVALS;
        this.urlCreate = process.env.REACT_APP_URL_CREATE;
        this.urlUpdate = process.env.REACT_APP_URL_UPDATE_BASE;
        this.urlDelete = process.env.REACT_APP_URL_DELETE_BASE;
        this.urlCheckSimilar = process.env.REACT_APP_URL_CHECK_SIMILAR;
    }

    componentDidMount() {
        this.refreshApprovedList();
    }

    create(e) {
        // add entity - POST
        e.preventDefault();

        fetch(this.urlCreate, {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                shortName: this.state.shortName,
                longName: this.state.longName,
                url: this.state.url,
                profile: this.state.profile
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.handleSubmission(this.state.shortName);
        })
        .catch(err => {
            console.error(err);
        });
    }

    update(e) {
        // update entity - PUT
        e.preventDefault();

        fetch(this.urlUpdate, {
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                rowKey: this.state.rowKey,
                shortName: this.state.shortName,
                longName: this.state.longName,
                url: this.state.url,
                profile: this.state.profile
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // this.refreshApprovedList();
        })
        .catch(err => {
            console.error(err);
        });
    }

    delete(e) {
        // delete entity - DELETE
        e.preventDefault();

        fetch(this.urlDelete, {
            "method": "DELETE"
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // this.refreshApprovedList();
        })
        .catch(err => {
            console.error(err);
        });
    }

    checkForSimilar(e) {
        // query for approved labels that begin with same shortName text - POST
        e.preventDefault();

        fetch(this.urlCheckSimilar, {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                shortName: this.state.shortName
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.length === 0) {
                this.setState({
                    approvalsSubheader: "We don't seem to have that one yet. Fire away!"
                });
            }
            this.setState({
                approvals: response
            });
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
        fetch(this.urlGetLabelApprovals, {
            "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                approvals: response
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleSubmission(shortName) {
        this.setState({
            approvalsSubheader: "Thank you! Your submission of " + shortName + " has been received!",
            rowKey: '',
            shortName: '',
            longName: '',
            url: '',
            profile: ''
        })
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col className="col-md-6">
                        <InputForm
                            shortName={this.state.shortName}
                            longName={this.state.longName}
                            url={this.state.url}
                            profile={this.state.profile}
                            rowKey={this.state.rowKey}
                            handleChange={this.handleChange}
                        />
                        <ApprovalsViewer
                            approvals={this.state.approvals}
                            approvalsSubheader={this.state.approvalsSubheader}
                            handleChange={this.handleChange}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}