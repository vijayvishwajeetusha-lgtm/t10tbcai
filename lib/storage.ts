import type { Player, User } from "./types"
import { defaultUsers } from "./data"

const PLAYERS_KEY = "cricket_players"
const USERS_KEY = "cricket_users"
const CURRENT_USER_KEY = "cricket_current_user"

export function initializeStorage() {
  if (typeof window === "undefined") return

  const existingUsers = localStorage.getItem(USERS_KEY)
  if (!existingUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
  }
}

export function getPlayers(): Player[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(PLAYERS_KEY)
  return data ? JSON.parse(data) : []
}

export function savePlayer(player: Player) {
  const players = getPlayers()
  players.push(player)
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players))
}

export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(USERS_KEY)
  return data ? JSON.parse(data) : defaultUsers
}

export function createStateSecretary(userData: Omit<User, "id">): User {
  const users = getUsers()
  const newUser: User = {
    ...userData,
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
  }
  users.push(newUser)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return newUser
}

export function updateStateSecretary(userId: string, updates: Partial<User>): boolean {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === userId)
  if (index !== -1) {
    users[index] = { ...users[index], ...updates }
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    return true
  }
  return false
}

export function deleteStateSecretary(userId: string): boolean {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === userId && u.role === "state_secretary")
  if (index !== -1) {
    users.splice(index, 1)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    return true
  }
  return false
}

export function getStateSecretaries(): User[] {
  return getUsers().filter((u) => u.role === "state_secretary")
}

export function emailExists(email: string, excludeUserId?: string): boolean {
  const users = getUsers()
  return users.some((u) => u.email === email && u.id !== excludeUserId)
}

export function resetUserPassword(userId: string, newPassword: string): boolean {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === userId)
  if (index !== -1) {
    users[index].password = newPassword
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    return true
  }
  return false
}

export function updateUserPassword(userId: string, newPassword: string) {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === userId)
  if (index !== -1) {
    users[index].password = newPassword
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }
}

export function login(email: string, password: string): User | null {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  }
  return user || null
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(CURRENT_USER_KEY)
  return data ? JSON.parse(data) : null
}

export function generateReceiptNumber(): string {
  const prefix = "NCCA"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}
