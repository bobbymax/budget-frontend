
import Swal from 'sweetalert2'


class Alerts
{
    flash = (title, status, message) => {
        const warning = Swal.fire({
            icon: status,
            title: title,
            text: message,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        return warning
    }

    success = (title, message) => {
        Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            timer: 3000
        })
    }

    error = (title, message) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            timer: 3000
        })
    }
}

export default new Alerts()