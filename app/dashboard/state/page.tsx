"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, IndianRupee, TrendingUp, Calendar, Trophy } from "lucide-react"
import { getPlayers, getCurrentUser } from "@/lib/storage"
import type { Player, User } from "@/lib/types"

export default function StateDashboardPage() {
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

  const totalRevenue = players.length * 1500

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
          <h1 className="text-3xl font-bold">State Secretary Dashboard</h1>
          <p className="text-muted-foreground">
            Manage registrations for <span className="text-primary font-medium">{user?.state}</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">State Players</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{players.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Registered in {user?.state}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">State Revenue</CardTitle>
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Teams</CardTitle>
              <Trophy className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{new Set(players.map((p) => p.teamName)).size}</p>
              <p className="text-xs text-muted-foreground mt-1">Unique teams</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
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
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-sm text-muted-foreground">{player.teamName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm capitalize text-primary">{player.playerType}</p>
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
      </div>
    </DashboardLayout>
  )
}
