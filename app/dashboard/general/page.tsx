"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, TrendingUp, IndianRupee, Trophy, Calendar } from "lucide-react"
import { getPlayers } from "@/lib/storage"
import { indianStates } from "@/lib/data"
import type { Player } from "@/lib/types"

export default function GeneralDashboardPage() {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    setPlayers(getPlayers())
  }, [])

  const totalRevenue = players.length * 999

  const stateWiseCount = indianStates
    .map((state) => ({
      state,
      count: players.filter((p) => p.state === state).length,
    }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count)

  const playerTypeCount = {
    batsman: players.filter((p) => p.playerType === "batsman").length,
    bowler: players.filter((p) => p.playerType === "bowler").length,
    allrounder: players.filter((p) => p.playerType === "allrounder").length,
    wicketkeeper: players.filter((p) => p.playerType === "wicketkeeper").length,
  }

  const recentPlayers = [...players]
    .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
    .slice(0, 5)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">General Secretary Dashboard</h1>
          <p className="text-muted-foreground">Overview of all registrations and tournament statistics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Players</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{players.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Registered players</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active States</CardTitle>
              <MapPin className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stateWiseCount.length}</p>
              <p className="text-xs text-muted-foreground mt-1">States with registrations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <IndianRupee className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">From registrations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {
                  players.filter((p) => {
                    const regDate = new Date(p.registrationDate)
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return regDate >= weekAgo
                  }).length
                }
              </p>
              <p className="text-xs text-muted-foreground mt-1">New registrations</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Player Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Player Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(playerTypeCount).map(([type, count]) => {
                  const percentage = players.length > 0 ? (count / players.length) * 100 : 0
                  return (
                    <div key={type}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize text-sm font-medium">{type}</span>
                        <span className="text-sm text-muted-foreground">{count} players</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top States */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                Top States by Registration
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stateWiseCount.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No registrations yet</p>
              ) : (
                <div className="space-y-3">
                  {stateWiseCount.slice(0, 5).map((item, index) => (
                    <div key={item.state} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium">{item.state}</span>
                      </div>
                      <span className="text-primary font-semibold">{item.count} players</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Registrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentPlayers.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No registrations yet</p>
            ) : (
              <div className="space-y-3">
                {recentPlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {player.state} - {player.teamName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm">{player.receiptNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(player.registrationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
