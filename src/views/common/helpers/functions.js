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
    let token = localStorage.getItem('token');
    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}
