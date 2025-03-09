import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import Header from "../components/Header"; // Import the Header component
import "./home.css"
import { BsFilter } from "react-icons/bs"; // BsFilter is the filter icon
import vbg from "../assets/vbg.mp4"

 // Import filter icon

const Home = () => {
  const { transactions } = useTransactions(); // Get transactions from context
  const [filterOption, setFilterOption] = useState("Current Year");

  // Calculate savings progress
  const income = transactions.filter(t => t.type === "Income").reduce((total, t) => total + parseFloat(t.amount), 0);
  const expenses = transactions.filter(t => t.type === "Expense").reduce((total, t) => total + parseFloat(t.amount), 0);
  const savings = transactions.filter(t => t.type === "Savings").reduce((total, t) => total + parseFloat(t.amount), 0);
  const totalBalance = income - expenses;

  

  // Handle filter selection
  const handleFilterSelect = (option) => {
    setFilterOption(option);
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
            <BsFilter className="filter-icon" /> Filter ({filterOption})
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

          <Col md={4} className="d-flex justify-content-center">
            <Card className="text-center shadow w-100">
              <Card.Body>
                <Card.Title>📉 Savings</Card.Title>
                <h4>₹{savings}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </>
  );
};



export default Home;
