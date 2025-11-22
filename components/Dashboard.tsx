
import React, { useState, useMemo } from 'react';
import { Role } from '../types';
import { ROLES } from '../constants';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { SearchIcon } from './icons/SearchIcon';
import { XIcon } from './icons/XIcon';
import { FilterIcon } from './icons/FilterIcon';
import { PuzzleIcon } from './icons/PuzzleIcon';

interface DashboardProps {
    onSelectRole: (role: Role) => void;
    onStartQuiz: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectRole, onStartQuiz }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const allSkills = useMemo(() => {
        const skills = new Set<string>();
        ROLES.forEach(role => role.skills.forEach(skill => skills.add(skill)));
        return Array.from(skills).sort();
    }, []);

    const filteredRoles = useMemo(() => {
        return ROLES.filter(role => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = (
                role.title.toLowerCase().includes(searchLower) ||
                role.description.toLowerCase().includes(searchLower) ||
                role.skills.some(skill => skill.toLowerCase().includes(searchLower))
            );
            const matchesSkill = selectedSkill ? role.skills.includes(selectedSkill) : true;
            return matchesSearch && matchesSkill;
        });
    }, [searchQuery, selectedSkill]);

    return (
        <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 pt-12 md:pt-16">
            <header className="text-center mb-10 max-w-3xl w-full">
                <BriefcaseIcon className="w-16 h-16 mx-auto text-accent mb-4" />
                <h1 className="text-4xl sm:text-5xl font-bold text-primary-text">CS Career Simulator</h1>
                <p className="text-secondary-text mt-2 text-lg">
                    Try on a new career. Gain real-world experience and discover your path in the tech industry.
                </p>

                {/* Quiz Banner */}
                <button 
                    onClick={onStartQuiz}
                    className="mt-8 mx-auto flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 rounded-2xl hover:border-accent transition-all group w-full max-w-md justify-center"
                >
                    <div className="p-2 bg-accent rounded-lg text-white group-hover:scale-110 transition-transform">
                        <PuzzleIcon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-bold text-accent uppercase tracking-wide">Not sure where to start?</p>
                        <p className="text-primary-text font-medium">Take our 1-minute Personality Quiz &rarr;</p>
                    </div>
                </button>

                {/* Search and Filter Section */}
                <div className="mt-8 relative max-w-xl mx-auto">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-secondary-text group-focus-within:text-accent transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-10 py-3 bg-card-bg/50 backdrop-blur-sm border border-secondary-text/20 rounded-xl leading-5 text-primary-text placeholder-secondary-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition-all shadow-sm"
                            placeholder="Search roles, skills, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                             <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-text hover:text-primary-text"
                                aria-label="Clear search"
                            >
                                <XIcon className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                    
                    <div className="mt-4 flex flex-col items-center">
                         <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center text-sm font-medium transition-colors ${showFilters || selectedSkill ? 'text-accent' : 'text-secondary-text hover:text-primary-text'}`}
                        >
                            <FilterIcon className="w-4 h-4 mr-1.5" />
                            {showFilters ? 'Hide Skill Filters' : 'Filter by Skill'}
                            {selectedSkill && <span className="ml-2 bg-accent text-primary-text text-xs px-2 py-0.5 rounded-full">1</span>}
                        </button>

                        {(showFilters || selectedSkill) && (
                            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                {allSkills.map(skill => (
                                    <button
                                        key={skill}
                                        onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                                            selectedSkill === skill
                                                ? 'bg-accent text-primary-text border-accent shadow-lg shadow-accent/20'
                                                : 'bg-base-bg/50 text-secondary-text border-secondary-text/20 hover:border-accent/50 hover:text-primary-text'
                                        }`}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>
            
            <div className="w-full max-w-6xl">
                {filteredRoles.length > 0 ? (
                     <>
                        <div className="flex justify-between items-center mb-6 px-2">
                             <h2 className="text-2xl font-semibold text-primary-text">Available Roles</h2>
                             <span className="text-sm text-secondary-text">{filteredRoles.length} result{filteredRoles.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredRoles.map(role => (
                                <button 
                                    key={role.id} 
                                    onClick={() => onSelectRole(role)}
                                    className="group bg-card-bg/30 backdrop-blur-sm border border-secondary-text/20 p-6 rounded-2xl text-left hover:bg-card-bg/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10 flex flex-col h-full"
                                >
                                    <div className="flex justify-between items-start w-full mb-4">
                                        <role.icon className="w-12 h-12 text-accent p-2 bg-accent/10 rounded-xl" />
                                        <ChevronRightIcon className="w-6 h-6 text-secondary-text mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-text mb-2">{role.title}</h3>
                                    <p className="text-secondary-text text-sm mb-4 flex-grow">{role.description}</p>
                                    
                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {role.skills.slice(0, 3).map(skill => (
                                            <span key={skill} className={`text-xs px-2 py-1 rounded-md transition-colors ${selectedSkill === skill ? 'bg-accent text-primary-text' : 'bg-base-bg/60 text-secondary-text'}`}>
                                                {skill}
                                            </span>
                                        ))}
                                        {role.skills.length > 3 && (
                                            <span className="text-xs text-secondary-text px-1 py-1">+{role.skills.length - 3}</span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 bg-card-bg/20 rounded-2xl border border-secondary-text/10 max-w-2xl mx-auto">
                        <SearchIcon className="w-12 h-12 text-secondary-text/50 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-primary-text">No roles found</h3>
                        <p className="text-secondary-text mt-2">Try adjusting your search or filters to find what you're looking for.</p>
                        <button 
                            onClick={() => {setSearchQuery(''); setSelectedSkill(null);}}
                            className="mt-4 px-4 py-2 bg-accent/10 text-accent font-medium rounded-lg hover:bg-accent/20 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
             <footer className="text-center mt-12 text-secondary-text text-sm pb-6">
                <p>&copy; 2024 Project Hub: CS Career Simulator. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
