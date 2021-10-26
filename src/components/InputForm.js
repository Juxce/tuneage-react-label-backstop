import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class InputForm extends React.Component {
    render() {
        return (
            <form className="d-flex flex-column">
                <legend className="introParagraph">Do you have a record label or music company?
                    We would like to know about it! Please tell us all about it so we can
                    get you in the mix with all the big dogs!</legend>
                <label htmlFor="shortName">
                    Word or phrase that uniquely identifies the company
                    <span className="subtext">&nbsp;(example: Blue Note)</span>
                    <input
                        name="shortName"
                        id="shortName"
                        type="text"
                        className="formControlSingleValue"
                        value={this.props.shortName}
                        onChange={(e) => this.props.handleUserInput({ shortName: e.target.value })}
                        required
                    />
                </label>
                <label htmlFor="longName">
                    Full label or company name
                    <span className="subtext">&nbsp;(example: Blue Note Records)</span>
                    <input
                        name="longName"
                        id="longName"
                        type="text"
                        className="formControlSingleValue"
                        value={this.props.longName}
                        onChange={(e) => this.props.handleUserInput({ longName: e.target.value })}
                        required
                    />
                </label>
                <label htmlFor="url">
                    Website
                    <span className="subtext">&nbsp;(optional)</span>
                    <input
                        name="url"
                        id="url"
                        type="text"
                        className="formControlSingleValue"
                        value={(this.props.url === undefined) ? "" : this.props.url}
                        onChange={(e) => this.props.handleUserInput({ url: e.target.value })}
                        required
                    />
                </label>
                <label htmlFor="profile">
                    Profile
                    <span className="subtext">&nbsp;(give us all the details!)</span>
                    <textarea
                        name="profile"
                        id="profile"
                        rows="4"
                        maxLength="10000"
                        className="formControlMultiLine"
                        value={(this.props.profile === undefined) ? "" : this.props.profile}
                        onChange={(e) => this.props.handleUserInput({ profile: e.target.value })}
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
                        value={this.props.rowKey}
                        onChange={(e) => this.props.handleUserInput({ rowKey: e.target.value })}
                        readOnly
                    />
                </label>
                <Container className='threeButtonRow'>
                    <Row>
                        <Col className="col-md-4">
                            <button
                                className={'juxceButton infoButton'}
                                type='button'
                                onClick={(e) => this.props.checkForSimilar(e)}>
                                    Check
                            </button>
                        </Col>
                        <Col className="col-md-4">
                            <button
                                className={this.props.addButtonClassName}
                                type='button'
                                disabled={!this.props.formValid}
                                onClick={(e) => this.props.create(e)}>
                                    Add
                            </button>
                        </Col>
                        <Col className="col-md-4 deleteButtonExposé">
                            <button
                                className='juxceButton dangerButton'
                                type='button'
                                onClick={(e) => this.props.delete(e)}>
                                    Delete
                            </button>
                        </Col>
                    </Row>
                </Container>
            </form>
        )
    }
}