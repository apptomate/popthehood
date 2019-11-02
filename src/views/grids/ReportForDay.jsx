import React, { Component } from 'react';
import ReactTable from 'react-table';

import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  Row,
  UncontrolledTooltip,
  Col
} from 'reactstrap';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { dateTimeFormat } from '../common/helpers/functions';
const downFileName =
  'ServiceReportForDay-' + dateTimeFormat(new Date(), 'DD/MM/YYYY HH:MM:SS');
class ReportForDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToDownload: []
    };
    this.download = this.download.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
    this.columns = [
      {
        Header: 'Licence Plate',
        accessor: 'licencePlate',
        className: 'text-left',
        Cell: ({ row }) => {
          return (
            <Link
              to={{
                pathname:
                  'vehicle-service-details/' + row['_original'].vehicleId
              }}
            >
              {row['_original'].licencePlate}
            </Link>
          );
        }
      },
      {
        Header: 'Make',
        accessor: 'make',
        className: 'text-left'
      },
      {
        Header: 'Name',
        accessor: 'name',
        className: 'text-left'
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
        className: 'text-left'
      },
      {
        Header: 'Location',
        accessor: 'locationFullAddress',
        className: 'text-left'
      }
    ];
  }
  download() {
    const currentRecords = this.reactTable.getResolvedState().sortedData;
    const obj = {
      Header: 'Model',
      accessor: 'model',
      className: 'text-left'
    };
    this.columns.push(obj);
    var data_to_download = [];
    for (var index = 0; index < currentRecords.length; index++) {
      let record_to_download = {};
      for (var colIndex = 0; colIndex < this.columns.length; colIndex++) {
        if (this.columns[colIndex].Header === 'Model') {
          record_to_download[this.columns[colIndex].Header] = String(
            currentRecords[index]._original.model
          ).replace(',', '');
        } else {
          record_to_download[this.columns[colIndex].Header] = String(
            currentRecords[index][this.columns[colIndex].accessor]
          ).replace(',', '');
        }
      }
      data_to_download.push(record_to_download);
    }
    this.setState({ dataToDownload: data_to_download }, () => {
      this.csvLink.link.click();
    });
  }

  downloadPdf() {
    const currentRecords = this.reactTable.getResolvedState().sortedData;
    const obj = {
      Header: 'Model',
      accessor: 'model',
      className: 'text-left'
    };
    this.columns.push(obj);
    var data_array = [];
    for (var index = 0; index < currentRecords.length; index++) {
      let record_to_download = {};
      for (var colIndex = 0; colIndex < this.columns.length; colIndex++) {
        if (this.columns[colIndex].Header === 'Model') {
          record_to_download[this.columns[colIndex].Header] = String(
            currentRecords[index]._original.model
          ).replace(',', '');
        } else {
          record_to_download[this.columns[colIndex].Header] = String(
            currentRecords[index][this.columns[colIndex].accessor]
          ).replace(',', '');
        }
      }
      data_array.push(record_to_download);
    }
    var doc = new jsPDF('P', 'px', 'a4');
    doc.autoTable({
      body: data_array,
      columns: [
        { header: 'Licence Plate', dataKey: 'Licence Plate' },
        { header: 'Make', dataKey: 'Make' },
        { header: 'Name', dataKey: 'Name' },
        { header: 'Phone Number', dataKey: 'Phone Number' },
        { header: 'Location', dataKey: 'Location' },
        { header: 'Model', dataKey: 'Model' }
      ],
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 60 },
        2: { cellWidth: 60 },
        3: { cellWidth: 60 },
        4: { cellWidth: 90 },
        5: { cellWidth: 50 }
      },
      margin: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8
      },
      rowPageBreak: 'avoid',
      theme: 'grid'
    });
    doc.save(downFileName + '.pdf');
  }
  render() {
    const { vehicleScheduledListForADay = [] } = this.props;
    const { dataToDownload } = this.state;
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <Col sm>
              <h3 className="mb-0 nowrap">Services Scheduled For Today</h3>
            </Col>
            {vehicleScheduledListForADay.length > 0 ? (
              <Col className="text-right">
                <Button
                  color="primary"
                  size="sm"
                  onClick={this.download}
                  id="down_csv"
                >
                  <i className="fas fa-file-download"></i> CSV
                </Button>
                <CSVLink
                  data={dataToDownload}
                  filename={downFileName + '.csv'}
                  className="hidden"
                  ref={r => (this.csvLink = r)}
                  target="_blank"
                />
                <UncontrolledTooltip placement="top" target={'down_csv'}>
                  Download as CSV
                </UncontrolledTooltip>
                <Button
                  color="danger"
                  size="sm"
                  id="down_pdf"
                  onClick={this.downloadPdf}
                >
                  <i className="fas fa-file-download"></i> PDF
                </Button>
                <UncontrolledTooltip placement="top" target={'down_pdf'}>
                  Download as PDF
                </UncontrolledTooltip>
              </Col>
            ) : (
              ''
            )}
          </Row>
        </CardHeader>
        <ReactTable
          id="service_report"
          ref={r => (this.reactTable = r)}
          data={vehicleScheduledListForADay}
          columns={this.columns}
          defaultPageSize={5}
          noDataText="No Record Found.."
          filterable
          HeaderClassName="text-bold"
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id])
              .toLowerCase()
              .includes(filter.value.toLowerCase())
          }
          className="-striped -highlight"
        />
      </Card>
    );
  }
}

export default ReportForDay;
