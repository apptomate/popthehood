import moment from 'moment';
export const getAlertToast = (type = 'success', text = '', timer = 5000) => ({
  toast: true,
  position: 'bottom',
  titleText: text,
  type: type,
  showConfirmButton: false,
  timer: timer
});

export const getAlert = (type = 'success', text = '') => ({
  position: 'center',
  type: type,
  text: text,
  customClass: {
    confirmButton: 'btn-shadow btn btn-primary btn-lg'
  },
  buttonsStyling: false,
  confirmButtonColor: '#000' //11111111111111111111111
});

export const getConfirm = (
  type = 'success',
  text = '',
  confirmButtonText = 'Yes'
) => ({
  text: text,
  type: type,
  showCancelButton: true,
  confirmButtonColor: '000', //11111111111111111111111
  cancelButtonColor: '#939392',
  confirmButtonText: confirmButtonText
});

//Authorized Token
export function authHeader() {
  const token = localStorage.getItem('token');
  return token && { Authorization: 'Bearer ' + token };
}

export const preventDefaultFn = e => e.preventDefault();

export function dateFormat(date) {
  if (moment(date).isValid()) {
    return moment(date).format('DD/MM/YYYY');
  } else {
    return '';
  }
}

export function dateTimeFormat(date, format) {
  if (moment(date).isValid()) {
    return moment(date).format(format);
  } else {
    return '';
  }
}

export const staticYearArray = () => {
  const yearArray = [];
  const currentYear = new Date().getFullYear();
  for (var s_year = 1950; s_year <= currentYear; s_year++) {
    yearArray.push(s_year);
  }
  return yearArray;
};
