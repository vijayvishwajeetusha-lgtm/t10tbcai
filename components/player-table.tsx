"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Download, Filter, User } from "lucide-react"
import type { Player } from "@/lib/types"
import { indianStates } from "@/lib/data"

interface PlayerTableProps {
  players: Player[]
  showStateFilter?: boolean
}

export function PlayerTable({ players, showStateFilter = true }: PlayerTableProps) {
  const [search, setSearch] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(search.toLowerCase()) ||
      player.email.toLowerCase().includes(search.toLowerCase()) ||
      player.receiptNumber.toLowerCase().includes(search.toLowerCase())

    const matchesState = stateFilter === "all" || player.state === stateFilter
    const matchesType = typeFilter === "all" || player.playerType === typeFilter

    return matchesSearch && matchesState && matchesType
  })

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "State", "District", "Player Type", "Team", "Receipt No", "Date"]
    const rows = filteredPlayers.map((p) => [
      p.name,
      p.email,
      p.phone,
      p.state,
      p.district,
      p.playerType,
      p.teamName,
      p.receiptNumber,
      new Date(p.registrationDate).toLocaleDateString(),
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `players-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or receipt number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {showStateFilter && (
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by State" />
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
        )}

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Player Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="batsman">Batsman</SelectItem>
            <SelectItem value="bowler">Bowler</SelectItem>
            <SelectItem value="allrounder">All-Rounder</SelectItem>
            <SelectItem value="wicketkeeper">Wicket Keeper</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={exportToCSV} className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">Showing {filteredPlayers.length} players</p>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Player</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Receipt No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No players found
                </TableCell>
              </TableRow>
            ) : (
              filteredPlayers.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-sm text-muted-foreground">{player.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{player.state}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {player.playerType}
                    </Badge>
                  </TableCell>
                  <TableCell>{player.teamName}</TableCell>
                  <TableCell className="font-mono text-sm">{player.receiptNumber}</TableCell>
                  <TableCell>{new Date(player.registrationDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedPlayer(player)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Player Details</DialogTitle>
                          <DialogDescription>Complete information for {player.name}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{player.name}</h3>
                              <p className="text-muted-foreground">{player.email}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Phone</p>
                              <p className="font-medium">{player.phone}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Date of Birth</p>
                              <p className="font-medium">{new Date(player.dateOfBirth).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">State</p>
                              <p className="font-medium">{player.state}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">District</p>
                              <p className="font-medium">{player.district}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Player Type</p>
                              <p className="font-medium capitalize">{player.playerType}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Batting Style</p>
                              <p className="font-medium capitalize">{player.battingStyle} Handed</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Bowling Style</p>
                              <p className="font-medium capitalize">{player.bowlingStyle?.replace(/-/g, " ")}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Team</p>
                              <p className="font-medium">{player.teamName}</p>
                            </div>
                          </div>

                          <div className="bg-muted p-4 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Receipt Number</p>
                                <p className="font-mono font-medium">{player.receiptNumber}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Payment ID</p>
                                <p className="font-mono font-medium text-xs">{player.paymentId}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Registration Date</p>
                                <p className="font-medium">{new Date(player.registrationDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Payment Status</p>
                                <Badge className="bg-green-100 text-green-800 capitalize">{player.paymentStatus}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
