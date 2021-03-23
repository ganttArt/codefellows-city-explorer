import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class ErrorModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Please try again... for some reason the city you searched for was not found.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hide}>Close</Button>
        </Modal.Footer>
      </Modal>

    )
  }
}

export default ErrorModal;
