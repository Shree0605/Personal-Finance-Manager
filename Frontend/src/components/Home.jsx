import { useState } from "react";
import { Container, Row, Col, Card, ProgressBar, Dropdown, Button } from "react-bootstrap";
import Header from "../components/Header"; // Import the Header component
import { BsFilter } from "react-icons/bs"; // BsFilter is the filter icon

 // Import filter icon

const Home = () => {
  // Sample financial data
  const [totalBalance, setTotalBalance] = useState(50000);
  const [income, setIncome] = useState(10000);
  const [expenses, setExpenses] = useState(5000);
  const [savingsGoal, setSavingsGoal] = useState(20000);
  const [filterOption, setFilterOption] = useState("Current Year");

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

const styles = {
  container: {
    backgroundImage: `url('/your-image.jpg')`, // Change to your actual image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: "100vh",
    padding: "20px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "flex-start", // Align to the left
    marginBottom: "20px",
  },
  filterButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
  },
  filterIcon: {
    marginRight: "5px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(5px)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    width: "30%",
    textAlign: "center",
  },
  savingsCard: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(5px)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    marginTop: "20px",
    textAlign: "center",
  },
  progressBar: {
    width: "100%",
    height: "10px",
    background: "#ddd",
    borderRadius: "5px",
    marginTop: "10px",
    overflow: "hidden",
  },
  progressFill: {
    width: "100%",
    height: "100%",
    background: "blue",
    color: "white",
    textAlign: "center",
    fontSize: "12px",
  },
};

export default Home;
