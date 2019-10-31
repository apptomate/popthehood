import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, Row, UncontrolledTooltip } from 'reactstrap';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { dateFormat, dateTimeFormat } from '../common/helpers/functions';
const downFileName = 'ServiceReportForWeek-' + dateTimeFormat(new Date());
class ReportForWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToDownload: []
    };
    this.download = this.download.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
    this.redirectService = this.redirectService.bind(this);
    this.columns = [
      {
        Header: 'License Plate',
        accessor: 'licensePlate',
        className: 'text-left',
        Cell: ({ row }) => {
          return (
            <Link
              to={{
                pathname:
                  'vehicle-service-details/' + row['_original'].vehicleId
              }}
            >
              {row['_original'].licensePlate}
            </Link>
          );
        }
      },
      {
        Header: 'Due Date',
        accessor: 'requestServiceDate',
        className: 'text-center',
        Cell: row => {
          return dateFormat(row.value);
        }
      }
    ];
  }
  shouldComponentUpdate(nextProps) {
    return (
      this.props.vehicleScheduledForAWeek &&
      this.props.vehicleScheduledForAWeek.length !==
        nextProps.vehicleScheduledForAWeek.length
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
  redirectService() {
    this.props.defProps.history.push({
      pathname: '/admin/services-report',
      state: {
        isFilter: true,
        filterBy: 'ON_DUE'
      }
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
        { header: 'Date', dataKey: 'Date' }
      ],
      columnStyles: {
        0: { cellWidth: 100 },
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
    const { vehicleScheduledForAWeek = [] } = this.props;
    const { dataToDownload } = this.state;
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Due Services</h3>
            </div>
            <div className="col text-right">
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
              <Button
                color="info"
                size="sm"
                id="down_pdf"
                onClick={this.redirectService}
              >
                <i className="fas fa-arrow-right"></i> View All Dues
              </Button>
            </div>
          </Row>
        </CardHeader>
        <ReactTable
          id="service_report"
          ref={r => (this.reactTable = r)}
          data={vehicleScheduledForAWeek}
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

export default ReportForWeek;
