import React from 'react';
import { Button } from 'reactstrap';
export default props => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  const style = {
    textAlign: 'right'
  };
  return (
    <section className="pdf-container">
      <section className="pdf-toolbar" style={style}>
        <Button className="mt-4" color="info" type="button" onClick={createPdf}>
          <i className="fas fa-file-pdf"></i> PDF
        </Button>
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  );
};
