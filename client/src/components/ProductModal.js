import {
  Modal,
  DatePicker,
  Form,
  Input,
  Select,
} from "antd";
import axios from "axios";
import { forwardRef, useImperativeHandle, useState } from "react";
import toast from "react-hot-toast";
import Dayjs from "dayjs";

const initialFormData = {
  productId: "",
  productName: "",
  productOwnerName: "",
  Developers: undefined,
  scrumMasterName: "",
  startDate: null,
  methodology: "",
}

const ProductModal = forwardRef(({ open, setOpen, isUpdateModal, refetchData }, ref) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  useImperativeHandle(ref, () => ({
    setFormFields(data) {
      console.log(data);
      const deepCopiedData = JSON.parse(JSON.stringify(data));
      deepCopiedData.startDate = Dayjs(deepCopiedData.startDate);
      setFormData(deepCopiedData);
    }
  }));

  function onFormDataChange(value, key) {
    console.log(key, value);
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleOk = async () => {
    setConfirmLoading(true);
    
    try {
      if(isUpdateModal) {
        await updateProduct();
      } else {
        await addProduct();
      }
      setOpen(false);
      setFormData(initialFormData);
      refetchData();
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  async function addProduct() {
    const data = JSON.parse(JSON.stringify(formData));

    data.startDate = formData.startDate.format("YYYY/MM/DD");
    
    await axios.post("http://localhost:3000/api/products", data);
  }

  async function updateProduct() {
    const data = JSON.parse(JSON.stringify(formData));

    data.startDate = formData.startDate.format("YYYY/MM/DD");
    
    await axios.patch(`http://localhost:3000/api/products/${data.productId}`, data);
  }

  const handleCancel = () => {
    setOpen(false);
    setFormData(initialFormData);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
  };

  return (
    <Modal
      title={isUpdateModal ? "Update Product": "Add New Product" }
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form className="pt-4" {...formItemLayout} style={{ maxWidth: 600 }}>
        <Form.Item label="Product Name">
          <Input value={formData.productName} onChange={(e)=>onFormDataChange(e.target.value, "productName")}/>
        </Form.Item>
        <Form.Item label="Product Owner">
          <Input value={formData.productOwnerName} onChange={(e)=>onFormDataChange(e.target.value, "productOwnerName")}/>
        </Form.Item>
        <Form.Item label="Developers" help="Enter comma separated list of developers">
        <Select
          mode="tags"
          value={formData.Developers}
          style={{ width: '100%' }}
          onChange={(val)=>onFormDataChange(val, "Developers")}
          tokenSeparators={[',']}
          options={[]}
        />
        </Form.Item>
        <Form.Item label="Scrum Master">
          <Input value={formData.scrumMasterName} onChange={(e)=>onFormDataChange(e.target.value, "scrumMasterName")}/>
        </Form.Item>
        <Form.Item label = "Start Date">
          <DatePicker value={formData.startDate} onChange={(val)=>onFormDataChange(val, "startDate")} />
        </Form.Item>
        <Form.Item label = "Methodology">
        <Select
          showSearch
          placeholder="Select methodology"
          optionFilterProp="children"
          value={formData.methodology}
          onChange={(val)=>onFormDataChange(val, "methodology")}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 'Agile',
              label: 'Agile',
            },
            {
              value: 'Waterfall',
              label: 'Waterfall',
            }
          ]}
        />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default ProductModal;
