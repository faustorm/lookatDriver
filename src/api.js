'use strict';
import moment from 'moment';

const host = 'https://api.lookatdelivery.com';
const date = moment().format("YYYYMMDD");
const googleAPIKey = 'AIzaSyCsf1q3uCV27PoDxP4kzzyxrK-ZXFBI_KY';
const FOURSQUARE_API = {
  clientSercet: 'PJ2ILBAZ1QO1U4C5PRFULWCV4HOVUROYWHOZOUU5YSDSNTU4',
  clientId: 'O5LYGQDZ2B4VURAL3AHYZU01GW3JFKINRONNUTG5GVSIOXG0'
};

const getHeader = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const putHeader = {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const postHeader = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const postFileHeader = {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

module.exports = {
  key: '@lookat:session',
  auth: {
    login(data) {
      const url = `${host}/user/login`;
      postHeader.body = JSON.stringify(data);
      return fetch(url, postHeader);
    }
  },
  trip: {
    near({lat, lng}) {
      const url = `${host}/trip/near?lat=${lat}&lng=${lng}`;
      console.log(url);
      return fetch(url, getHeader);
    },
    subscribe({id, token}) {
      const url = `${host}/trip/subscribe?id=${id}`;
      putHeader.headers.authorization = token;
      return fetch(url, putHeader);
    },
    current(token) {
      const url = `${host}/trip/current`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    finish({token, id}) {
      const url = `${host}/trip/terminate?id=${id}`;
      putHeader.headers.authorization = token;
      return fetch(url, putHeader);
    },
    history(token) {
      const url = `${host}/trip/driver/history`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
  },
  driver: {
    profile(token) {
      const url = `${host}/driver`;
      getHeader.headers.authorization = token;
      console.log(getHeader)
      return fetch(url, getHeader);
    },
    card(token) {
      const url = `${host}/driver/bankAccount`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    postCard(token, data) {
      const url = `${host}/bankAccount`;
      console.log(data)
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    putCard(token, data) {
      const url = `${host}/bankAccount`;
      console.log(data)
      putHeader.body = JSON.stringify(data);
      putHeader.headers.authorization = token;
      return fetch(url, putHeader);
    },
    activeDriver(token, active){
      const url = `${host}/driver/active?active=${active}`;
      putHeader.headers.authorization = token;
      return fetch(url, putHeader);
    }
  },
  destination: {
    trip({token, id}) {
      const url = `${host}/destination/trip?id=${id}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    check({token, id, trip}) {
      const url = `${host}/destination/check?id=${id}&&trip=${trip}`;
      console.log(url);
      putHeader.headers.authorization = token;
      return fetch(url, putHeader);
    },
    cash({token, id}) {
      const url = `${host}/cash/trip?id=${id}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    }
  },
  user: {
    userInfo(token) {
      const url = `${host}/user`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    updateUserDeviceInfo(data) {
      const url = `${host}/user/pushtoken`;
      postHeader.body = JSON.stringify(data.user);
      postHeader.headers.authorization = data.token;
      return fetch(url, postHeader);
    }
  },
  cash: {
    history(token) {
      const url = `${host}/cash/driver/history`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    }
  },
  deposits: {
    history(token) {
      const url = `${host}/deposit/history`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    }
  },
  loan: {
    requestLoan(token, id) {
      console.log(token)
      console.log(id);
      const url = `${host}/loan/driver?id=${id}`;
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    }
  }
};
