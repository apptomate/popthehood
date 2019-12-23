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
  FormGroup
} from 'reactstrap';
import { staticYearArray } from '../helpers/functions';
export function VehicleUpdateModal(props) {
  const {
    user_vehicle_data: {
      licencePlate = '',
      make = '',
      model = '',
      year = '',
      color = '',
      specialNotes = ''
    },
    storedImageURL = ''
  } = props.state_data;
  const {
    modal_toggle,
    modal_toggle_func,
    updateUserVehicleDetails,
    onChange_func,
    makes_list,
    model_by_make
  } = props;
  const img_url = storedImageURL ? storedImageURL : imageNotAvailable;

  const staticArrayValues = staticYearArray().map((array_value, key) => (
    <option value={array_value} key={key}>
      {array_value}
    </option>
  ));
  const makesListValues = makes_list.map((list, key) => (
    <option value={list.name} key={key} value_to_api={list.makeId}>
      {list.name}
    </option>
  ));
  const modelListValues = model_by_make.map((list, key) => (
    <option value={list.name} key={key}>
      {list.name}
    </option>
  ));
  return (
    <Modal
      isOpen={modal_toggle}
      toggle={modal_toggle_func}
      className={props.className}
      centered={true}
      backdrop={false}
    >
      <AvForm onValidSubmit={updateUserVehicleDetails}>
        <ModalHeader toggle={modal_toggle_func}> Update Vehicle</ModalHeader>
        <ModalBody className='cus_model1'>
          <div>
            <center>
              <img
                alt='No Thumbnail'
                src={img_url}
                style={{ width: '400px', height: '200px' }}
              />
            </center>
            <br />
          </div>

          <FormGroup>
            <center>
              <span>Licence Plate</span>
              <h1>{licencePlate}</h1>
            </center>
          </FormGroup>
          <AvField
            type='select'
            name='make'
            label='Make'
            onChange={onChange_func}
            required
            value={make}
          >
            <option value=''>Select Make</option>
            {makesListValues}
          </AvField>
          <AvField
            type='select'
            name='model'
            label='Model'
            onChange={onChange_func}
            required
            value={model}
          >
            <option value=''>Select Model</option>
            {modelListValues}
          </AvField>
          <AvField
            type='select'
            name='year'
            label='Year'
            onChange={onChange_func}
            required
            value={year}
          >
            <option value=''>All Years</option>
            {staticArrayValues}
          </AvField>
          <AvField
            name='color'
            label='Color'
            placeholder='Color'
            id='color'
            value={color}
            required
            onChange={onChange_func}
            className='blue_label'
          />
          <AvField
            type='textarea'
            name='specialNotes'
            onChange={onChange_func}
            className='blue_label'
            value={specialNotes}
            label='Special Notes'
            id='specialNotes'
            placeholder='Special Notes'
          />
        </ModalBody>
        <ModalFooter>
          <FormGroup>
            <center>
              <Button color='success'>Update</Button>
            </center>
          </FormGroup>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
}
