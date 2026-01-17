export interface Player {
  id: string
  name: string
  email: string
  phone: string
  state: string
  district: string
  dateOfBirth: string
  aadhaarNumber: string
  playerType: "batsman" | "bowler" | "allrounder" | "wicketkeeper"
  battingStyle: "right" | "left"
  bowlingStyle: string
  teamName: string
  photo: string
  paymentId: string
  paymentStatus: "pending" | "completed" | "failed"
  registrationDate: string
  receiptNumber: string
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: "general_secretary" | "state_secretary"
  state?: string
  phone: string
}

export interface Event {
  id: string
  title: string
  date: string
  location: string
  description: string
  image: string
}
