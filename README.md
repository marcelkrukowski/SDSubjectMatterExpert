# Subject Matter Expert(SME) Management System

# Context of Project
### Background
SDWorx has several experienced developers who are subject matter experts in many different areas and technologies. Some in the .NET, some in JAVA and some on functional domains such as Payroll UK system, among others.
Today, these SMEs are only known within their tribes. We do not have a single platform to host our SMEs’ details. This would allow other colleagues to reach out to them for advice or help in specific domain areas.

### Problem Statement
1. Each tribe is aware of their own SMEs.
2. We do not have a standard and centralized platform to list out our SMEs.
3. It’s a lengthy process for colleagues to sometimes get to know about a SME in a particular area.
4. Colleagues do not know beforehand if the SME is willing to help and about are their availability and therefore, they are reluctant to contact them.
5. No reporting can be made about frequently asked questions to our SMEs or for which areas are colleagues mostly reaching out to SMEs.

### Requirements
Build a web application that can be used as a centralised platform for SME management:
- Login to access the system
- Each user has a profile and can view the list of SMEs
- The SME list can be filtered based on area of expertise and location; sorting and searching features should also be included.
- Any user who gets access to the system can through their profile page choose to mark themselves as a SME and will have to fill in additional details
- SME fields: Areas of expertise (multiple), Location, Languages (multiple), available time slots they can be booked
- The Agile Coach of that person (willing to be SME) needs to approve their profile to be listed as a SME in the system
- The SMEs have a way to document their sessions with the colleagues (can be anonymous), includes topic and sub-topics
- Reporting: Only the L&D team has a way to generate some reports to get an idea in which areas are the SMEs being mostly contacted for so that group trainings can be conducted on those subjects. Graphs can also be  included.
- Codes for the app should be stored on corporate account for re-use if needed

### Technology
Back End:
1. ASP.Net Core Web API
     - .Net 7
     - ASP.NET Core 7
     - Entity Framework Core 7 (Code-First approach)
     - Authentication and Auhtorization -> ASP.Net core Identity
     - DB: SQL Server
     - Visual Studio 2022
2. Front End:
     - Angular 15
3. Testing:
     - Using Automation testing
4. Hosting:
     - Azure DevOps

### Expectations
- All of you need to present & talk on the items you work on
- This presentation is part of your assessment
- For better teamwork, it is advisable to work from the office

