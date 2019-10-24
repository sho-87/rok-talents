import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export class InvalidBuildModal extends Component {
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
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        unmountOnClose={true}
      >
        <ModalHeader toggle={this.toggle}>Invalid Talent Build</ModalHeader>
        <ModalBody>
          The talent build you're trying to view is invalid. Please make sure
          you've copied and pasted the correct link.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export class CopyToast extends Component {
  render() {
    return (
      <Toast isOpen={this.props.isOpen}>
        <ToastHeader icon="success">Talent Build Copied</ToastHeader>
        <ToastBody>
          The link to this talent build has been copied to your clipboard
        </ToastBody>
      </Toast>
    );
  }
}

export class PrereqToast extends Component {
  render() {
    return (
      <Toast isOpen={this.props.isOpen}>
        <ToastHeader icon="danger">Incomplete Talents</ToastHeader>
        <ToastBody>
          Please upgrade the following to the maximum skill level first:
          {this.props.msg}
        </ToastBody>
      </Toast>
    );
  }
}

export const TalentTooltip = props => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Popover
        trigger="hover"
        placement="right-start"
        isOpen={popoverOpen}
        target={props.target}
        toggle={toggle}
        hideArrow={false}
        delay={{ show: 0, hide: 0 }}
        fade={false}
      >
        <PopoverHeader>
          <span className="node-tooltip-title">{props.talentName}</span>
          <span className="node-tooltip-title-value">
            {props.value + '/' + props.max}
          </span>
          <div style={{ clear: 'both' }}></div>
        </PopoverHeader>
        <PopoverBody className="node-tooltip-body">{props.text}</PopoverBody>
      </Popover>
    </div>
  );
};

export default { InvalidBuildModal, CopyToast, PrereqToast, TalentTooltip };
