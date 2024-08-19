import express from 'express';
import { bookRoom,  countRoomBookings,  createRoom, getAllRooms, getCustomersWithBookings, listBookings } from '../Controllers/Booking.controller.js';



const router=express.Router();

router.post('/createRoom', createRoom );
router.post('/bookRoom', bookRoom);
router.get('/bookedRooms', listBookings);
router.get('/allCustomers',getCustomersWithBookings);
router.get('/countOfRoomsBooked', countRoomBookings);
router.get('/rooms', getAllRooms)

export default router;