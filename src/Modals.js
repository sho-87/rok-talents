import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

export class InvalidBuildModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggle}>Invalid Build</ModalHeader>
          <ModalBody>
            The build you're trying to view is invalid. Please make sure you've
            correctly copied and pasted the link.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export class CopyToast extends React.Component {
  render() {
    return (
      <div>
        <Toast isOpen={this.props.isOpen}>
          <ToastHeader icon="success" >Build Copied</ToastHeader>
          <ToastBody>
            Talent build link has been copied to your clipboard
          </ToastBody>
        </Toast>
      </div>
    );
  }
}

export default { InvalidBuildModal, CopyToast };
