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

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      width: "14.2857143%",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Product Owner",
      dataIndex: "productOwnerName",
      key: "productOwnerName",
      width: "14.2857143%",
    },
    {
      title: "Developers",
      dataIndex: "Developers",
      key: "Developer",
      width: "14.2857143%",
      ...getColumnSearchProps("Developers", "Developer"),
    },
    {
      title: "Scrum Master",
      dataIndex: "scrumMasterName",
      key: "Scrum Master",
      width: "14.2857143%",
      ...getColumnSearchProps("scrumMasterName", "Scrum Master"),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: "14.2857143%",
    },
    {
      title: "Methodology",
      dataIndex: "methodology",
      key: "methodology",
      width: "14.2857143%",
    },
  ];

  function getColumnSearchProps(dataIndex, placeholder) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
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
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1890ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) => {
        if(!text) return;

        if(Array.isArray(text)) {
          return (
            searchedColumn === dataIndex ? (
              text.map((developer) => (
                <div key={developer}>
                  <Highlighter
                    highlightStyle={{
                      backgroundColor: "#FECE02",
                      padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={developer ? developer.toString() : ""}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col">
                {text.map((developer) => (
                  <div key={developer}>{developer}</div>
                ))}
              </div>
            ));
          } else {
          return (
            searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: "#FECE02",
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ""}
            />) : (text)
          )
        }
      },
    };
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
        <div className="h-full max-h-[70%] max-w-[70%] flex flex-col gap-4">
          <div className="flex items-center justify-between shrink-0">
            <span>Total Entries: </span>
            <Button>Add</Button>
          </div>
          <div className="overflow-auto relative flex-1">
            <Table
              loading={isDataLoading}
              pagination={false}
              dataSource={data}
              columns={columns}
              sticky={true}
            />
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}

export default App;
