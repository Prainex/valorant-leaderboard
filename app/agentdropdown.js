'use client'
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AgentDropdown = () => {
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState('');

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
                const data = await response.json();
                setAgents(data.data);
            } catch (error) {
                console.error('Error fetching agents:', error);
            }
        };
        fetchAgents();
    }, []);

    const handleChange = (event) => {
        setSelectedAgent(event.target.value);
    };

    return (
        <FormControl width="50px" variant="filled">
            <Select
                value={selectedAgent}
                onChange={handleChange}
                label="Select Agent"
            >
                {agents.map((agent) => (
                    <MenuItem key={agent.uuid} value={agent.uuid}>
                        <img src={agent.displayIcon} alt={agent.displayName} style={{ width: 50, height: 50, marginRight: 10 }}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default AgentDropdown;
