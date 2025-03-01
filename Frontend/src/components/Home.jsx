import { useState } from "react";
import { Container, Row, Col, Card, ProgressBar, Dropdown } from "react-bootstrap";
import Header from "../components/Header"; // Import the Header component
import "./home.css"
import { BsFilter } from "react-icons/bs"; // BsFilter is the filter icon
import vbg from "../assets/vbg.mp4"

 // Import filter icon

const Home = () => {
  // Sample financial data
  const [totalBalance] = useState(50000);
  const [income] = useState(10000);
  const [expenses] = useState(5000);
  const [savingsGoal] = useState(20000);
  const [setFilterOption] = useState("Current Year");

  // Calculate savings progress
  const savingsProgress = Math.min((totalBalance / savingsGoal) * 100, 100);

  // Handle filter selection
  const handleFilterSelect = (option) => {
    setFilterOption(option);
    console.log("Selected filter:", option);
  };

  return (
    <>
      <Header /> {/* Header with updated styles */}
      <video autoPlay muted loop className="video-bg">
              <source src={vbg} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
      <Container className="mt-5 d-flex flex-column align-items-center">
        {/* Filter Dropdown */}
        <div className="mb-3">
          <Dropdown>
          <Dropdown.Toggle variant="primary" className="filter-btn">
            <BsFilter className="filter-icon" /> Filter (Current Year)
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterSelect("Current Year")}>
                Current Year
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect("Last 2 Months")}>
                Last 2 Months
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect("Last 6 Months")}>
                Last 6 Months
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect("Last Year")}>
                Last Year
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Overview Cards */}
        <Row className="mb-4 w-100 justify-content-center">
          <Col md={4} className="d-flex justify-content-center">
            <Card className="text-center shadow w-100">
              <Card.Body>
                <Card.Title>💰 Total Balance</Card.Title>
                <h4>₹{totalBalance}</h4>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="d-flex justify-content-center">
            <Card className="text-center shadow w-100">
              <Card.Body>
                <Card.Title>🔄 Income</Card.Title>
                <h4>₹{income}</h4>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="d-flex justify-content-center">
            <Card className="text-center shadow w-100">
              <Card.Body>
                <Card.Title>📉 Expenses</Card.Title>
                <h4>₹{expenses}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Savings Goal Progress */}
        <Card className="shadow w-75">
          <Card.Body>
            <Card.Title>🎯 Savings Goal Progress</Card.Title>
            <ProgressBar now={savingsProgress} label={`${savingsProgress.toFixed(0)}%`} />
            <p className="mt-2">Goal: ₹{savingsGoal}</p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};



export default Home;
