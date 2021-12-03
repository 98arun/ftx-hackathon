import Table from "./Components/table/Table";
import "./Assets/Style/style.css";
import Search from "./Components/search/Search";

function App() {
  return (
    <>
      <div className="main-container">
        <h1>Table Content</h1>
        <Search />
        <Table />
      </div>
    </>
  );
}

export default App;
