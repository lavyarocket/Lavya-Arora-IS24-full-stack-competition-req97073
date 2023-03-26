import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  const handleReset = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText("");
    setSearchedColumn(dataIndex);
  };

  function filterIcon(filtered) {
    return (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    )
  }

  function onFilter(value, record, dataIndex) {
    return record[dataIndex]
    .toString()
    .toLowerCase()
    .includes(value.toLowerCase())
  }

  function onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  }

  function filterDropdown({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
  }) { return (
    <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Input
        ref={searchInput}
        placeholder={`Search ${placeholder}`}
        value={selectedKeys[0]}
        onChange={(e) => {
          const value = e.target.value ? [e.target.value] : [];

          setSelectedKeys(value);
        }}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        className="block mb-2"
      />
      <Space>
        <Button
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          className="flex items-center"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
      </Space>
    </div>
  )}

  function renderText(value, record, dataIndex) {
    return value;
  }

  function renderDate(date, record, dataIndex) {
    return date;
  }

  function renderArray(values, record, dataIndex){
    return (
      <div className="flex flex-col"> 
        {values.map((value, idx) => {
        return (
          <div key={idx}>{value}</div>
        )
      })}
      </div>
    )
  }

  function renderAction(value, record, dataIndex) {
    return (
      <Space size="middle">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Space>
    )
  }

  async function fetchProductData() {
    setIsDataLoading(true);

    try {
      const response = await axios.get("http://localhost:3000/api/products/");

      setData(response.data);
    } catch (err) {
      toast.err(err.response.data.message);
    } finally {
      setIsDataLoading(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      <main className="h-screen w-full p-8 flex items-center justify-center bg-[#F9FAFA]">
        <div className="h-full max-h-[70%] w-fit max-w-[90%] flex flex-col gap-4">
          <div className="flex items-center justify-between shrink-0">
            <span>Total Entries: </span>
            <Button>Add</Button>
          </div>
          <div className="overflow-auto relative flex-1">
            <Table
              loading={isDataLoading}
              dataSource={data}
              pagination={false}
              sticky={true}
              className="max-w-full"
            >
              <Table.Column width="12.5%" title="Product ID" dataIndex="productId" key="productId" render={renderText}  />
              <Table.Column width="12.5%" title="Product Name" dataIndex="productName" key="productName" render={renderText}/>
              <Table.Column width="12.5%" title="Product Owner" dataIndex="productOwnerName" key="productOwnerName" render={renderText}/>
              <Table.Column width="12.5%" title="Developers" dataIndex="Developers" key="Developers" render={renderArray} />
              <Table.Column width="12.5%" title="Scrum Master" dataIndex="scrumMasterName" key="scrumMasterName" render={renderText}/>
              <Table.Column width="12.5%" title="Start Date" dataIndex="startDate" key="startDate" render={renderDate}/>
              <Table.Column width="12.5%" title="Methodology" dataIndex="methodology" key="methodology" render={renderText} />
              <Table.Column width="12.5%" title="Action" key="action" render={renderAction}/>
            </Table>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}

export default App;
