import React from 'react';

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
                        onChange={(e) => this.props.handleChange({ shortName: e.target.value })}
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
                        onChange={(e) => this.props.handleChange({ longName: e.target.value })}
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
                        onChange={(e) => this.props.handleChange({ url: e.target.value })}
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
                        onChange={(e) => this.props.handleChange({ profile: e.target.value })}
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
                        onChange={(e) => this.props.handleChange({ rowKey: e.target.value })}
                        readOnly
                    />
                </label>
            </form>
        )
    }
}