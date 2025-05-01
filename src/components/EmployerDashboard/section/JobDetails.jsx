
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobDetailsDisplay from './JobDetailsDisplay';
import JobApplicantsTable from './JobApplicantsTable';
import { Download, Filter, Search, ArrowUpDown } from 'lucide-react';
import useFetchJobData from './useFetchJobData';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { job, loading,applicants=[] } = useFetchJobData(jobId);
  
  // State declarations - MUST be at the top level and in the same order every render
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    experience: 'all',
    location: 'all',
    gender: 'all',
    score: 'all'
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  
  // Sample data for JobApplicantsTable component
// const applicants = [
//   {
//     candidate_id: "001",
//     candidate_first_name: "John",
//     candidate_last_name: "Smith",
//     candidate_current_role: "Senior Software Engineer",
//     candidate_location: "San Francisco, CA",
//     candidate_gender: "Male",
//     screening_score: "85",
//     education: [
//       {
//         candidate_institute: "Stanford University",
//         candidate_degree: "Master of Computer Science",
//         candidate_graduation_year: "2018"
//       }
//     ],
//     experiences: [
//       {
//         candidate_company: "Tech Solutions Inc.",
//         candidate_role: "Software Engineer",
//         candidate_start_date: "2018-06-01",
//         candidate_end_date: "2021-05-31",
//         candidate_responsibilities: "Full-stack development, API design"
//       },
//       {
//         candidate_company: "InnovateSoft",
//         candidate_role: "Senior Software Engineer",
//         candidate_start_date: "2021-06-15",
//         candidate_end_date: "2025-02-01",
//         candidate_responsibilities: "Team leadership, architecture design"
//       }
//     ]
//   },
//   {
//     candidate_id: "002",
//     candidate_first_name: "Emma",
//     candidate_last_name: "Johnson",
//     candidate_current_role: "UX Designer",
//     candidate_location: "New York, NY",
//     candidate_gender: "Female",
//     screening_score: "92",
//     education: [
//       {
//         candidate_institute: "Rhode Island School of Design",
//         candidate_degree: "Bachelor of Fine Arts",
//         candidate_graduation_year: "2020"
//       }
//     ],
//     experiences: [
//       {
//         candidate_company: "Creative Designs LLC",
//         candidate_role: "Junior Designer",
//         candidate_start_date: "2020-07-01",
//         candidate_end_date: "2022-08-31",
//         candidate_responsibilities: "UI/UX design, user research"
//       },
//       {
//         candidate_company: "Digital Experiences Co.",
//         candidate_role: "UX Designer",
//         candidate_start_date: "2022-09-15",
//         candidate_end_date: "2025-01-15",
//         candidate_responsibilities: "User interface design, prototyping, usability testing"
//       }
//     ]
//   },
//   {
//     candidate_id: "003",
//     candidate_first_name: "Miguel",
//     candidate_last_name: "Rodriguez",
//     candidate_current_role: "Data Scientist",
//     candidate_location: "Austin, TX",
//     candidate_gender: "Male",
//     screening_score: "78",
//     education: [
//       {
//         candidate_institute: "MIT",
//         candidate_degree: "PhD in Computer Science",
//         candidate_graduation_year: "2021"
//       }
//     ],
//     experiences: [
//       {
//         candidate_company: "Data Analytics Corp",
//         candidate_role: "Data Analyst",
//         candidate_start_date: "2019-01-15",
//         candidate_end_date: "2021-06-30",
//         candidate_responsibilities: "Statistical analysis, data visualization"
//       },
//       {
//         candidate_company: "AI Solutions",
//         candidate_role: "Data Scientist",
//         candidate_start_date: "2021-08-01",
//         candidate_end_date: "2024-12-31",
//         candidate_responsibilities: "Machine learning model development, data engineering"
//       }
//     ]
//   },
//   {
//     candidate_id: "004",
//     candidate_first_name: "Sarah",
//     candidate_last_name: "Williams",
//     candidate_current_role: "Product Manager",
//     candidate_location: "Seattle, WA",
//     candidate_gender: "Female",
//     screening_score: "95",
//     education: [
//       {
//         candidate_institute: "Harvard Business School",
//         candidate_degree: "MBA",
//         candidate_graduation_year: "2019"
//       }
//     ],
//     experiences: [
//       {
//         candidate_company: "TechStart Inc.",
//         candidate_role: "Associate Product Manager",
//         candidate_start_date: "2019-05-15",
//         candidate_end_date: "2021-12-31",
//         candidate_responsibilities: "Product roadmap planning, market research"
//       },
//       {
//         candidate_company: "Enterprise Solutions",
//         candidate_role: "Product Manager",
//         candidate_start_date: "2022-01-15",
//         candidate_end_date: "2025-02-15",
//         candidate_responsibilities: "Product strategy, stakeholder management, feature prioritization"
//       }
//     ]
//   },
//   {
//     candidate_id: "005",
//     candidate_first_name: "Raj",
//     candidate_last_name: "Patel",
//     candidate_current_role: "DevOps Engineer",
//     candidate_location: "Chicago, IL",
//     candidate_gender: "Male",
//     screening_score: "82",
//     education: [
//       {
//         candidate_institute: "University of Illinois",
//         candidate_degree: "BS in Computer Engineering",
//         candidate_graduation_year: "2022"
//       }
//     ],
//     experiences: [
//       {
//         candidate_company: "CloudTech Solutions",
//         candidate_role: "System Administrator",
//         candidate_start_date: "2022-07-01",
//         candidate_end_date: "2023-08-31",
//         candidate_responsibilities: "Server management, network configuration"
//       },
//       {
//         candidate_company: "InfraOps",
//         candidate_role: "DevOps Engineer",
//         candidate_start_date: "2023-10-01",
//         candidate_end_date: "2025-01-31",
//         candidate_responsibilities: "CI/CD pipeline implementation, cloud infrastructure management"
//       }
//     ]
//   },
//   {
//     candidate_id: "006",
//     candidate_first_name: "Olivia",
//     candidate_last_name: "Chen",
//     candidate_current_role: "Frontend Developer",
//     candidate_location: "Los Angeles, CA",
//     candidate_gender: "Female",
//     screening_score: "88",
//     education: [
//       {
//         candidate_institute: "UCLA",
//         candidate_degree: "BS in Computer Science",
//         candidate_graduation_year: "2023"
//       }
//     ],
//     experiences: [
//       {
//         candidate_company: "WebDev Studio",
//         candidate_role: "Junior Developer",
//         candidate_start_date: "2023-06-15",
//         candidate_end_date: "2024-07-31",
//         candidate_responsibilities: "HTML/CSS implementation, React component development"
//       },
//       {
//         candidate_company: "User Interface Technologies",
//         candidate_role: "Frontend Developer",
//         candidate_start_date: "2024-08-15",
//         candidate_end_date: "2025-02-15",
//         candidate_responsibilities: "React application development, performance optimization"
//       }
//     ]
//   },
//   {
//     candidate_id: "007",
//     candidate_first_name: "James",
//     candidate_last_name: "Wilson",
//     candidate_current_role: "Blockchain Developer",
//     candidate_location: "Miami, FL",
//     candidate_gender: "Male",
//     screening_score: "76",
//     education: [
//       {
//         candidate_institute: "Georgia Tech",
//         candidate_degree: "MS in Computer Science",
//         candidate_graduation_year: "2020"
//       }
//     ],
//     experiences: [
//       {
//         candidate_company: "BlockChain Solutions",
//         candidate_role: "Junior Blockchain Developer",
//         candidate_start_date: "2020-08-01",
//         candidate_end_date: "2023-03-31",
//         candidate_responsibilities: "Smart contract development, blockchain protocol implementation"
//       },
//       {
//         candidate_company: "Crypto Innovations",
//         candidate_role: "Blockchain Developer",
//         candidate_start_date: "2023-05-01",
//         candidate_end_date: "2025-01-15",
//         candidate_responsibilities: "DeFi application development, consensus algorithm optimization"
//       }
//     ]
//   },
//   {
//     candidate_id: "008",
//     candidate_first_name: "Aisha",
//     candidate_last_name: "Khan",
//     candidate_current_role: "Project Manager",
//     candidate_location: "Denver, CO",
//     candidate_gender: "Female",
//     screening_score: "91",
//     education: [
//       {
//         candidate_institute: "University of Colorado",
//         candidate_degree: "MBA",
//         candidate_graduation_year: "2018"
//       }
//     ],
//     experiences: [
//       {
//         candidate_company: "Project Solutions Inc.",
//         candidate_role: "Project Coordinator",
//         candidate_start_date: "2018-09-01",
//         candidate_end_date: "2020-12-31",
//         candidate_responsibilities: "Project scheduling, team coordination"
//       },
//       {
//         candidate_company: "Global Enterprises",
//         candidate_role: "Project Manager",
//         candidate_start_date: "2021-02-01",
//         candidate_end_date: "2024-12-31",
//         candidate_responsibilities: "Project planning, risk management, budget oversight"
//       }
//     ]
//   },
//   {
//     candidate_id: "009",
//     candidate_first_name: "David",
//     candidate_last_name: "Garcia",
//     candidate_current_role: "Backend Engineer",
//     candidate_location: "Portland, OR",
//     candidate_gender: "Male",
//     screening_score: "84",
//     education: [
//       {
//         candidate_institute: "Oregon State University",
//         candidate_degree: "BS in Computer Science",
//         candidate_graduation_year: "2019"
//       }
//     ],
//     experiences: [
//       {
//         candidate_company: "Server Solutions LLC",
//         candidate_role: "Junior Backend Developer",
//         candidate_start_date: "2019-07-15",
//         candidate_end_date: "2022-01-31",
//         candidate_responsibilities: "API development, database optimization"
//       },
//       {
//         candidate_company: "Data Systems Inc.",
//         candidate_role: "Backend Engineer",
//         candidate_start_date: "2022-03-01",
//         candidate_end_date: "2025-02-01",
//         candidate_responsibilities: "Microservice architecture, performance tuning, scalability solutions"
//       }
//     ]
//   },
//   {
//     candidate_id: "010",
//     candidate_first_name: "Sophia",
//     candidate_last_name: "Martinez",
//     candidate_current_role: "QA Engineer",
//     candidate_location: "Boston, MA",
//     candidate_gender: "Female",
//     screening_score: "79",
//     education: [
//       {
//         candidate_institute: "Boston University",
//         candidate_degree: "BS in Software Engineering",
//         candidate_graduation_year: "2021"
//       }
//     ],
//     experiences: [
//       {
//         candidate_company: "Quality First Inc.",
//         candidate_role: "QA Tester",
//         candidate_start_date: "2021-08-01",
//         candidate_end_date: "2023-09-30",
//         candidate_responsibilities: "Manual testing, test case creation"
//       },
//       {
//         candidate_company: "Software Assurance Co.",
//         candidate_role: "QA Engineer",
//         candidate_start_date: "2023-11-01",
//         candidate_end_date: "2025-01-31",
//         candidate_responsibilities: "Automated testing, CI/CD integration, quality metrics analysis"
//       }
//     ]
//   }
// ];



  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Job not found state
  if (!job) {
    return (
      <div className="p-6 text-center mt-20 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl text-gray-700 mb-4">Job not found</h3>
        <p className="text-gray-500 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/employer_dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Calculate experience in years for each applicant
  const calculateExperience = (experiences) => {
    if (!experiences || experiences.length === 0) return 0;
    
    let totalExperience = 0;
    
    experiences.forEach(exp => {
      const startDate = new Date(exp.candidate_start_date);
      const endDate = new Date(exp.candidate_end_date);
      const diffTime = Math.abs(endDate - startDate);
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
      totalExperience += diffYears;
    });
    
    return totalExperience;
  };

  // Function to check if applicant matches experience filter
  const matchesExperienceFilter = (applicant, filter) => {
    if (filter === 'all') return true;
    
    const experience = calculateExperience(applicant.experiences);
    
    switch (filter) {
      case '0-1':
        return experience >= 0 && experience <= 1;
      case '1-3':
        return experience > 1 && experience <= 3;
      case '3-5':
        return experience > 3 && experience <= 5;
      case '5+':
        return experience > 5;
      default:
        return true;
    }
  };

  // Function to check if applicant matches score filter
  const matchesScoreFilter = (applicant, filter) => {
    if (filter === 'all') return true;
    
    const score = parseInt(applicant.screening_score);
    
    switch (filter) {
      case '90+':
        return score >= 90;
      case '75-90':
        return score >= 75 && score < 90;
      case '50-75':
        return score >= 50 && score < 75;
      case '0-50':
        return score < 50;
      default:
        return true;
    }
  };

  // Function to get unique locations from applicants data
  const getUniqueLocations = () => {
    const locations = applicants.map(applicant => applicant.candidate_location);
    return [...new Set(locations)].filter(Boolean);
  };

  // Function to sort applicants data
  const sortApplicants = (data) => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortConfig.key) {
        case 'name':
          aValue = `${a.candidate_first_name} ${a.candidate_last_name}`.toLowerCase();
          bValue = `${b.candidate_first_name} ${b.candidate_last_name}`.toLowerCase();
          break;
        case 'role':
          aValue = a.candidate_current_role.toLowerCase();
          bValue = b.candidate_current_role.toLowerCase();
          break;
        case 'location':
          aValue = a.candidate_location.toLowerCase();
          bValue = b.candidate_location.toLowerCase();
          break;
        case 'score':
          aValue = parseInt(a.screening_score);
          bValue = parseInt(b.screening_score);
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and search applicants
  const filteredApplicants = Array.isArray(applicants) ? applicants.filter(applicant => {
    const fullName = `${applicant.candidate_first_name} ${applicant.candidate_last_name}`.toLowerCase();
    const role = (applicant.candidate_current_role || '').toLowerCase();
    const location = (applicant.candidate_location || '').toLowerCase();
    
    const matchesSearch = searchTerm === '' || 
      fullName.includes(searchTerm.toLowerCase()) ||
      role.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase());
    
    // Apply all filters
    const matchesFilters = 
      (selectedFilters.gender === 'all' || applicant.candidate_gender === selectedFilters.gender) &&
      (selectedFilters.location === 'all' || applicant.candidate_location.includes(selectedFilters.location)) &&
      matchesExperienceFilter(applicant, selectedFilters.experience) &&
      matchesScoreFilter(applicant, selectedFilters.score);
    
    return matchesSearch && matchesFilters;
  }) : [];

  // Apply sorting to filtered applicants
  const sortedApplicants = sortApplicants(filteredApplicants);

  // Handle export to CSV
  const exportToCSV = () => {
    const header = [
      'Full Name', 
      'College Name', 
      'Experience', 
      'Current Role', 
      'Location', 
      'Gender', 
      'Profile Score'
    ];
    
    const rows = sortedApplicants.map(applicant => [
      `${applicant.candidate_first_name} ${applicant.candidate_last_name}`,
      applicant.education && applicant.education.length > 0 
        ? applicant.education[0].candidate_institute 
        : "N/A",
      calculateExperience(applicant.experiences).toFixed(1) + " years",
      applicant.candidate_current_role || "N/A",
      applicant.candidate_location || "N/A",
      applicant.candidate_gender || "N/A",
      `${applicant.screening_score}%`
    ]);
    
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `applicants-${job.job_title}-${jobId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mt-20 bg-gray-50 min-h-screen">
      {/* Header with breadcrumbs */}
      <div className="mb-2 text-sm text-gray-500">
        <span onClick={() => navigate('/employer_dashboard')} className="hover:text-blue-600 cursor-pointer">Dashboard</span>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Job Details</span>
      </div>
      
      {/* Job Title and Back Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{job?.job_title}</h2>
        <button
          onClick={() => navigate('/employer_dashboard')}
          className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
      
      {/* Job Details Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <JobDetailsDisplay job={job} applicant={applicants}/>
      </div>
      
      {/* Applicants Section */}
      <div id="applicant_table" className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Applicants <span className="text-sm font-normal text-gray-500 ml-2">({sortedApplicants.length || 0})</span>
          </h3>
          
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to CSV
          </button>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, role, or location..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            <button
              onClick={() => {
                // Reset filters logic
                setSelectedFilters({
                  experience: 'all',
                  location: 'all',
                  gender: 'all',
                  score: 'all'
                });
                setSearchTerm('');
                setSortConfig({ key: null, direction: 'ascending' });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Reset
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </button>
              
              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
                  <div className="py-1">
                    <button 
                      onClick={() => { handleSort('name'); setShowSortMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </button>
                    <button 
                      onClick={() => { handleSort('role'); setShowSortMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Role {sortConfig.key === 'role' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </button>
                    <button 
                      onClick={() => { handleSort('location'); setShowSortMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Location {sortConfig.key === 'location' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </button>
                    <button 
                      onClick={() => { handleSort('score'); setShowSortMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Score {sortConfig.key === 'score' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Filter Panel - show when filters button is clicked */}
        {showFilters && (
          <div className="p-4 mb-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={selectedFilters.experience}
                  onChange={(e) => setSelectedFilters({...selectedFilters, experience: e.target.value})}
                >
                  <option value="all">All Experience</option>
                  <option value="0-1">0-1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={selectedFilters.location}
                  onChange={(e) => setSelectedFilters({...selectedFilters, location: e.target.value})}
                >
                  <option value="all">All Locations</option>
                  {getUniqueLocations().map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={selectedFilters.gender}
                  onChange={(e) => setSelectedFilters({...selectedFilters, gender: e.target.value})}
                >
                  <option value="all">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Score</label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={selectedFilters.score}
                  onChange={(e) => setSelectedFilters({...selectedFilters, score: e.target.value})}
                >
                  <option value="all">All Scores</option>
                  <option value="90+">90% and above</option>
                  <option value="75-90">75% - 90%</option>
                  <option value="50-75">50% - 75%</option>
                  <option value="0-50">Below 50%</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Applicants Table with Shadow and Border */}
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <JobApplicantsTable applicants={sortedApplicants || []} />
        </div>
        
        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{sortedApplicants.length || 0}</span> of <span className="font-medium">{applicants.length || 0}</span> applicants
          </div>
          
          <div className="flex justify-center space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;