'use client'

import {
    MessageSquareText,
    Pencil,
    Presentation,
    ShieldCheck,
    Sparkles,
    Target,
    Users
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { getUserAction } from '@/server/actions/user'
import { TeamType } from '@/server/database/models/team'

import Update from './update'

export default function Page() {
    const [teams, setTeams] = useState<TeamType[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<TeamType>()

    useEffect(() => {
        const getData = async () => {
            const user = await getUserAction()

            if (!user.data) {
                window.location.href = '/signin'
                return
            }

            setTeams(user.data.teams)
        }

        getData()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-200">
            <div className="container mx-auto px-4 py-10">
                <div className="rounded-2xl border border-white/40 bg-white/30 p-8 shadow-xl backdrop-blur-md">
                    <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-blue-900">
                        <Users className="text-blue-600" />
                        Team Mentor Assignments
                    </h2>

                    <p className="mb-6 text-sm font-semibold text-red-500">
                        ⚠️ Total Points Should be out of 20
                    </p>

                    <div className="overflow-x-auto rounded-lg border border-blue-200 bg-white/20 shadow-md backdrop-blur-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-blue-100/60">
                                    <TableHead className="w-[60px] font-extrabold text-blue-800">
                                        #
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-800">
                                        Team
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-800">
                                        Mentor
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-800">
                                        <Sparkles className="mr-1 inline-block size-4 text-blue-500" />
                                        Originality
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-800">
                                        <Target className="mr-1 inline-block size-4 text-blue-500" />
                                        Problem Fit
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-800">
                                        <ShieldCheck className="mr-1 inline-block size-4 text-blue-500" />
                                        Feasibility
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-800">
                                        <Users className="mr-1 inline-block size-4 text-blue-500" />
                                        Team Potential
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-800">
                                        <Presentation className="mr-1 inline-block size-4 text-blue-500" />
                                        Presentation
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-800">
                                        <MessageSquareText className="mr-1 inline-block size-4 text-blue-500" />
                                        Remark
                                    </TableHead>
                                    <TableHead className="text-right font-extrabold text-blue-800">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teams &&
                                    teams.map((team, index) => (
                                        <TableRow
                                            key={index}
                                            className="transition hover:bg-blue-50/50"
                                        >
                                            <TableCell className="font-bold text-blue-900">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="font-semibold text-blue-900">
                                                {team.team_name}
                                            </TableCell>
                                            <TableCell className="font-medium text-blue-800">
                                                {team.mentor}
                                            </TableCell>
                                            <TableCell>{team.round_one.originality}</TableCell>
                                            <TableCell>
                                                {team.round_one.problem_solution_fit}
                                            </TableCell>
                                            <TableCell>{team.round_one.feasibility}</TableCell>
                                            <TableCell>{team.round_one.team_potential}</TableCell>
                                            <TableCell>{team.round_one.presentation}</TableCell>
                                            <TableCell>{team.round_one.remark}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setSelectedRow(team)
                                                        setIsOpen(true)
                                                    }}
                                                    className="transition hover:bg-blue-600 hover:text-white"
                                                >
                                                    <Pencil className="mr-1 size-4" />
                                                    Update
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <Update isOpen={isOpen} setIsOpen={setIsOpen} data={selectedRow} />
        </div>
    )
}
