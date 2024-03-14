import { FetchTeamDetails } from '@/api/attendanceApi';
import React, { useState, useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';

const TeamDropdown = ({ onTeamSelect }) => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await FetchTeamDetails();
            setTeams(response.data.allTeamsNames);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    const handleTeamChange = (teamId) => {
        const selectedTeam = teams.find(team => team.id === teamId);
        setSelectedTeam(selectedTeam)
        onTeamSelect(teamId); // Pass the selected team back to the parent component
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="mx-2 px-4" >{selectedTeam.team_name || "Select a project"}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Select Team</DropdownMenuLabel>
                    {teams.map(team => (
                        <DropdownMenuItem key={team.id} onSelect={() => handleTeamChange(team.id)}>{team.team_name}</DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default TeamDropdown;
