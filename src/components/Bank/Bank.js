import React, { useState } from 'react'
import { Table, Input, Button } from 'antd';
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
    getList,
    currentPagination,
    setCurrentPagination,
    paginationLimit,
    setPaginationLimit,
    onSearch,
    onChangeSearch
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
  const [sortColumn, setSortColumn] = useState('1')
  const [orderType, setOrderType] = useState('')
  const [bankInitialValues, setBankInitialValues] = useState({
    id: '0',
    bank_code: '',
    bank_name: '',
    state_id: 0
  })

  const firstColumnSort = () => {
    setSortColumn('1')
    if(sortColumn !== '1') {
      handleOrderType()
      setOrderType('')
    }
    else {
      handleOrderType()
    }
  }

  const secondColumnSort = () => {
    setSortColumn('2')
    if(sortColumn !== '2') {
      handleOrderType()
      setOrderType('')
    }
    else {
      handleOrderType()
    }
  }

  const thirdColumnSort = () => {
    setSortColumn('3')
    if(sortColumn !== '3') {
      handleOrderType()
      setOrderType('')
    }
    else {
      handleOrderType()
    }
  }

  const handleOrderType = () => {
    if(orderType === '') {
      setOrderType('asc')
    }
    else if(orderType === 'asc') {
      setOrderType('desc')
    }
    else {
      setOrderType('')
    }
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      onHeaderCell: () => {
        return {
          onClick: () => {
            firstColumnSort()
          }
        };
      },
      sorter: true,
    },
    {
      title: 'code',
      dataIndex: 'code',
      onHeaderCell: () => {
        return {
          onClick: () => {
            secondColumnSort()
          }
        };
      },
      sorter: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      onHeaderCell: () => {
        return {
          onClick: () => {
            thirdColumnSort()
          }
        };
      },
      sorter: true,
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
          getList()
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }

  const onChanePagination = (value, pageSize) => {
    setCurrentPagination(value)
    setPaginationLimit(pageSize)
  }

  const onShowSizeChange = (current, size) => {
    // setCurrentPagination(current)
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
                getList={getList}
              />
            : <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={{
                  pageSize: paginationLimit,
                  total,
                  current: currentPagination,
                  onChange: onChanePagination,
                  onShowSizeChange,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                  // defaultCurrent: currentPagination
                }}
              />
          }
      </div>
  )
}

export default Bank