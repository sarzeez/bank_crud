import axios from 'axios';

export const url = 'http://templ-api.webase.uz';

const request = {
  auth: {
    signin: (credentials) =>
      axios
        .post(`${url}/Account/GenerateToken`, credentials, { headers: {'Content-Type': 'application/json-patch+json'}})
        .then((res) => res),
    saveToken: (token) => localStorage.setItem('accessToken', `Bearer ${token}`),
    getUser: () => 
      axios.get(`${url}/Account/GetUserInfo`, { headers: {Authorization: localStorage.getItem('accessToken')}})
  },
  bank: {
      getList: ({ Search, SortColumn, OrderType, PageNumber, PageLimit }) =>
        axios
        .get(`${url}/Bank/GetList${(Search || SortColumn || OrderType || PageNumber || PageLimit) ? `?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}` : ''}`, { headers: {Authorization: localStorage.getItem('accessToken')}}),
      getListItem: (id) =>
        axios.get(`${url}/Bank/Get?id=${id}`, { headers: {Authorization: localStorage.getItem('accessToken')}}),
      addListItem: ({ id, code, bankname, stateid }) =>
        axios.post(`${url}/Bank/Update`, {id, code, bankname, stateid}, { headers: {Authorization: localStorage.getItem('accessToken')}}),
      deleteItem: (id) => 
        axios.delete(`${url}/Bank/Delete?id=${id}`, { headers: {Authorization: localStorage.getItem('accessToken')}}),
      getStateList: () =>
        axios.get(`${url}/Helper/GetStateList`, { headers: {Authorization: localStorage.getItem('accessToken')}})
  }
};

export default request;