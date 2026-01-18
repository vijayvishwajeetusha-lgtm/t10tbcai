import type { User, Event } from "./types"

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
]

export const defaultUsers: User[] = [
  {
    id: "1",
    email: "general@cricketindia.com",
    password: "admin123",
    name: "Abhishek Kumar Singh",
    role: "general_secretary",
    phone: "+91 94157 01006, 79052 51534",
  },
  {
    id: "2",
    email: "maharashtra@cricketindia.com",
    password: "state123",
    name: "Amit Patil",
    role: "state_secretary",
    state: "Maharashtra",
    phone: "+91 98765 43211",
  },
  {
    id: "3",
    email: "karnataka@cricketindia.com",
    password: "state123",
    name: "Suresh Reddy",
    role: "state_secretary",
    state: "Karnataka",
    phone: "+91 98765 43212",
  },
  {
    id: "4",
    email: "tamilnadu@cricketindia.com",
    password: "state123",
    name: "Venkat Raman",
    role: "state_secretary",
    state: "Tamil Nadu",
    phone: "+91 98765 43213",
  },
  {
    id: "5",
    email: "delhi@cricketindia.com",
    password: "state123",
    name: "Vikas Sharma",
    role: "state_secretary",
    state: "Delhi",
    phone: "+91 98765 43214",
  },
]

export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "T10 Tennis Ball Cricket Championship 2026",
    date: "According to state",
    location: "Notified Later through message",
    description: "The biggest cricket tournament of the year featuring teams from all states!",
    image: "/packed-cricket-stadium.png",
  },
  {
    id: "2",
    title: "Youth Cricket League",
    date: "April 10-20, 2026",
    location: "Bengaluru, Karnataka",
    description: "Showcasing young talent from across the nation.",
    image: "/young-cricket-players-training.jpg",
  },
]

export const leadershipTeam = [
  {
    name: "Shri Gurvinder Singh",
    position: "President",
    image: "/indian-man-president-formal-portrait.jpg",
    description: "Leading cricket development across India since 2018",
  },
  {
    name: "Shri Abhishek Kumar Singh",
    position: "General Secretary",
    image: "/indian-man-secretary-formal-portrait.jpg",
    description: "Managing operations and player registrations nationwide",
  },
  {
    name: "Shri Nitesh Shinde",
    position: "Treasurer",
    image: "/indian-man-treasurer-formal-portrait.jpg",
    description: "Overseeing financial management and sponsorships",
  },
]

export const stateSecretaries = [
  { name: "Ball Provided By Khanna Ball", state: "", image: "/13.jpeg", phone: "+91 9415701006" },
{ name: "Uttar Pradesh", state: "T10TBCAI OF Uttar Pradesh", image: "/1.jpg", phone: "+91 9415701006" },
  { name: "Telangana", state: "T10TBCAI OF Telangana", image: "2.jpg", phone: "+91 9415701006" },
  { name: "Jharkhand", state: "T10TBCAI OF Jharkhand", image: "3.jpg", phone: "+91 9415701006" },
  { name: "Chhattisgarh", state: "T10TBCAI OF Chhattisgarh", image: "4.jpg", phone: "+91 9415701006" },
  { name: "Goa", state: "T10TBCAI OF Goa", image: "/5.jpg", phone: "+91 9415701006" },
  { name: "West Bengal", state: "T10TBCAI OF West Bengal", image: "/6.jpg", phone: "++91 9415701006" },
  { name: "Bihar", state: "T10TBCAI OF Bihar", image: "/7.jpg", phone: "++91 9415701006" },
  { name: "Uttarakhand", state: "T10TBCAI OF Uttarakhand", image: "/8.jpg", phone: "+91 9415701006" },
  { name: "Himanchal Pradesh", state: "T10TBCAI OF Himanchal Pradesh", image: "/9.jpg", phone: "+91 9415701006" },
  { name: "Assam", state: "T10TBCAI OF Assam", image: "/10.jpg", phone: "+91 9415701006" },
    { name: "Haryana", state: "T10TBCAI OF Haryana", image: "/11.jpg", phone: "+91 9415701006" },
    { name: "Andhra Pradesh", state: "T10TBCAI OF Andhra Pradesh", image: "/14.jpeg", phone: "+91 9415701006" },
    { name: "Jammu & Kashmir", state: "T10TBCAI OF Jammu & Kashmir", image: "/15.jpeg", phone: "+91 9415701006" },
    { name: "Maharashtra", state: "T10TBCAI OF Maharashtra", image: "/16.jpeg", phone: "+91 9415701006" },
        { name: "Karnataka", state: "T10TBCAI OF Karnataka", image: "/1600.jpeg", phone: "+91 9415701006" },



]
export const galleryImages = [
  { src: "/cricket-match-action-shot.jpg", title: "Championship Finals 2025" },
  { src: "/cricket-team-celebration-trophy.jpg", title: "Victory Celebration" },
  { src: "/cricket-stadium-aerial.png", title: "Tournament Venue" },
  { src: "/cricket-players-training.jpg", title: "Training Session" },
  { src: "/cricket-award-ceremony.jpg", title: "Award Ceremony" },
  { src: "/cricket-fans-cheering-stadium.jpg", title: "Fan Support" },
]
