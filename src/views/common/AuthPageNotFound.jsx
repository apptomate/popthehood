import React, { Component, Fragment } from 'react';

class AuthPageNotFound extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h1>Oops!</h1>
              </div>
              <h2>404 - Page not found</h2>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AuthPageNotFound;
