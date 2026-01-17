"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PlayerTable } from "@/components/player-table"
import { getPlayers } from "@/lib/storage"
import type { Player } from "@/lib/types"

export default function AllPlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    setPlayers(getPlayers())
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">All Registered Players</h1>
          <p className="text-muted-foreground">View and manage all player registrations across India</p>
        </div>

        <PlayerTable players={players} showStateFilter={true} />
      </div>
    </DashboardLayout>
  )
}
