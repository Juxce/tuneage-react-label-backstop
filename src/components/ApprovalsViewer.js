import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class ApprovalsViewer extends React.Component {
    render () {
        return (
            <div className="approvalsViewer">
                <h2 className="display-2">{this.props.approvalsSubheader}</h2>
                <div>
                    <Row>
                        <Col>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Short Name</th>
                                        <th>Long Name</th>
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
                                            <td>{label.profile === null ? '' : label.profile.substring(0, 30)}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}