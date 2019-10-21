import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

export default class Loader extends Component {
    render() {
        return (
            <div>
                {this.props.loading ? (
                    <div className='-loading -active'>
                        <div className='-loading-inner'>
                            <center>
                                <Spinner
                                    color='primary'
                                    style={{ width: '3rem', height: '3rem' }}
                                />
                            </center>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
