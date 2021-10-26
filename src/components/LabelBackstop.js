import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import isURL from 'validator/lib/isURL';
import InputForm from './InputForm.js';
import ApprovalsViewer from './ApprovalsViewer.js';
import { FormErrors } from './FormErrors.js';

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
            profile: '',
            formErrors: {
                shortName: '',
                longName: '',
                url: '',
                profile: ''
            },
            shortNameValid: false,
            longNameValid: false,
            urlValid: true,
            profileValid: false,
            formValid: false,
            addButtonClassName: process.env.REACT_APP_STYLE_ADD_BUTTON_DISABLED
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.checkForSimilar = this.checkForSimilar.bind(this);
        this.create = this.create.bind(this);

        this.styleAddButtonActive = process.env.REACT_APP_STYLE_ADD_BUTTON_ACTIVE;
        this.styleAddButtonDisabled = process.env.REACT_APP_STYLE_ADD_BUTTON_DISABLED;
        this.urlGetLabelApprovals = process.env.REACT_APP_URL_GET_LABEL_APPROVALS;
        this.urlCreate = process.env.REACT_APP_URL_CREATE;
        this.urlUpdate = process.env.REACT_APP_URL_UPDATE_BASE;
        this.urlDelete = process.env.REACT_APP_URL_DELETE_BASE;
        this.urlCheckSimilar = process.env.REACT_APP_URL_CHECK_SIMILAR;
    }

    componentDidMount() {
        this.refreshApprovedList();
    }

    handleUserInput(changeObject) {
        this.setState(
            changeObject,
            () => { this.validateFields(changeObject) }
        );
    }

    validateFields(changeObject) {
        for (var key in changeObject) {
            this.validateField(key, changeObject[key]);
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let shortNameValid = this.state.shortNameValid;
        let longNameValid = this.state.longNameValid;
        let urlValid = this.state.urlValid;
        let profileValid = this.state.profileValid;

        switch (fieldName) {
            case 'shortName':
                shortNameValid = (this.state.shortName.length > 2);
                if (shortNameValid) {
                    fieldValidationErrors.shortName = '';
                } else {
                    fieldValidationErrors.shortName = 'The short name should be at least 3 characters';
                }
                break;
            case 'longName':
                longNameValid = this.state.longName.length >= this.state.shortName.length;
                if (longNameValid) {
                    fieldValidationErrors.longName = '';
                } else {
                    fieldValidationErrors.longName = 'Your Long Name should at least be as long as your ShortName';
                }
                break;
            case 'url':
                urlValid = isURL(value) || value.length===0;
                if (urlValid) {
                    fieldValidationErrors.url = '';
                } else {
                    fieldValidationErrors.url = 'Please enver a valid URL for your website'
                }
                break;
            case 'profile':
                profileValid = (this.state.profile.length > 10);
                if (profileValid) {
                    fieldValidationErrors.profile = '';
                } else {
                    fieldValidationErrors.profile = 'Plese enter a profile description of your label'
                }
                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                shortNameValid: shortNameValid,
                longNameValid: longNameValid,
                urlValid: urlValid,
                profileValid: profileValid
            },
            () => this.validateForm()
        );
    }

    validateForm() {
        this.setState(
            {
                formValid:
                    this.state.shortNameValid
                    && this.state.longNameValid
                    && this.state.urlValid
                    && this.state.profileValid
            },
            () => this.updateButtonStyle()
        )
    }

    updateButtonStyle() {
        if(this.state.formValid) {
            this.setState({
                addButtonClassName: this.styleAddButtonActive
            })
        } else {
            this.setState({
                addButtonClassName: this.styleAddButtonDisabled
            })
        }
    }

    create(e) {
        // add entity - POST
        e.preventDefault();

        if(this.state.formValid) {
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
                this.setState({addButtonClassName: this.styleAddButtonDisabled});
            })
            .catch(err => {
                console.error(err);
            });
        } else {
            this.validateFields({
                shortName: this.state.shortName,
                longName: this.state.longName,
                url: this.state.url,
                profile: this.state.profile    
            })
            this.setState({addButtonClassName: this.styleAddButtonDisabled});
        }
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
                if (response.length === 0) {
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
                            formValid={this.state.formValid}
                            formErrors={this.state.formErrors}
                            addButtonClassName={this.state.addButtonClassName}
                            handleUserInput={this.handleUserInput}
                            create={this.create}
                            checkForSimilar={this.checkForSimilar}
                        />
                        <FormErrors
                            formErrors={this.state.formErrors}
                        />
                        <ApprovalsViewer
                            approvals={this.state.approvals}
                            approvalsSubheader={this.state.approvalsSubheader}
                            handleUserInput={this.handleUserInput}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}