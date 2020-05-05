import { HOST } from '../constants';

export function normalizeRooms(rooms) {
    return rooms.map(room => {
        return {
            id: room.id || '',
            title: room.listing_name || '',
            image: room.image || '',
            homeType: room.home_type || '',
            bedRoom: room.bed_room || '',
            price: room.price || '',
            instant: room.instant || '',
        }
    })
}

export function normalizeRoom(room) {
    return {
        id: room.id || '',
        title: room.listing_name || '',
        image: room.image || '',
        homeType: room.home_type || '',
        bedRoom: room.bed_room || '',
        price: room.price || '',
        instant: room.instant || '',
        summary: room.summary || '',
        accomodate: room.accommodate || '',
        bathRoom: room.bath_room || '',
        unavailableDates: room.unavailableDates || '',
        host: room.host? {
            email: room.host.email || '',
            fullname: room.host.fullname || '',
            avatar: room.host.image || '',
        } : {
            email: '',
            fullname: '',
            avatar: '',
        }
    }
}

export function normalizeProfile(email, fullname, image) {
    return {
        email: email || '',
        fullname: fullname || '',
        avatar: image || '',
    }
}

export function normalizeReservations(reservations) {
    return reservations.map(reservation => {
        return {
            id: reservation.id || '',
            guest: reservation.guest ? {
                email: reservation.guest.email || '',
                fullname: reservation.guest.fullname || '',
                avatar: reservation.guest.avatar || '',
            } :{
                email: '',
                fullname: '',
                avatar: '',
            },
            total: reservation.total || '',
            startDate: reservation.start_date || '',
            endDate: reservation.end_date || '',
            status: reservation.status || '',
        }
    })
}
