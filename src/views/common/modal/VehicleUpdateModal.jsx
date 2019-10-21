import React from 'react';
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
// reactstrap components
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    FormGroup,
    Input
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
        }
    } = props.state_data;
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
                <ModalBody className='cus_model1'>
                    <AvField
                        name='licensePlate'
                        label='License Plate'
                        placeholder='License Plate'
                        id='licensePlate'
                        value={licensePlate}
                        required
                        onChange={props.onChange_func}
                        className='blue_lable'
                    />
                    <AvField
                        name='make'
                        label='Make'
                        placeholder='Make'
                        id='make'
                        value={make}
                        required
                        onChange={props.onChange_func}
                        className='blue_lable'
                    />
                    <AvField
                        name='model'
                        label='Model'
                        placeholder='Model'
                        id='model'
                        value={model}
                        required
                        onChange={props.onChange_func}
                        className='blue_lable'
                    />
                    <AvField
                        name='year'
                        placeholder='Year'
                        onChange={props.onChange_func}
                        className='blue_lable'
                        required
                        value={year}
                        label='Year'
                        type='text'
                        validate={{ number: true }}
                    />
                    <AvField
                        name='color'
                        label='Color'
                        placeholder='Color'
                        id='color'
                        value={color}
                        required
                        onChange={props.onChange_func}
                        className='blue_lable'
                    />
                    <AvField
                        type='textarea'
                        name='specialNotes'
                        required
                        onChange={props.onChange_func}
                        className='blue_lable'
                        value={specialNotes}
                        label='Special Notes'
                        id='specialNotes'
                        placeholder='Special Notes'
                        required
                    />
                    <FormGroup>
                        <Input
                            accept='.png, .jpg, .jpeg'
                            type='file'
                            name='vehicleImage'
                            id='exampleFile1'
                            className='normalUploadBtn'
                            width='50%'
                            onChange={props.fileUploadHandle}
                        />
                    </FormGroup>
                    {/* <div>
                        <input
                            type='file'
                            id='file'
                            accept='.png, .jpg, .jpeg'
                            name='vehicleImage'
                            value=''
                            onChange={props.fileUploadHandle}
                            multiple
                        />
                        <label htmlFor='file' className='btn-3 nowrap'>
                            <span>File Upload</span>
                        </label>
                        {(this.state.file.length > 0) ?
                  <Button color="primary" style={{marginLeft:'2rem'}} title="Upload" onClick={() => this.uploadDocument()}><i className='fas fa-upload'></i></Button> 
                  :''}
                    </div> */}
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
