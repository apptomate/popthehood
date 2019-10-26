import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, Row, UncontrolledTooltip } from 'reactstrap';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import { leftAllignStyle } from '../common/helpers/Variables';
const downFileName =
  'Service Report For Day-' + moment(new Date()).format('MM-DD-YYYY HH:mm:ss');

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
        Header: 'License Plate',
        accessor: 'licensePlate',
        className: 'text-center',
        Cell: ({ row }) => {
          return (
            <div style={leftAllignStyle}>
              <Link
                to={{
                  pathname:
                    'vehicle-service-details/' + row['_original'].vehicleId
                }}
              >
                {row['_original'].licensePlate}
              </Link>
            </div>
          );
        }
      },
      {
        Header: 'Make',
        accessor: 'make',
        className: 'text-center',
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Name',
        accessor: 'name',
        className: 'text-center',
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
        className: 'text-center',
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Location',
        accessor: 'locationFullAddress',
        className: 'text-center',
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Date',
        accessor: 'requestServiceDate',
        className: 'text-center',
        Cell: row => (
          <div style={leftAllignStyle}>
            {moment(row.value).isValid()
              ? moment(row.value).format('DD/MM/YYYY HH:MM:SS')
              : ''}
          </div>
        )
      }
    ];
  }
  shouldComponentUpdate(nextProps) {
    return (
      this.props.vehicleScheduledListForADay &&
      this.props.vehicleScheduledListForADay.length !==
        nextProps.vehicleScheduledListForADay.length
    );
  }
  download() {
    const currentRecords = this.reactTable.getResolvedState().sortedData;
    var data_to_download = [];
    for (var index = 0; index < currentRecords.length; index++) {
      let record_to_download = {};
      for (var colIndex = 0; colIndex < this.columns.length; colIndex++) {
        record_to_download[this.columns[colIndex].Header] = String(
          currentRecords[index][this.columns[colIndex].accessor]
        ).replace(',', '');
      }
      data_to_download.push(record_to_download);
    }
    this.setState({ dataToDownload: data_to_download }, () => {
      this.csvLink.link.click();
    });
  }

  downloadPdf() {
    const currentRecords = this.reactTable.getResolvedState().sortedData;
    var data_array = [];
    for (var index = 0; index < currentRecords.length; index++) {
      let record_to_download = {};
      for (var colIndex = 0; colIndex < this.columns.length; colIndex++) {
        record_to_download[this.columns[colIndex].Header] = String(
          currentRecords[index][this.columns[colIndex].accessor]
        ).replace(',', '');
      }
      data_array.push(record_to_download);
    }
    var doc = new jsPDF('P', 'px', 'a4');
    doc.autoTable({
      body: data_array,
      columns: [
        { header: 'License Plate', dataKey: 'License Plate' },
        { header: 'Make', dataKey: 'Make' },
        { header: 'Model', dataKey: 'Model' },
        { header: 'Name', dataKey: 'Name' },
        { header: 'Phone No', dataKey: 'Phone No' },
        { header: 'Location', dataKey: 'Location' },
        { header: 'Date', dataKey: 'Date' }
      ],
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 50 },
        2: { cellWidth: 50 },
        3: { cellWidth: 50 },
        4: { cellWidth: 60 },
        5: { cellWidth: 50 },
        6: { cellWidth: 100 }
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
            <div className="col">
              <h3 className="mb-0">Services Scheduled For Today</h3>
            </div>
            <div className="col text-right">
              {/* <Button
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
              </UncontrolledTooltip> */}
              <Button
                color="info"
                size="sm"
                id="down_pdf"
                onClick={this.downloadPdf}
              >
                <i className="fas fa-file-download"></i> PDF
              </Button>
              <UncontrolledTooltip placement="top" target={'down_pdf'}>
                Download as PDF
              </UncontrolledTooltip>
            </div>
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
          showPagination={false}
        />
      </Card>
    );
  }
}

export default ReportForDay;
