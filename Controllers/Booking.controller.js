const rooms=[

    {
        room_id:1,
        room_name:"room1",
        status:"available",
        amentities:"AC,TV,Wifi",
        price_per_hour:"100"
        
    },
    {
        room_id:2,
        room_name:"room2",
        status:"available",
        amentities:"AC,TV",
        price_per_hour:"80"

    },
    {
        room_id:3,
        room_name:"room3",
        status:"available",
        amentities:"TV,Wifi",
        price_per_hour:"120"
    },
        {
            room_id:4,
            room_name:"room4",
            status:"available",
            amentities:"AC,TV,Wifi",
            price_per_hour:"150"
        }
];

const bookings=[{
    customer_name:"harsha",
    status:"booked",
    date:"11-10-2024",
    start_time:"10:00",
    end_time:"21:00",
    room_id:"1"
}];

export const createRoom=(req,res)=>{
    const newRoom=req.body;
    rooms.push(newRoom);
    res.status(201).send("Room created successfully");
}

export const getAllRooms=(req, res)=>{
    res.status(200).send(rooms);
}
 

export const bookRoom=(req, res)=>{
    const {customer_name, date, start_time, end_time, room_id}=req.body;
    const room=rooms.find((room)=>room.room_id==room_id);
    const booking={
        customer_name,
        start_time,
        end_time,
        date,
        room_id,
        booking_id:bookings.length+1,
        booking_date:date,
        status:"booked"
        
    };
    const index=rooms.findIndex((room)=>room.room_id==booking.room_id);
      
    if(!room){
        return res.status(404).send("Room not found");
    }
    else if(room.status !== "available"){
        return res.status(400).send("Room not available");
    }
    let dateCheck=bookings.filter((booking1)=>booking1.date==date);
    if(dateCheck.length>0){
        return res.status(400).send("Room already booked for the date");
    }



    
    
   
    bookings.push(booking);
    
    res.status(201).send("Room booked successfully");
};

export const listBookings=(req, res)=>{
    const bookingsWithRoomDetails=bookings.map((booking)=>{
        const room=rooms.find((room)=>room.room_id==booking.room_id);
        return{
            room_name:room.room_name,
            status:booking.status,
            customer_name:booking.customer_name,
            date:booking.date,
            start_time:booking.start_time,
            end_time:booking.end_time
        }
    })
    res.status(200).send(bookingsWithRoomDetails);
}



export const getCustomersWithBookings=(req, res)=>{
    const customersWithBookings=bookings.map((booking)=>{
        const room=rooms.find((room)=>room.room_id==booking.room_id);
         return{
            customer_name:booking.customer_name,
            room_name:room.room_name,
            date:booking.date,
            start_time:booking.start_time,
            end_time:booking.end_time
        }
    })
    res.status(200).send(customersWithBookings);
}




export const countRoomBookings=(req, res)=>{
    const roomBookings=bookings.reduce((acc, booking)=>{
        const room_id=booking.room_id;
        acc[room_id]=(acc[room_id]||0)+1;
        return acc;
    },{})
    res.status(200).send(roomBookings);
}


