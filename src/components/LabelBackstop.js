import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BUTTONSTYLES, HEADERS, ERRORS } from './Constants.js';
import isURL from 'validator/lib/isURL';
import InputForm from './InputForm.js';
import JuxceSeparator from './JuxceSeparator.js';
import ApprovalsViewer from './ApprovalsViewer.js';
import FormErrors from './FormErrors.js';

export default class LabelBackstop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            approvals: [],
            approvalsSubheader: HEADERS.SomeApprovedExamples,
            successMessage: '',
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
            addButtonClassName: BUTTONSTYLES.AddButtonDisabled
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.checkForSimilar = this.checkForSimilar.bind(this);
        this.create = this.create.bind(this);

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
        let formErrors = this.state.formErrors;
        let shortNameValid = this.state.shortNameValid;
        let longNameValid = this.state.longNameValid;
        let urlValid = this.state.urlValid;
        let profileValid = this.state.profileValid;

        switch (fieldName) {
            case 'shortName':
                shortNameValid = (this.state.shortName.length > 2);
                formErrors.shortName = shortNameValid ? '' : ERRORS.ShortNameValidation;
                break;
            case 'longName':
                longNameValid = this.state.longName.length >= this.state.shortName.length;
                formErrors.longName = longNameValid ? '' : ERRORS.LongNameValidation;
                break;
            case 'url':
                urlValid = isURL(value) || value.length===0;
                formErrors.url = urlValid ? '' : ERRORS.UrlValidation;
                break;
            case 'profile':
                profileValid = (this.state.profile.length > 10);
                formErrors.profile = profileValid ? '' : ERRORS.ProfileValidation;
                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: formErrors,
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
                addButtonClassName: BUTTONSTYLES.AddButtonActive
            })
        } else {
            this.setState({
                addButtonClassName: BUTTONSTYLES.AddButtonDisabled
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
                this.setState({addButtonClassName: BUTTONSTYLES.AddButtonDisabled});
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
            this.setState({addButtonClassName: BUTTONSTYLES.AddButtonDisabled});
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
                        approvalsSubheader: HEADERS.NoSimilarResults
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
        fetch("http://localhost:7071/api/LabelApprovals_GetAllDocuments", {
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
            successMessage: "Thank you! Your submission of " + shortName + " has been received!",
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
                            successMessage={this.state.successMessage}
                            addButtonClassName={this.state.addButtonClassName}
                            handleUserInput={this.handleUserInput}
                            create={this.create}
                            checkForSimilar={this.checkForSimilar}
                        />
                        <FormErrors
                            formErrors={this.state.formErrors}
                            formErrorsArray={Object.values(this.state.formErrors)}
                        />
                        <JuxceSeparator />
                        <ApprovalsViewer
                            approvals={this.state.approvals}
                            approvalsSubheader={this.state.approvalsSubheader}
                            handleUserInput={this.handleUserInput}
                        />
                        <JuxceSeparator />
                    </Col>
                </Row>
            </Container>
        );
    }
}