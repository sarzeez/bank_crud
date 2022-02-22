import React, { useState } from 'react'
import { Table, Input, Button, message } from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import './bank.css'
import request from '../../services/api';
import AddEdit from './AddEdit';
const { Search } = Input

const Bank = (props) => {
  const {
    loading,
    getListBank,
    currentPagination,
    setCurrentPagination,
    paginationLimit,
    setPaginationLimit,
    onSearch,
    onChangeSearch,
    setSortColumn,
    setOrderType
  } = props;
  const { rows, total } = getListBank;
  const data = rows.map((item, index) => ({
    key: index,
    id: item.id,
    name: item.name,
    code: item.code,
    status: item.status
  }))
  const [bankModal, setBankModal] = useState(false)
  
  const [bankInitialValues, setBankInitialValues] = useState({
    id: '0',
    bank_code: '',
    bank_name: '',
    state_id: 0
  })

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: true,
      columnKey: 1
    },
    {
      title: 'code',
      dataIndex: 'code',
      sorter: true,
      columnKey: 2
    },
    {
      title: 'name',
      dataIndex: 'name',
      sorter: true,
      columnKey: 3
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
    {
      title: 'actions',
      dataIndex: '',
      width: 100,
      render: (text, record) => (
        <div className='edit-delete-wrapper'>
          <div onClick={() => onEdit(text, record)}>
            <EditOutlined />
          </div>
          <div onClick={() => onDelete(text.id)}>
            <DeleteOutlined />
          </div>
        </div>
      )
    },
  ];

  const onEdit = async(text) => {
    const stateID = await request.bank.getListItem(text.id)
    const { data } = stateID;
    setBankInitialValues({
      id: data.ID,
      bank_code: data.Code,
      bank_name: data.Bankname,
      state_id: data.Stateid
    })
    setBankModal(true)
  }

  const onDelete = (id) => {
    const state = window.confirm('Are you sure to delete this item ?')
    if(state) {
      request.bank.deleteItem(id)
        .then(() => {
          onSearch()
        })
        .catch(err => {
          message.error(err?.response?.data?.error);
        })
    }
  }

  const onChanePagination = (value, pageSize) => {
    setCurrentPagination(value)
    setPaginationLimit(pageSize)
  }

  const onShowSizeChange = (_current, _size) => {
    // setCurrentPagination(current)
  }

  const onChangeTable = (_pagination, _filters, sorter, _extra) => {
    setSortColumn(sorter?.column?.columnKey ? sorter.column.columnKey : '')
    if(sorter.order === 'ascend') {
      setOrderType('asc')
    }
    else if(sorter.order === 'descend') {
      setOrderType('desc')
    }
    else {
      setOrderType('')
    }
  }

  return (
      <div>
          <div className='bank-header'>
            {
              bankModal 
              ? '' 
              :
              <>
                <Search
                  style={{width: '300px'}}
                  placeholder="input search text"
                  onSearch={onSearch}
                  onChange={onChangeSearch}
                  enterButton
                  size='middle'
                />
                <Button
                  type="primary"
                  size='middle'
                  onClick={() => setBankModal(true)}
                >
                  Add New
                </Button>
              </>
            }
          </div>
          {
            bankModal
            ? <AddEdit
                setBankModal={setBankModal}
                setBankInitialValues={setBankInitialValues}
                bankInitialValues={bankInitialValues}
                onSearch={onSearch}
              />
            : <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                onChange={onChangeTable}
                pagination={{
                  pageSize: paginationLimit,
                  total,
                  current: currentPagination,
                  onChange: onChanePagination,
                  onShowSizeChange,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                }}
              />
          }
      </div>
  )
}

export default Bank