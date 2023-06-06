import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/joy/Table";
import {
  DeleteReport,
  GetRequest,
  PostRequest,
  UpdateReport,
} from "../../services/HttpServices";
import { Link } from "react-router-dom";
import { Button, FormLabel, Input, Textarea } from "@mui/joy";
import { Container, Form } from "reactstrap";
import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";

function Home() {
  const [reportList, setReportList] = useState([]);
  const [laborantList, setLaborantList] = useState([]);
  const [reportId, setReportId] = useState(0);
  const [patientName, setPatientName] = useState([]);
  const [patientLastName, setPatientLastName] = useState([]);
  const [patientNo, setPatientNo] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [detailOfDiagnosis, setDetailOfDiagnosis] = useState([]);
  const [idOfLaborant, setIdOfLaborant] = useState([]);
  const [photoUrl, setPhotoUrl] = useState([]);
  const [laborantName, setLaborantName] = useState([]);
  const [laborantLastName, setLaborantLastName] = useState([]);
  const [date, setDate] = useState();
  const [text, setText] = useState("");
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isAddReport, setIsAddReport] = useState(false);
  const [isDetailed, setIsDetailed] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isAddLaborant, setIsAddLaborant] = useState(false);

  //Methods that communicate with the backend

  const updateReport = (id) => {
    UpdateReport("/report/" + id, {
      patientName: patientName,
      patientLastName: patientLastName,
      diagnosis: diagnosis,
      detailOfDiagnosis: detailOfDiagnosis,
      photoUrl: photoUrl,
    });
  };
  const deleteReport = (id) => {
    DeleteReport("/report/" + id)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveNewLaborant = () => {
    PostRequest("/laborant", {
      laborantName: laborantName,
      laborantLastName: laborantLastName,
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveReport = () => {
    PostRequest("/report", {
      patientName: patientName,
      patientLastName: patientLastName,
      patientNo: patientNo,
      diagnosis: diagnosis,
      detailOfDiagnosis: detailOfDiagnosis,
      idOfLaborant: idOfLaborant,
      photoUrl: photoUrl,
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUpdatedList = () => {
    GetRequest("/report")
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setReportList(result);
          setIsRefresh(false);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const getDeletedList = () => {
    GetRequest("/report")
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setReportList(result);
          setIsDeleted(false);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getReportList = () => {
    GetRequest("/report")
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setReportList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const getLaborantList = () => {
    GetRequest("/laborant")
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setLaborantList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  /*A method that helps us to display the updated reports in the database by changing the isRefresh 
  state when the update or create report buttons are clicked, allowing the page to be refreshed*/
  const changeRefreshState = () => {
    setIsRefresh(true);
  };

  /*A method that helps us to display the deleted reports in the database by changing the isDeleted 
  state when the delete report buttons is clicked, allowing the page to be refreshed*/
  const changeDeletedState = () => {
    setIsDeleted(true);
  };

  // Cleans and fills states
  const cleanStates = () => {
    setReportId(0);
    setPatientName("");
    setPatientLastName("");
    setDiagnosis("");
    setDetailOfDiagnosis("");
    setPhotoUrl("");
    setPatientNo("");
    setIdOfLaborant(0);
    setDate();
    setLaborantName("");
    setLaborantLastName("");
  };

  const fillStates = (
    name,
    lastName,
    diagnosis,
    details,
    url,
    reportId,
    no,
    date,
    laborantName,
    laborantLastName,
    idOfLaborant
  ) => {
    setReportId(reportId);
    setPatientName(name);
    setPatientLastName(lastName);
    setDiagnosis(diagnosis);
    setDetailOfDiagnosis(details);
    setPhotoUrl(url);
    setPatientNo(no);
    setDate(date);
    setLaborantName(laborantName);
    setLaborantLastName(laborantLastName);
    setIdOfLaborant(idOfLaborant);
  };

  /* Shows meaningful messages to user*/
  const showMessage = (message) => {
    alertify.success(message);
  };

  const showMessageDanger = (message) => {
    alertify.error(message);
  };
  //Sorting methods (newest to oldest or oldest to newest)
  const sortReportListFromNewToOld = () => {
    const sortedList = reportList.sort(function (a, b) {
      return new Date(b.createdDate) - new Date(a.createdDate);
    });
    setReportList(sortedList);
    setIsSorted(true);
  };
  const sortReportListFromOldToNew = () => {
    const sortedList = reportList.sort(function (a, b) {
      return new Date(a.createdDate) - new Date(b.createdDate);
    });
    setReportList(sortedList);
    setIsSorted(true);
  };
  /* This methods helps us to show meaningful message to user if user enter invalid id of laborant . If User enters invalid id of laborant 
we show an error message if user enters valid id , we show user success message. In this method i have faced some issue like when user enters
valid id at first try , program was showing error message to user although user entered valid id so i solved this problem by checking user's first 
try of creating new report differently from other try of creating new report  */
  const isIdValid = (id) => {
    var isItTrueAtFirst = false;
    var isItFirst = 0;
    laborantList.map((laborant) => {
      if (laborant.id === parseInt(id)) {
        setIsValid(true);
        isItFirst++;
        isItTrueAtFirst = true;
      }
    });
    if (isItTrueAtFirst && isItFirst === 1) {
      showMessage("New Report Created");
      setIsValid(false);
    }

    if (isValid === true) {
      showMessage("New Report Created");
      setIsValid(false);
    } else if (isValid === false && isItFirst !== 1) {
      console.log("dswaw");
      showMessageDanger(
        "New Report Could Not Created Because Of Invalid Id Of Laborant"
      );
    }
  };
  /* Methods that enables to close or open detail , updating or adding forms */
  const reverseDetailed = () => {
    setIsDetailed(!isDetailed);
    setIsAddReport(false);
    setIsUpdateOpen(false);
    setIsAddLaborant(false);
    if (isDetailed !== true) {
      showMessage("Detail Page Below");
    }
  };
  const reverseUpdateState = () => {
    setIsUpdateOpen(!isUpdateOpen);
    setIsAddReport(false);
    setIsDetailed(false);
    setIsAddLaborant(false);
    if (isUpdateOpen !== true) {
      showMessage("Updating Page Below");
    }
  };
  const reverseAddLaborant = () => {
    setIsAddLaborant(!isAddLaborant);
    setIsUpdateOpen(false);
    setIsAddReport(false);
    setIsDetailed(false);
    if (isAddLaborant !== true) {
      showMessage("Adding Laborant Form Below");
    }
  };
  const reverseAddReport = () => {
    setIsAddReport(!isAddReport);
    setIsUpdateOpen(false);
    setIsDetailed(false);
    if (isAddReport !== true) {
      showMessage("Adding Page Below");
    }
  };

  useEffect(() => {
    getReportList();
    getLaborantList();
  }, []);
  useEffect(() => {
    getUpdatedList();
  }, [isRefresh]);
  useEffect(() => {
    setIsSorted(false);
  }, [isSorted]);
  useEffect(() => {
    getDeletedList();
  }, [isDeleted]);

  return (
    <div>
      <FormLabel
        style={{ fontSize: "20px  ", marginTop: "50px", marginBottom: "10px" }}
      >
        Searching Area
      </FormLabel>
      <Textarea
        onChange={(i) => setText(i.target.value)}
        name="Primary"
        placeholder="Search for what you need"
        variant="outlined"
        color="neutral"
        style={{ marginBottom: "10px" }}
      />
      {text ? (
        <FormLabel style={{ fontSize: "12px", marginBottom: "20px" }}>
          You are searching for {text}
        </FormLabel>
      ) : (
        ""
      )}
      <Button
        style={{ margin: "10px" }}
        size="sm"
        onClick={() => {
          sortReportListFromNewToOld();
          showMessage("Sorted Report List From New To Old");
        }}
      >
        Sort newest to oldest
      </Button>
      <Button
        style={{ margin: "10px" }}
        size="sm"
        onClick={() => {
          sortReportListFromOldToNew();
          showMessage("Sorted Report List From Old To New");
        }}
      >
        Sort oldest to newest
      </Button>
      <Table sx={{ "& tr > *:not(:first-child)": { textAlign: "right" } }}>
        <thead>
          <tr>
            <th>Report Number</th>
            <th>Patient Name</th>
            <th>Patient LastName</th>
            <th>Patient No</th>
            <th>Diagnosis</th>
            <th>Detail Of Diagnosis</th>
            <th>Laborant Name</th>
            <th>Laborant Surname</th>
            <th>Id Of Laborant</th>
            <th>Date </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reportList
            .filter((report) => {
              return text.toLowerCase() === ""
                ? report
                : report.patientName.toLowerCase().includes(text) ||
                    report.patientLastName.toLowerCase().includes(text) ||
                    report.patientNo.toString().includes(text) ||
                    report.laborant.laborantName.toLowerCase().includes(text) ||
                    report.laborant.laborantLastName
                      .toLowerCase()
                      .includes(text);
            })
            .map((report) => (
              <tr>
                <td>{report.id}</td>
                <td>{report.patientName}</td>
                <td>{report.patientLastName}</td>
                <td>{report.patientNo}</td>
                <td>{report.diagnosis}</td>
                <td>
                  <Button
                    onClick={() => {
                      reverseDetailed();
                      fillStates(
                        report.patientName,
                        report.patientLastName,
                        report.diagnosis,
                        report.detailOfDiagnosis,
                        report.photoUrl,
                        report.id,
                        report.patientNo,
                        report.createdDate,
                        report.laborant.laborantName,
                        report.laborant.laborantLastName,
                        report.laborant.id
                      );
                    }}
                    size="sm"
                    style={{ background: "green" }}
                  >
                    Show Details
                  </Button>
                </td>
                <td>{report.laborant.laborantName}</td>
                <td>{report.laborant.laborantLastName}</td>
                <td>{report.idOfLaborant}</td>
                <td>{report.createdDate}</td>
                <td>
                  <Button
                    onClick={() => {
                      reverseUpdateState();
                      fillStates(
                        report.patientName,
                        report.patientLastName,
                        report.diagnosis,
                        report.detailOfDiagnosis,
                        report.photoUrl,
                        report.id,
                        report.patientNo,
                        report.createdDate,
                        report.laborant.laborantName,
                        report.laborant.laborantLastName,
                        report.laborant.id
                      );
                    }}
                    size="sm"
                    style={{ margin: "5px", background: "black" }}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      deleteReport(report.id);
                      changeDeletedState();
                      showMessageDanger("Report Deleted");
                    }}
                    style={{ margin: "5px", background: "red" }}
                    size="sm"
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Button style={{ margin: "40px" }} onClick={reverseAddReport} size="md">
        Add New Report
      </Button>
      <Link to="/laborant" className="link" >
        {" "}
        <Button style={{ margin: "40px" }}  size="md">
          View All Laborants
        </Button>
      </Link>

      <Button style={{ margin: "40px" }} onClick={reverseAddLaborant} size="md">
        Add New Laborant
      </Button>

      {isAddReport ? (
        <Container>
          <h3>Adding new report by filling spaces</h3>{" "}
          <FormLabel>Patient Name : </FormLabel>
          <Input
            placeholder="Patient Name"
            onChange={(i) => setPatientName(i.target.value)}
          ></Input>
          <FormLabel>Patient Last Name : </FormLabel>
          <Input
            placeholder="Patient Last Name"
            onChange={(i) => setPatientLastName(i.target.value)}
          ></Input>
          <FormLabel>Patient No : </FormLabel>
          <Input
            placeholder="Patient No"
            onChange={(i) => setPatientNo(i.target.value)}
          ></Input>
          <FormLabel>Diagnosis : </FormLabel>
          <Input
            placeholder="Diagnosis Name"
            onChange={(i) => setDiagnosis(i.target.value)}
          ></Input>
          <FormLabel>Detail Of Diagnosis : </FormLabel>
          <Input
            placeholder="Detail of Diagnosis"
            onChange={(i) => setDetailOfDiagnosis(i.target.value)}
          ></Input>
          <FormLabel>Id Of Laborant : </FormLabel>
          <Input
            placeholder="Id Of Laborant "
            onChange={(i) => setIdOfLaborant(i.target.value)}
          ></Input>
          <FormLabel>Photo Url : </FormLabel>
          <Input
            placeholder="Photo Url "
            onChange={(i) => setPhotoUrl(i.target.value)}
          ></Input>
          <Button
            style={{ margin: "40px" }}
            onClick={() => {
              isIdValid(idOfLaborant);
              saveReport();
              reverseAddReport();
              changeRefreshState();
            }}
          >
            Create New Report
          </Button>
          <Button
            style={{ margin: "40px" }}
            onClick={() => {
              showMessageDanger("Adding Form Closed");
              reverseAddReport();
            }}
          >
            Close Adding Form
          </Button>
        </Container>
      ) : (
        ""
      )}
      {isAddLaborant ? (
        <Container>
          <h3>Adding New Laborant Form</h3>{" "}
          <FormLabel style={{ marginBottom: "10px", fontSize: "15px" }}>
            {" "}
            !! You can not decide the hospital no of laborant because it is
            created by automaticaly !!
          </FormLabel>
          <FormLabel>Laborant Name : </FormLabel>
          <Input
            placeholder="Laborant Name"
            onChange={(i) => setLaborantName(i.target.value)}
          ></Input>
          <FormLabel>Laborant Last Name : </FormLabel>
          <Input
            placeholder="Laborant Last Name"
            onChange={(i) => setLaborantLastName(i.target.value)}
          ></Input>
          <Button
            style={{ margin: "40px" }}
            onClick={() => {
              saveNewLaborant();
              reverseAddLaborant();
              showMessage("Laborant Created Successfully");
            }}
          >
            Add New Laborant
          </Button>
          <Button
            style={{ margin: "40px" }}
            onClick={() => {
              showMessageDanger("Adding Laborant Form Closed");
              reverseAddLaborant();
            }}
          >
            Close Adding Laborant Form
          </Button>
        </Container>
      ) : (
        ""
      )}
      {isUpdateOpen ? (
        <Container>
          <h3>Updating a report by filling spaces</h3>{" "}
          <FormLabel>Patient Name : </FormLabel>
          <Input
            value={patientName}
            onChange={(i) => setPatientName(i.target.value)}
          ></Input>
          <FormLabel>Patient Last Name : </FormLabel>
          <Input
            value={patientLastName}
            onChange={(i) => setPatientLastName(i.target.value)}
          ></Input>
          <FormLabel>Diagnosis : </FormLabel>
          <Input
            value={diagnosis}
            onChange={(i) => setDiagnosis(i.target.value)}
          ></Input>
          <FormLabel>Detail Of Diagnosis : </FormLabel>
          <Input
            value={detailOfDiagnosis}
            onChange={(i) => setDetailOfDiagnosis(i.target.value)}
          ></Input>
          <FormLabel>Photo Url : </FormLabel>
          <Input
            value={photoUrl}
            onChange={(i) => setPhotoUrl(i.target.value)}
          ></Input>
          <Button
            style={{ margin: "20px" }}
            onClick={() => {
              cleanStates();
              showMessage("Report has updated ! ");
              reverseUpdateState();
              updateReport(reportId);
              changeRefreshState();
            }}
          >
            Update a report
          </Button>
          <Button
            style={{ margin: "20px" }}
            onClick={() => {
              showMessageDanger("Update Form Closed");
              reverseUpdateState();
            }}
          >
            Close Update Form
          </Button>
        </Container>
      ) : (
        ""
      )}
      {isDetailed ? (
        <Container>
          <h3 style={{ color: "green" }}>Detailed Report Of {patientName}</h3>{" "}
          <FormLabel style={{ margin: "8px" }}>File No : </FormLabel>
          <Input
            style={{ margin: "5px", color: "black" }}
            value={reportId}
            disabled
          ></Input>
          <FormLabel style={{ margin: "8px" }}>Patient Name : </FormLabel>
          <Input
            style={{ margin: "5px", color: "black" }}
            value={patientName}
            disabled
          ></Input>
          <FormLabel style={{ margin: "8px" }}>Patient Last Name : </FormLabel>
          <Input
            style={{ margin: "5px", color: "black" }}
            value={patientLastName}
            disabled
          ></Input>
          <FormLabel style={{ margin: "8px" }}>Patient No : </FormLabel>
          <Input
            style={{ margin: "5px", color: "black" }}
            value={patientNo}
            disabled
          ></Input>
          <FormLabel style={{ margin: "8px" }}>Diagnosis : </FormLabel>
          <Input
            style={{ margin: "5px", color: "black" }}
            value={diagnosis}
            disabled
          ></Input>
          <FormLabel style={{ margin: "8px" }}>
            Detail Of Diagnosis :{" "}
          </FormLabel>
          <Input
            style={{ margin: "5px", color: "black" }}
            value={detailOfDiagnosis}
            disabled
          ></Input>
          <FormLabel style={{ margin: "8px" }}>Photo : </FormLabel>
          <img src={photoUrl} alt="Photo of disease"></img>
          <FormLabel style={{ margin: "8px" }}>Id Of Laborant : </FormLabel>
          <Input
            style={{ margin: "5px", color: "black" }}
            value={idOfLaborant}
            disabled
          ></Input>
          <FormLabel style={{ margin: "8px" }}>Laborant Name :</FormLabel>
          <Input
            style={{ margin: "5px", color: "black" }}
            value={laborantName}
            disabled
          ></Input>
          <FormLabel style={{ margin: "8px" }}>Laborant Last Name : </FormLabel>
          <Input
            style={{ margin: "5px", color: "black" }}
            value={laborantLastName}
            disabled
          ></Input>
          <Button
            style={{ margin: "40px", background: "red" }}
            onClick={() => {
              reverseDetailed();
              showMessageDanger("Detail Form Closed");
            }}
          >
            Close Details
          </Button>
        </Container>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
