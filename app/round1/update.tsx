'use client'

import { FC, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { updateRoundOneDataAction } from '@/server/actions/team'
import { TeamType } from '@/server/database/models/team'

interface Props {
    data?: TeamType
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const Update: FC<Props> = ({ data, isOpen, setIsOpen }) => {
    const [formData, setFormData] = useState({
        mentor: '',
        originality: 0,
        problemSolutionFit: 0,
        feasibility: 0,
        teamPotential: 0,
        presentation: 0,
        remark: ''
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        if (!data) {
            return toast.error('Data not found')
        }

        await updateRoundOneDataAction(
            data._id,
            formData.mentor,
            formData.originality,
            formData.problemSolutionFit,
            formData.feasibility,
            formData.teamPotential,
            formData.presentation,
            formData.remark
        )

        window.location.reload()
        setIsOpen(false)
    }

    useEffect(() => {
        if (data)
            setFormData({
                mentor: data.mentor,
                originality: data.round_one.originality,
                problemSolutionFit: data.round_one.problem_solution_fit,
                feasibility: data.round_one.feasibility,
                teamPotential: data.round_one.team_potential,
                presentation: data.round_one.presentation,
                remark: data.round_one.remark
            })
    }, [data])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Data</DialogTitle>
                    <DialogDescription>
                        Update the following fields with new data.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="originality" className="text-right">
                            Originality
                        </label>
                        <Input
                            id="originality"
                            name="originality"
                            value={formData.originality}
                            onChange={handleInputChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="problemSolutionFit" className="text-right">
                            Problem Solution Fit
                        </label>
                        <Input
                            id="problemSolutionFit"
                            name="problemSolutionFit"
                            value={formData.problemSolutionFit}
                            onChange={handleInputChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="feasibility" className="text-right">
                            Feasibility
                        </label>
                        <Input
                            id="feasibility"
                            name="feasibility"
                            value={formData.feasibility}
                            onChange={handleInputChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="teamPotential" className="text-right">
                            Team Potential
                        </label>
                        <Input
                            id="teamPotential"
                            name="teamPotential"
                            value={formData.teamPotential}
                            onChange={handleInputChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="presentation" className="text-right">
                            Presentation
                        </label>
                        <Input
                            id="presentation"
                            name="presentation"
                            value={formData.presentation}
                            onChange={handleInputChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="remark" className="text-right">
                            Remark
                        </label>
                        <Input
                            id="remark"
                            name="remark"
                            value={formData.remark}
                            onChange={handleInputChange}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSubmit}>
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Update
