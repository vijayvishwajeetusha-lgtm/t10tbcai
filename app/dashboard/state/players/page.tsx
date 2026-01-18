"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PlayerTable } from "@/components/player-table"
import { getPlayers, getCurrentUser } from "@/lib/storage"
import type { Player, User } from "@/lib/types"

export default function StatePlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (currentUser?.state) {
      const allPlayers = getPlayers()
      setPlayers(allPlayers.filter((p) => p.state === currentUser.state))
    }
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{user?.state} Players</h1>
          <p className="text-muted-foreground">View and manage player registrations from your state</p>
        </div>

        <PlayerTable players={players} showStateFilter={false} />
      </div>
    </DashboardLayout>
  )
}
