import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import CustomHeader from '../Header/Header';
import Bank from '../Bank/Bank';
import request from '../../services/api';

const { Header, Sider, Content } = Layout;

const Home = () => {

    const navigate = useNavigate()
    const [state, setState] = useState({
        collapsed: false,
    })
    const [getListBank, setGetListBank] = useState({
      rows: [],
      total: 0
    })

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [currentPagination, setCurrentPagination] = useState(1)
    const [paginationLimit, setPaginationLimit] = useState(20)
    const [searchValue, setSearchValue] = useState('')

    const toggle = () => {
        setState({
            collapsed: !state.collapsed
        })
    };

    const getList = () => {
      setLoading(true)
      request.bank.getList({
        Search : '',
        SortColumn: '',
        OrderType: '',
        PageNumber: '',
        PageLimit: '' 
      })
      .then(res => {
        // console.log(res)
        setGetListBank({
          rows: res.data.rows,
          total: res.data.total
        })
        setLoading(false)
      })
      .catch(err => {
        // console.log(err.response)
      })
    }

    const onSearch = () => {
      setLoading(true)
      request.bank.getList({
        Search: searchValue,
        SortColumn: '',
        OrderType: '',
        PageNumber: currentPagination,
        PageLimit: paginationLimit
      })
        .then(res => {
          setGetListBank({
            rows: res.data.rows,
            total: res.data.total
          })
          setLoading(false)
        })
        .catch(err => {
          console.log(err.response)
        })
    }

    const onChangeSearch = (e) => {
      const value = e.target.value
      setSearchValue(value)
    }

    useEffect(() => {
      onSearch()
    }, [currentPagination, paginationLimit])

    useEffect(() => {
      request.auth.getUser()
        .then(res => {
          setUser(res.data)
        })
        .catch(err => {
          // console.log(err.response)
          navigate('/login')
          localStorage.removeItem('accessToken')
        })
    }, [navigate])


    return (
      <Layout>
        <Sider style={{minHeight: '100vh', position: 'fixed'}} trigger={null} collapsible collapsed={state.collapsed}>
          <div className="logo">{user?.UserName}</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{marginLeft: `${state.collapsed ? '80px' : '200px'}`}} className="site-layout">
          <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            <CustomHeader state={state} toggle={toggle} />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Bank
              loading={loading}
              getListBank={getListBank}
              getList={getList}
              onSearch={onSearch}
              onChangeSearch={onChangeSearch}
              currentPagination={currentPagination}
              setCurrentPagination={setCurrentPagination}
              paginationLimit={paginationLimit}
              setPaginationLimit={setPaginationLimit}
            />
          </Content>
        </Layout>
      </Layout>
    );
}

export default Home