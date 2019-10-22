import React from 'react';
import imageNotAvailable from '../../../assets/img/icons/common/vehicle_not_available.png';
import { AvForm, AvField } from 'availity-reactstrap-validation';
// reactstrap components
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label
} from 'reactstrap';
export function VehicleUpdateModal(props) {
  const {
    user_vehicle_data: {
      licensePlate = '',
      make = '',
      model = '',
      year = '',
      color = '',
      specialNotes = ''
    },
    storedImageURL = ''
  } = props.state_data;
  const img_url = storedImageURL ? storedImageURL : imageNotAvailable;
  return (
    <Modal
      isOpen={props.modal_toggle}
      toggle={props.modal_toggle_func}
      className={props.className}
      centered={true}
    >
      <AvForm onValidSubmit={props.updateUserVehicleDetails}>
        <ModalHeader toggle={props.modal_toggle_func}>
          {' '}
          Update Vehicle
        </ModalHeader>
        <ModalBody className="cus_model1">
          <div>
            <center>
              <img
                alt="No Thumbnail"
                src={img_url}
                style={{ width: '400px', height: '200px' }}
              />
            </center>
            <br />
          </div>
          <FormGroup>
            <Label for="License Plate">
              License Plate:<h3>{licensePlate}</h3>
            </Label>
          </FormGroup>
          <AvField
            name="make"
            label="Make"
            placeholder="Make"
            id="make"
            value={make}
            required
            onChange={props.onChange_func}
            className="blue_lable"
          />
          <AvField
            name="model"
            label="Model"
            placeholder="Model"
            id="model"
            value={model}
            required
            onChange={props.onChange_func}
            className="blue_lable"
          />
          <AvField
            name="year"
            placeholder="Year"
            onChange={props.onChange_func}
            className="blue_lable"
            required
            value={year}
            label="Year"
            type="text"
            validate={{ number: true }}
          />
          <AvField
            name="color"
            label="Color"
            placeholder="Color"
            id="color"
            value={color}
            required
            onChange={props.onChange_func}
            className="blue_lable"
          />
          <AvField
            type="textarea"
            name="specialNotes"
            required
            onChange={props.onChange_func}
            className="blue_lable"
            value={specialNotes}
            label="Special Notes"
            id="specialNotes"
            placeholder="Special Notes"
          />
        </ModalBody>
        <ModalFooter>
          <FormGroup>
            <center>
              <Button color="success">Update</Button>
            </center>
          </FormGroup>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
}
