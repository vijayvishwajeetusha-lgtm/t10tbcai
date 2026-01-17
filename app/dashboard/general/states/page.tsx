"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlayerTable } from "@/components/player-table"
import { MapPin, Users, IndianRupee } from "lucide-react"
import { getPlayers } from "@/lib/storage"
import { indianStates, stateSecretaries } from "@/lib/data"
import type { Player } from "@/lib/types"

export default function StateWisePage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedState, setSelectedState] = useState("")

  useEffect(() => {
    setPlayers(getPlayers())
  }, [])

  const stateStats = indianStates
    .map((state) => {
      const statePlayers = players.filter((p) => p.state === state)
      return {
        state,
        count: statePlayers.length,
        revenue: statePlayers.length * 999,
        secretary: stateSecretaries.find((s) => s.state === state),
      }
    })
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count)

  const filteredPlayers = selectedState ? players.filter((p) => p.state === selectedState) : players

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">State Wise Analysis</h1>
            <p className="text-muted-foreground">View registrations and details by state</p>
          </div>

          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full md:w-64">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* State Cards Grid */}
        {!selectedState && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stateStats.map((stat) => (
              <Card
                key={stat.state}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => setSelectedState(stat.state)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {stat.state}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{stat.count}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <IndianRupee className="h-4 w-4" />
                      <span className="font-semibold">{stat.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  {stat.secretary && (
                    <p className="text-xs text-muted-foreground mt-2">Secretary: {stat.secretary.name}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Selected State Details */}
        {selectedState && selectedState !== "all" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {selectedState} Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Players</p>
                  <p className="text-2xl font-bold">{filteredPlayers.length}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{(filteredPlayers.length * 1).toLocaleString()}
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">State Secretary</p>
                  <p className="text-lg font-semibold">
                    {stateSecretaries.find((s) => s.state === selectedState)?.name || "Not Assigned"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Player Table */}
        {(selectedState || stateStats.length > 0) && (
          <PlayerTable players={filteredPlayers} showStateFilter={!selectedState} />
        )}
      </div>
    </DashboardLayout>
  )
}
