const drawerWidth = 260;
const events = [
    {event_id: "check-in", display_name: "Hacker Check-in"},
    {event_id: "sat-lunch", display_name: "Saturday Lunch"},
    {event_id: "sat-dinner", display_name: "Saturday Dinner"},
    {event_id: "midnight-snack", display_name: "Midnight Snack"},
    {event_id: "sun-breakfast", display_name: "Sunday Breakfast"},
    {event_id: "sun-lunch", display_name: "Sunday Lunch"},
    {event_id: "techtalk-1", display_name: "1:30pm Tech Talk"},
    {event_id: "techtalk-2", display_name: "5:00pm Tech Talk"},
    {event_id: "techtalk-3", display_name: "7:30pm Tech Talk"},
    {event_id: "techtalk-4", display_name: "9:00pm Tech Talk"},
    {event_id: "techtalk-5", display_name: "11:00pm Tech Talk"},
    {event_id: "techtalk-6", display_name: "10:00am Tech Talk"},
    {event_id: "mc1", display_name: "Mini Challenge #1"},
    {event_id: "mc2", display_name: "Mini Challenge #2"},
    {event_id: "mc3", display_name: "Mini Challenge #3"},
    {event_id: "mc4", display_name: "Mini Challenge: Tech Trivia Contest"},
]

const databaseEvents = {
    check_in: true,
    sat_lunch: false,
    sat_dinner: false,
    midnight_snack: false,
    sun_breakfast: false,
    sun_lunch: false,
    techtalk_1: false,
    techtalk_2: false,
    techtalk_3: false,
    techtalk_4: false,
    techtalk_5: false,
    techtalk_6: false,
    mc_1: false,
    mc_2: false,
    mc_3: false,
    mc_4: false,


}

export {
    drawerWidth,
    events,
    databaseEvents
}